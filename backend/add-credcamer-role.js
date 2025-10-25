/**
 * Script para agregar rol credcamer a usuario existente
 * Uso: node add-credcamer-role.js <clerk_user_id>
 */

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '.env') });

const userSchema = new mongoose.Schema({
  clerkId: String,
  email: String,
  name: String,
  role: String,
  credcamerPoints: Number,
  credcamerLevel: String,
  totalCaptured: Number,
});

const User = mongoose.model('User', userSchema);

async function addCredcamerRole() {
  const clerkId = process.argv[2];

  if (!clerkId) {
    console.log('❌ Uso: node add-credcamer-role.js <clerk_user_id>');
    console.log('\nEjemplo: node add-credcamer-role.js user_346Qox2RZehQYh7FuEGMMbIAC7z');
    process.exit(1);
  }

  try {
    console.log('📡 Conectando a MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB\n');

    console.log('🔍 Buscando usuario con Clerk ID:', clerkId);
    const user = await User.findOne({ clerkId });

    if (!user) {
      console.log('❌ Usuario no encontrado');
      process.exit(1);
    }

    // Cambiar a credcamer (manteniendo admin si lo es)
    user.role = 'credcamer';
    user.credcamerPoints = user.credcamerPoints || 0;
    user.credcamerLevel = user.credcamerLevel || 'Novato';
    user.totalCaptured = user.totalCaptured || 0;

    await user.save();

    console.log('✅ ¡Usuario ahora es CREDCAMER!\n');
    console.log('📋 Detalles:');
    console.log('   Email:', user.email);
    console.log('   Role:', user.role);
    console.log('   Clerk ID:', user.clerkId);
    console.log('   Puntos:', user.credcamerPoints);
    console.log('   Nivel:', user.credcamerLevel);
    console.log('\n🎯 Ahora verás el botón "📈 Credcamer" en el header');
    console.log('   Recarga la página para verlo\n');

    await mongoose.disconnect();
    console.log('👋 Desconectado de MongoDB');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

addCredcamerRole();
