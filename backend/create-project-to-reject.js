import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  goalAmount: Number,
  currentAmount: { type: Number, default: 0 },
  status: String,
  capturedBy: mongoose.Schema.Types.ObjectId,
  businessOwner: {
    name: String,
    contact: String
  },
  storytelling: {
    story: String,
    photos: [String],
    videos: [String],
    audios: [String]
  },
  socialMedia: {
    facebook: String,
    instagram: String
  },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);

async function createTestProject() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB\n');

    const project = new Project({
      title: 'Proyecto para Rechazar (TEST)',
      description: 'Este proyecto será rechazado para verificar que NO se otorgan puntos',
      category: 'other',
      goalAmount: 25000,
      status: 'pending_review',
      creator: new mongoose.Types.ObjectId('68efbf9521cc12b74a6b3f58'), // ID del credcamer (también es creador para simplificar)
      capturedBy: new mongoose.Types.ObjectId('68efbf9521cc12b74a6b3f58'), // ID del credcamer
      verificationStatus: {
        submitted: true,
        submittedAt: new Date()
      },
      businessOwner: {
        name: 'Pedro López',
        contact: 'pedro@test.com'
      },
      storytelling: {
        story: 'Proyecto de prueba para test de rechazo',
        photos: [],
        videos: [],
        audios: []
      },
      socialMedia: {
        facebook: 'https://facebook.com/test',
        instagram: '@test'
      }
    });

    await project.save();

    console.log('✅ Proyecto de prueba creado!\n');
    console.log('📦 DETALLES:');
    console.log('  Título:', project.title);
    console.log('  Status:', project.status);
    console.log('  ID:', project._id);
    console.log('\n⚠️  SIGUIENTE PASO:');
    console.log('  1. Ve a http://localhost:3000/admin/pending');
    console.log('  2. Rechaza este proyecto');
    console.log('  3. Verifica que NO se otorgan puntos');

    await mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

createTestProject();
