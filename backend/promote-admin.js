/**
 * Script para promover usuario a administrador
 * Uso: node promote-admin.js <clerk_user_id>
 * 
 * Ejemplo: node promote-admin.js user_2abc123xyz
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
  role: { 
    type: String, 
    enum: ['supporter', 'creator', 'admin', 'credcamer'],
    default: 'supporter'
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

async function promoteToAdmin(clerkId) {
  try {
    console.log('📡 Conectando a MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB\n');

    if (!clerkId) {
      console.log('❌ Error: Debes proporcionar un Clerk User ID');
      console.log('📝 Uso: node promote-admin.js <clerk_user_id>');
      console.log('💡 Puedes encontrar tu Clerk ID en el dashboard de Clerk o iniciando sesión\n');
      
      // Mostrar usuarios existentes
      console.log('📋 Usuarios en la base de datos:');
      const users = await User.find({}).limit(10);
      
      if (users.length === 0) {
        console.log('   No hay usuarios registrados todavía\n');
      } else {
        users.forEach(user => {
          console.log(`   - ${user.email || 'Sin email'} (${user.clerkId}) - Role: ${user.role}`);
        });
        console.log('');
      }
      
      process.exit(1);
    }

    console.log(`🔍 Buscando usuario con Clerk ID: ${clerkId}...`);
    const user = await User.findOne({ clerkId });

    if (!user) {
      console.log(`❌ Usuario no encontrado con Clerk ID: ${clerkId}`);
      console.log('💡 Asegúrate de que el usuario haya iniciado sesión al menos una vez\n');
      
      // Mostrar usuarios disponibles
      console.log('📋 Usuarios disponibles:');
      const users = await User.find({}).limit(10);
      users.forEach(u => {
        console.log(`   - ${u.email || 'Sin email'} (${u.clerkId}) - Role: ${u.role}`);
      });
      
      process.exit(1);
    }

    if (user.role === 'admin') {
      console.log(`ℹ️  El usuario ${user.email || clerkId} ya es administrador\n`);
      process.exit(0);
    }

    user.role = 'admin';
    await user.save();

    console.log(`✅ ¡Usuario promovido a ADMIN exitosamente!`);
    console.log(`   Email: ${user.email || 'No disponible'}`);
    console.log(`   Clerk ID: ${user.clerkId}`);
    console.log(`   Role: ${user.role}`);
    console.log(`   ID MongoDB: ${user._id}\n`);
    
    console.log('🎉 Ya puedes usar los endpoints de administrador:\n');
    console.log('   GET  /api/projects/pending  - Ver proyectos pendientes');
    console.log('   POST /api/projects/:id/approve - Aprobar proyecto');
    console.log('   POST /api/projects/:id/reject  - Rechazar proyecto\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('👋 Desconectado de MongoDB');
    process.exit(0);
  }
}

// Ejecutar
const clerkId = process.argv[2];
promoteToAdmin(clerkId);
