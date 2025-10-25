/**
 * Script para crear usuario de prueba
 * Uso: node create-test-user.js
 */

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar variables de entorno
dotenv.config({ path: path.resolve(__dirname, '.env') });

// Modelo User simplificado
const userSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true },
  email: String,
  name: String,
  avatar: String,
  role: {
    type: String,
    enum: ['supporter', 'creator', 'admin', 'credcamer'],
    default: 'supporter',
  },
  credcamerPoints: { type: Number, default: 0 },
  credcamerLevel: {
    type: String,
    enum: ['Novato', 'Pro', 'Elite', 'Leyenda'],
    default: 'Novato',
  },
  totalCaptured: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

async function createTestUser() {
  try {
    console.log('📡 Conectando a MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB\n');

    // Generar un clerkId único de prueba
    const testClerkId = `user_test_${Date.now()}`;
    
    // Crear usuario de prueba
    const testUser = new User({
      clerkId: testClerkId,
      email: 'testuser@crezco.com',
      name: 'Usuario de Prueba',
      avatar: '',
      role: 'supporter', // Rol normal para poder promoverlo
    });

    await testUser.save();

    console.log('✅ ¡Usuario de prueba creado exitosamente!\n');
    console.log('📋 Detalles:');
    console.log('   Email:', testUser.email);
    console.log('   Name:', testUser.name);
    console.log('   Clerk ID:', testUser.clerkId);
    console.log('   Role:', testUser.role);
    console.log('   ID MongoDB:', testUser._id);
    console.log('\n🎯 Este usuario ya aparecerá en /admin/credcamers');
    console.log('   en la tabla "Usuarios Normales"');
    console.log('\n💡 Recarga la página para verlo: http://localhost:3000/admin/credcamers\n');

    await mongoose.disconnect();
    console.log('👋 Desconectado de MongoDB');
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.code === 11000) {
      console.log('\n⚠️  El usuario de prueba ya existe. Puedes usar el script delete-test-user.js para eliminarlo primero.');
    }
    process.exit(1);
  }
}

createTestUser();
