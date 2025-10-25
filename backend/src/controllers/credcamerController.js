import Project from '../models/Project.js';
import User from '../models/User.js';

// Promover usuario a credcamer (solo admin)
export const promoteToCredcamer = async (req, res, next) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'userId requerido' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    if (user.role === 'credcamer') {
      return res.status(400).json({ message: 'Usuario ya es credcamer' });
    }

    user.role = 'credcamer';
    user.credcamerLevel = 'Novato';
    user.credcamerPoints = 0;
    user.totalCaptured = 0;
    await user.save();

    res.json({ 
      message: 'Usuario promovido a Credcamer exitosamente',
      user 
    });
  } catch (error) {
    next(error);
  }
};

// Degradar credcamer a usuario normal (solo admin)
export const demoteCredcamer = async (req, res, next) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'userId requerido' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    if (user.role !== 'credcamer') {
      return res.status(400).json({ message: 'Usuario no es credcamer' });
    }

    user.role = 'supporter';
    await user.save();

    res.json({ 
      message: 'Credcamer degradado a usuario normal',
      user 
    });
  } catch (error) {
    next(error);
  }
};

// Crear proyecto capturado (credcamer captura negocio de tercero)
export const captureProject = async (req, res, next) => {
  try {
    const {
      title,
      description,
      goalAmount,
      category,
      storytelling,
      socialMedia,
      businessOwner, // { name, contact }
      credcamerNotes,
      location,
    } = req.body;

    // Validaciones básicas
    if (!title || !description || !goalAmount || !category) {
      return res.status(400).json({ 
        message: 'Campos obligatorios: title, description, goalAmount, category' 
      });
    }

    if (!businessOwner || !businessOwner.name || !businessOwner.contact) {
      return res.status(400).json({ 
        message: 'businessOwner.name y businessOwner.contact son obligatorios' 
      });
    }

    // Crear proyecto con estado pending_review
    const project = await Project.create({
      title,
      description,
      goalAmount,
      category,
      storytelling: storytelling || {},
      socialMedia: socialMedia || {},
      creator: req.user._id, // El credcamer es técnicamente el creador en la DB
      capturedBy: req.user._id, // Marca quién lo captó
      businessOwner: {
        name: businessOwner.name,
        contact: businessOwner.contact,
        contactedAt: new Date(),
        approved: false, // Aún no aprobado por el dueño real
      },
      credcamerNotes,
      location,
      status: 'pending_review', // Admin debe aprobar
      verificationStatus: {
        submitted: true,
        submittedAt: new Date(),
      },
    });

    // Incrementar contador del credcamer
    req.user.totalCaptured += 1;
    await req.user.save();

    const populated = await Project.findById(project._id)
      .populate('creator', 'name avatar role')
      .populate('capturedBy', 'name avatar role credcamerLevel credcamerPoints');

    res.status(201).json({
      message: 'Negocio captado exitosamente. Pendiente de revisión.',
      project: populated,
    });
  } catch (error) {
    next(error);
  }
};

// Dashboard del credcamer: sus proyectos captados
export const getMyCaptures = async (req, res, next) => {
  try {
    const { status } = req.query; // pending_review, active, rejected

    const filter = { capturedBy: req.user._id };
    if (status) {
      filter.status = status;
    }

    const projects = await Project.find(filter)
      .populate('creator', 'name avatar role')
      .populate('capturedBy', 'name avatar level points')
      .populate('verificationStatus.reviewedBy', 'name avatar')
      .sort({ createdAt: -1 });

    // Estadísticas del credcamer
    const stats = {
      totalCaptured: req.user.totalCaptured || 0,
      points: req.user.points || 0,
      level: req.user.level || 'Novato',
      pending: await Project.countDocuments({ 
        capturedBy: req.user._id, 
        status: 'pending_review' 
      }),
      approved: await Project.countDocuments({ 
        capturedBy: req.user._id, 
        status: 'active' 
      }),
      rejected: await Project.countDocuments({ 
        capturedBy: req.user._id, 
        status: 'rejected' 
      }),
    };

    res.json({ projects, stats });
  } catch (error) {
    next(error);
  }
};

// Sistema de puntos: calcular y otorgar puntos al aprobar proyecto captado
export const awardPoints = async (projectId) => {
  try {
    const project = await Project.findById(projectId);
    if (!project || !project.capturedBy) {
      return;
    }

    const credcamer = await User.findById(project.capturedBy);
    if (!credcamer || credcamer.role !== 'credcamer') {
      return;
    }

    // Cálculo de puntos:
    // - Base: 10 puntos
    // - Bonus por monto: goalAmount / 1000 (1 punto por cada $1000)
    // - Bonus multimedia: +5 si tiene fotos, +3 si tiene story
    let points = 10;
    points += Math.floor(project.goalAmount / 1000);
    
    if (project.storytelling?.photos?.length > 0) {
      points += 5;
    }
    if (project.storytelling?.story) {
      points += 3;
    }

    // Actualizar credcamer
    credcamer.points = (credcamer.points || 0) + points;
    credcamer.totalCaptured = (credcamer.totalCaptured || 0) + 1;
    
    // Actualizar stats
    if (!credcamer.stats) {
      credcamer.stats = { totalPoints: 0, projectsCaptured: 0, successRate: 0 };
    }
    credcamer.stats.totalPoints = credcamer.points;
    credcamer.stats.projectsCaptured = credcamer.totalCaptured;
    
    // Actualizar nivel según puntos
    if (credcamer.points >= 300) {
      credcamer.level = 'Leyenda';
    } else if (credcamer.points >= 150) {
      credcamer.level = 'Elite';
    } else if (credcamer.points >= 50) {
      credcamer.level = 'Pro';
    } else {
      credcamer.level = 'Novato';
    }

    await credcamer.save();

    // Guardar puntos otorgados en el proyecto
    project.pointsAwarded = points;
    await project.save();

    console.log(`✅ ${points} puntos otorgados a ${credcamer.name} (Total: ${credcamer.points}, Nivel: ${credcamer.level})`);
    
    return { credcamer, points };
  } catch (error) {
    console.error('❌ Error al otorgar puntos:', error.message);
  }
};

// Recomendaciones: proyectos/negocios que el credcamer podría captar
export const getRecommendations = async (req, res, next) => {
  try {
    // Algoritmo simple: buscar proyectos sin multimedia completo
    // En producción: usar APIs externas, data scraping, etc.
    
    const recommendations = [
      {
        id: 'rec1',
        type: 'negocio_local',
        name: 'Café Artesanal "El Rincón"',
        description: 'Cafetería local sin presencia digital. Potencial: alto.',
        category: 'shop',
        estimatedGoal: 50000,
        location: 'Centro histórico',
        confidence: 0.85,
      },
      {
        id: 'rec2',
        type: 'startup',
        name: 'App de delivery verde',
        description: 'Startup que necesita financiamiento para MVP.',
        category: 'startup',
        estimatedGoal: 150000,
        location: 'Online',
        confidence: 0.72,
      },
      {
        id: 'rec3',
        type: 'emprendedor',
        name: 'Artesano de cuero',
        description: 'Artesano con productos únicos, sin tienda online.',
        category: 'art',
        estimatedGoal: 30000,
        location: 'Zona artesanal',
        confidence: 0.68,
      },
    ];

    res.json({ 
      recommendations,
      message: 'Sugerencias basadas en tu ubicación y categorías populares' 
    });
  } catch (error) {
    next(error);
  }
};

// Leaderboard: ranking de credcamers
export const getLeaderboard = async (req, res, next) => {
  try {
    const topCredcamers = await User.find({ role: 'credcamer' })
      .select('name avatar points level totalCaptured')
      .sort({ points: -1 })
      .limit(20);

    res.json({ leaderboard: topCredcamers });
  } catch (error) {
    next(error);
  }
};

// Obtener estadísticas generales de credcamers (admin)
export const getCredcamerStats = async (req, res, next) => {
  try {
    const totalCredcamers = await User.countDocuments({ role: 'credcamer' });
    const totalCaptured = await Project.countDocuments({ capturedBy: { $exists: true } });
    const totalPointsAwarded = await User.aggregate([
      { $match: { role: 'credcamer' } },
      { $group: { _id: null, total: { $sum: '$points' } } },
    ]);

    const levelDistribution = await User.aggregate([
      { $match: { role: 'credcamer' } },
      { $group: { _id: '$level', count: { $count: {} } } },
    ]);

    res.json({
      totalCredcamers,
      totalCaptured,
      totalPointsAwarded: totalPointsAwarded[0]?.total || 0,
      levelDistribution,
    });
  } catch (error) {
    next(error);
  }
};
