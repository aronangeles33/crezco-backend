import Comment from '../models/Comment.js';
import logger, { logSuspicious } from '../config/logger.js';

// Sanitización básica XSS
const sanitizeHTML = (str) => {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

// GET /api/comments/project/:projectId
export const getCommentsByProject = async (req, res, next) => {
  try {
    const { projectId } = req.params;

    const comments = await Comment.find({ 
      projectId,
      parentId: null, // Solo comentarios principales
    })
      .populate('author', 'name avatar role')
      .sort('-createdAt')
      .lean();

    // Obtener respuestas
    for (let comment of comments) {
      const replies = await Comment.find({ parentId: comment._id })
        .populate('author', 'name avatar role')
        .sort('createdAt')
        .lean();
      comment.replies = replies;
    }

    res.json(comments);
  } catch (error) {
    next(error);
  }
};

// POST /api/comments
export const createComment = async (req, res, next) => {
  try {
    const { projectId, content, parentId = null } = req.body;

    if (!content || content.trim().length === 0) {
      return res.status(400).json({ message: 'El comentario no puede estar vacío' });
    }

    // Sanitizar contenido para prevenir XSS
    const sanitizedContent = sanitizeHTML(content.trim());

    // Detectar contenido potencialmente malicioso
    if (content !== sanitizedContent) {
      logSuspicious('XSS attempt in comment', req.ip, {
        userId: req.user._id,
        projectId,
        original: content,
        sanitized: sanitizedContent
      });
    }

    const comment = await Comment.create({
      projectId,
      author: req.user._id,
      content: sanitizedContent,
      parentId,
    });

    const populatedComment = await Comment.findById(comment._id)
      .populate('author', 'name avatar role')
      .lean();

    // Emitir evento Socket.IO
    const io = req.app.get('io');
    io.to(`project_${projectId}`).emit('new_comment', populatedComment);

    logger.info(`Comentario creado por usuario ${req.user._id} en proyecto ${projectId}`);
    res.status(201).json(populatedComment);
  } catch (error) {
    logger.error('Error al crear comentario:', error);
    next(error);
  }
};

// DELETE /api/comments/:id
export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: 'Comentario no encontrado' });
    }

    // Verificar permiso
    if (comment.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ 
        message: 'No tienes permiso para eliminar este comentario' 
      });
    }

    // Eliminar también las respuestas
    await Comment.deleteMany({ parentId: comment._id });
    await Comment.findByIdAndDelete(req.params.id);

    res.json({ message: 'Comentario eliminado correctamente' });
  } catch (error) {
    next(error);
  }
};
