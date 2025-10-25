/**
 * Script para crear usuario admin de prueba
 * Uso: node create-admin-test.js
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

async function createAdminTest() {
  try {
    console.log('📡 Conectando a MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB\n');

    // Generar un clerkId único de prueba
    const testClerkId = `user_admin_test_${Date.now()}`;
    
    // Crear usuario admin de prueba
    const adminUser = new User({
      clerkId: testClerkId,
      email: 'admin@crezco.com',
      name: 'Admin de Prueba',
      avatar: '',
      role: 'admin', // Rol de administrador
    });

    await adminUser.save();

    console.log('✅ ¡Usuario ADMIN de prueba creado exitosamente!\n');
    console.log('📋 Detalles:');
    console.log('   Email:', adminUser.email);
    console.log('   Name:', adminUser.name);
    console.log('   Clerk ID:', adminUser.clerkId);
    console.log('   Role:', adminUser.role);
    console.log('   ID MongoDB:', adminUser._id);
    console.log('\n🎯 Este usuario tiene permisos de administrador completos');
    console.log('   Puede acceder a /admin/credcamers');
    console.log('\n⚠️  NOTA: Este usuario NO existe en Clerk, solo en MongoDB');
    console.log('   Para hacer login real, usa tu usuario actual y promociónalo con promote-admin.js\n');

    await mongoose.disconnect();
    console.log('👋 Desconectado de MongoDB');
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.code === 11000) {
      console.log('\n⚠️  El usuario admin de prueba ya existe.');
    }
    process.exit(1);
  }
}

createAdminTest();
