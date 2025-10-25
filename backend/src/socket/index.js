export const setupSocketIO = (io) => {
  // Guardar io globalmente para usarlo en webhooks
  global.io = io;

  io.on('connection', (socket) => {
    console.log('✅ Cliente conectado:', socket.id);

    // Usuario se une a su sala personal
    socket.on('join_user', (userId) => {
      socket.join(`user_${userId}`);
      console.log(`Usuario ${userId} se unió a su sala`);
    });

    // Usuario se une a la sala de un proyecto
    socket.on('join_project', (projectId) => {
      socket.join(`project_${projectId}`);
      console.log(`Usuario se unió al proyecto ${projectId}`);
    });

    // Usuario sale de la sala de un proyecto
    socket.on('leave_project', (projectId) => {
      socket.leave(`project_${projectId}`);
      console.log(`Usuario salió del proyecto ${projectId}`);
    });

    // Notificación de typing en comentarios
    socket.on('typing_comment', ({ projectId, userName }) => {
      socket.to(`project_${projectId}`).emit('user_typing', { userName });
    });

    socket.on('disconnect', () => {
      console.log('❌ Cliente desconectado:', socket.id);
    });
  });

  return io;
};
