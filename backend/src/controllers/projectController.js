import Project from '../models/Project.js';
import User from '../models/User.js';
import logger, { logAdminAction, logSuspicious } from '../config/logger.js';

// Sanitización básica XSS para strings
const sanitizeHTML = (str) => {
  if (!str) return str;
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

// GET /api/projects?page=1&limit=12&category=startup&search=&sort=-createdAt
export const getAllProjects = async (req, res, next) => {
  try {
    const { 
      page = 1, 
      limit = 12, 
      category, 
      search, 
      sort = '-createdAt',
      status = 'active' 
    } = req.query;

    const query = { status };

    if (category && category !== 'all') {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const projects = await Project.find(query)
      .populate('creator', 'name avatar role')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();

    const count = await Project.countDocuments(query);

    res.json({
      projects,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      total: count,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/projects/featured
export const getFeaturedProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({ 
      featured: true, 
      status: 'active' 
    })
      .populate('creator', 'name avatar role')
      .limit(6)
      .sort('-createdAt')
      .lean();

    res.json(projects);
  } catch (error) {
    next(error);
  }
};

// GET /api/projects/:id
export const getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('creator', 'name avatar bio role socialLinks')
      .populate('capturedBy', 'name avatar level points');

    if (!project) {
      return res.status(404).json({ message: 'Proyecto no encontrado' });
    }

    // Incrementar vistas
    project.views += 1;
    await project.save();

    res.json(project);
  } catch (error) {
    next(error);
  }
};

// POST /api/projects
export const createProject = async (req, res, next) => {
  try {
    const { 
      title, 
      description, 
      goalAmount, 
      category, 
      media, 
      rewards, 
      location,
      endDate,
      // NUEVO - Story Telling
      storytelling,
      socialMedia,
    } = req.body;

    // Sanitizar inputs de texto para prevenir XSS
    const sanitizedTitle = sanitizeHTML(title);
    const sanitizedDescription = description; // Ya validado por express-validator
    
    // Detectar intentos XSS en título
    if (title !== sanitizedTitle) {
      logSuspicious('XSS attempt in project title', req.ip, {
        userId: req.user._id,
        original: title,
        sanitized: sanitizedTitle
      });
    }

    // Validaciones detalladas (ya cubiertas por validators, pero mantenemos por compatibilidad)
    if (!sanitizedTitle || sanitizedTitle.trim().length === 0) {
      return res.status(400).json({ 
        message: 'El título es obligatorio' 
      });
    }

    if (!sanitizedDescription || sanitizedDescription.trim().length === 0) {
      return res.status(400).json({ 
        message: 'La descripción es obligatoria' 
      });
    }

    if (!category) {
      return res.status(400).json({ 
        message: 'La categoría es obligatoria' 
      });
    }

    if (!goalAmount || isNaN(goalAmount)) {
      return res.status(400).json({ 
        message: 'El monto objetivo es obligatorio y debe ser un número' 
      });
    }

    if (parseFloat(goalAmount) < 100) {
      return res.status(400).json({ 
        message: 'El objetivo mínimo es 100€' 
      });
    }

    // EndDate por defecto: 30 días desde ahora
    const projectEndDate = endDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    const project = await Project.create({
      title: sanitizedTitle,
      description: sanitizedDescription,
      creator: req.user._id,
      goalAmount: parseFloat(goalAmount),
      category,
      media: media || [],
      rewards: rewards || [],
      location: location || 'España',
      endDate: projectEndDate,
      status: 'pending_review', // NUEVO - Proyectos van a revisión primero
      storytelling: storytelling || {},
      socialMedia: socialMedia || {},
      verificationStatus: {
        submitted: true,
        submittedAt: new Date(),
      },
    });

    logger.info(`Proyecto creado: "${sanitizedTitle}" por ${req.user.name} (Pendiente de revisión)`, {
      projectId: project._id,
      userId: req.user._id,
      category
    });

    // Actualizar rol del usuario a creator si no lo es
    if (req.user.role === 'supporter') {
      await User.findByIdAndUpdate(req.user._id, { role: 'creator' });
    }

    const io = req.app.get('io');
    io.emit('new_project', {
      id: project._id,
      title: project.title,
      creator: req.user.name,
      status: 'pending_review',
    });

    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
};

// PUT /api/projects/:id
export const updateProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Proyecto no encontrado' });
    }

    // Verificar que el usuario sea el creador
    if (project.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({ 
        message: 'No tienes permiso para editar este proyecto' 
      });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    ).populate('creator', 'name avatar role');

    res.json(updatedProject);
  } catch (error) {
    next(error);
  }
};

// DELETE /api/projects/:id
export const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Proyecto no encontrado' });
    }

    // Verificar permiso
    if (project.creator.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ 
        message: 'No tienes permiso para eliminar este proyecto' 
      });
    }

    // No permitir eliminar si tiene donaciones
    if (project.currentAmount > 0) {
      return res.status(400).json({ 
        message: 'No puedes eliminar un proyecto con donaciones' 
      });
    }

    await Project.findByIdAndDelete(req.params.id);

    res.json({ message: 'Proyecto eliminado correctamente' });
  } catch (error) {
    next(error);
  }
};

// GET /api/projects/:id/analytics
export const getProjectAnalytics = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Proyecto no encontrado' });
    }

    // Verificar permiso
    if (project.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({ 
        message: 'No tienes permiso para ver estas analíticas' 
      });
    }

    // Obtener donaciones por fecha
    const Donation = (await import('../models/Donation.js')).default;
    
    const donations = await Donation.find({ 
      project: req.params.id,
      status: 'succeeded' 
    })
      .sort('createdAt')
      .select('amount createdAt')
      .lean();

    // Agrupar por día
    const dailyData = donations.reduce((acc, donation) => {
      const date = new Date(donation.createdAt).toLocaleDateString('es-ES');
      if (!acc[date]) {
        acc[date] = { date, total: 0, count: 0 };
      }
      acc[date].total += donation.amount;
      acc[date].count += 1;
      return acc;
    }, {});

    res.json({
      totalAmount: project.currentAmount,
      totalDonors: project.donors,
      views: project.views,
      percentageFunded: project.percentageFunded,
      dailyData: Object.values(dailyData),
    });
  } catch (error) {
    next(error);
  }
};

// NUEVO - POST /api/projects/:id/approve (Solo Admin)
export const approveProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Proyecto no encontrado' });
    }

    // Verificar que el usuario sea admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ 
        message: 'Solo administradores pueden aprobar proyectos' 
      });
    }

    project.status = 'active';
    
    // Inicializar verificationStatus si no existe
    if (!project.verificationStatus) {
      project.verificationStatus = {};
    }
    
    project.verificationStatus.reviewedBy = req.user._id;
    project.verificationStatus.reviewedAt = new Date();
    await project.save();

    console.log(`✅ Proyecto "${project.title}" aprobado por ${req.user.name}`);

    // Si fue captado por un credcamer, otorgar puntos
    if (project.capturedBy) {
      const { awardPoints } = await import('./credcamerController.js');
      await awardPoints(project._id);
    }

    // Notificar al creador
    const io = req.app.get('io');
    io.to(`user:${project.creator}`).emit('project_approved', {
      projectId: project._id,
      title: project.title,
    });

    res.json({ 
      message: 'Proyecto aprobado exitosamente',
      project 
    });
  } catch (error) {
    next(error);
  }
};

// NUEVO - POST /api/projects/:id/reject (Solo Admin)
export const rejectProject = async (req, res, next) => {
  try {
    const { reason } = req.body;
    
    console.log('📋 Recibido request de rechazo:', { reason, body: req.body });
    
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Proyecto no encontrado' });
    }

    // Verificar que el usuario sea admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ 
        message: 'Solo administradores pueden rechazar proyectos' 
      });
    }

    if (!reason || reason.trim().length === 0) {
      console.log('❌ Razón inválida:', reason);
      return res.status(400).json({ 
        message: 'Debes proporcionar una razón para el rechazo' 
      });
    }

    project.status = 'rejected';
    
    // Inicializar verificationStatus si no existe
    if (!project.verificationStatus) {
      project.verificationStatus = {};
    }
    
    project.verificationStatus.reviewedBy = req.user._id;
    project.verificationStatus.reviewedAt = new Date();
    project.verificationStatus.rejectionReason = reason;
    await project.save();

    console.log(`❌ Proyecto "${project.title}" rechazado por ${req.user.name}: ${reason}`);

    // Notificar al creador
    const io = req.app.get('io');
    io.to(`user:${project.creator}`).emit('project_rejected', {
      projectId: project._id,
      title: project.title,
      reason,
    });

    res.json({ 
      message: 'Proyecto rechazado',
      project 
    });
  } catch (error) {
    next(error);
  }
};

// NUEVO - GET /api/projects/pending (Solo Admin)
export const getPendingProjects = async (req, res, next) => {
  try {
    // Verificar que el usuario sea admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ 
        message: 'Solo administradores pueden ver proyectos pendientes' 
      });
    }

    const { page = 1, limit = 12 } = req.query;

    const projects = await Project.find({ status: 'pending_review' })
      .populate('creator', 'name email avatar role')
      .sort('-createdAt')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();

    const count = await Project.countDocuments({ status: 'pending_review' });

    res.json({
      projects,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      total: count,
      });
  } catch (error) {
    next(error);
  }
};
