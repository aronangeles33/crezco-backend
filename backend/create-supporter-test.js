import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const userSchema = new mongoose.Schema({
  clerkId: String,
  name: String,
  email: String,
  role: String,
  points: { type: Number, default: 0 },
  level: { type: String, default: 'Novato' },
  totalCaptured: { type: Number, default: 0 },
  avatar: String,
  bio: String,
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

async function createSupporterUser() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB\n');

    // Crear usuario supporter de prueba
    const testUser = new User({
      clerkId: `test_supporter_${Date.now()}`,
      name: 'Juan Pérez',
      email: 'juan.perez.test@crezco.com',
      role: 'supporter',
      points: 0,
      level: 'Novato',
      totalCaptured: 0,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=juan',
      bio: 'Usuario de prueba - Supporter',
    });

    await testUser.save();

    console.log('✅ Usuario SUPPORTER creado exitosamente!\n');
    console.log('📋 DETALLES:');
    console.log('  Nombre:', testUser.name);
    console.log('  Email:', testUser.email);
    console.log('  Role:', testUser.role);
    console.log('  Clerk ID:', testUser.clerkId);
    console.log('  MongoDB ID:', testUser._id);
    console.log('\n⚠️  IMPORTANTE:');
    console.log('  Este usuario NO puede acceder a /credcamer');
    console.log('  Solo puede crear proyectos propios y apoyar otros');
    console.log('\n🔗 Para probar acceso denegado:');
    console.log('  1. Abre modo incógnito');
    console.log('  2. Ve a http://localhost:3000/credcamer');
    console.log('  3. Deberías ver error 403 o redirección');

    await mongoose.connection.close();
    console.log('\n👋 Desconectado de MongoDB');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

createSupporterUser();
