import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`✅ MongoDB conectado: ${conn.connection.host}`);

    // Manejar errores de conexión después de la conexión inicial
    mongoose.connection.on('error', (err) => {
      console.error('❌ Error de MongoDB:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('⚠️ MongoDB desconectado');
    });

  } catch (error) {
    console.error('❌ Error al conectar MongoDB:', error.message);
    console.error('');
    console.error('📖 SOLUCIÓN:');
    console.error('   1. Instala MongoDB localmente: https://www.mongodb.com/try/download/community');
    console.error('   2. O usa MongoDB Atlas (cloud gratuito): https://www.mongodb.com/cloud/atlas');
    console.error('   3. Lee instrucciones completas en: MONGODB_SETUP.md');
    console.error('');
    console.error('⚠️ El servidor continuará corriendo pero los endpoints de base de datos fallarán.');
    console.error('');
    // No cerrar el proceso para permitir que health check funcione
  }
};

export default connectDB;
