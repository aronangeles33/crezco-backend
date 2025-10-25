import Update from '../models/Update.js';
import Project from '../models/Project.js';

// GET /api/updates/project/:projectId
export const getUpdatesByProject = async (req, res, next) => {
  try {
    const { projectId } = req.params;

    const updates = await Update.find({ projectId })
      .populate('author', 'name avatar role')
      .sort('-createdAt')
      .lean();

    res.json(updates);
  } catch (error) {
    next(error);
  }
};

// POST /api/updates
export const createUpdate = async (req, res, next) => {
  try {
    const { projectId, content, media = [] } = req.body;

    if (!content || content.trim().length === 0) {
      return res.status(400).json({ message: 'El contenido no puede estar vacío' });
    }

    // Verificar que el proyecto existe y el usuario es el creador
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: 'Proyecto no encontrado' });
    }

    if (project.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({ 
        message: 'Solo el creador puede publicar actualizaciones' 
      });
    }

    const update = await Update.create({
      projectId,
      author: req.user._id,
      content: content.trim(),
      media,
    });

    const populatedUpdate = await Update.findById(update._id)
      .populate('author', 'name avatar role')
      .lean();

    // Emitir evento Socket.IO
    const io = req.app.get('io');
    io.to(`project_${projectId}`).emit('new_update', populatedUpdate);

    res.status(201).json(populatedUpdate);
  } catch (error) {
    next(error);
  }
};
