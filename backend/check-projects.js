/**
 * Script para verificar proyectos en la base de datos
 */

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '.env') });

const projectSchema = new mongoose.Schema({
  title: String,
  status: String,
  capturedBy: mongoose.Schema.Types.ObjectId,
  businessOwner: Object,
  createdAt: Date,
});

const Project = mongoose.model('Project', projectSchema);

async function checkProjects() {
  try {
    console.log('📡 Conectando a MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB\n');

    const allProjects = await Project.find().sort({ createdAt: -1 }).limit(5);
    
    console.log(`📊 Total de proyectos: ${allProjects.length}\n`);
    
    if (allProjects.length === 0) {
      console.log('⚠️  No hay proyectos en la base de datos');
    } else {
      allProjects.forEach((project, index) => {
        console.log(`Proyecto ${index + 1}:`);
        console.log('  Título:', project.title);
        console.log('  Status:', project.status);
        console.log('  Captado por:', project.capturedBy ? 'Sí (Credcamer)' : 'No');
        if (project.businessOwner) {
          console.log('  Dueño:', project.businessOwner.name);
        }
        console.log('  Creado:', project.createdAt);
        console.log('  ID:', project._id);
        console.log('');
      });
    }

    await mongoose.disconnect();
    console.log('👋 Desconectado de MongoDB');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkProjects();
