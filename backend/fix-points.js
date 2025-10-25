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
  stats: {
    totalPoints: { type: Number, default: 0 },
    projectsCaptured: { type: Number, default: 0 },
    successRate: { type: Number, default: 0 }
  }
}, { timestamps: true });

const projectSchema = new mongoose.Schema({
  title: String,
  goalAmount: Number,
  status: String,
  capturedBy: mongoose.Schema.Types.ObjectId,
  pointsAwarded: { type: Number, default: 0 },
  storytelling: {
    story: String,
    photos: [String],
    videos: [String],
    audios: [String]
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
const Project = mongoose.model('Project', projectSchema);

async function fixPoints() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB\n');

    // Buscar el proyecto aprobado
    const project = await Project.findById('68f12f7e450c80d3da7ed26d');
    
    if (!project) {
      console.log('❌ Proyecto no encontrado');
      return;
    }

    console.log('📦 PROYECTO:', project.title);
    console.log('  Estado:', project.status);
    console.log('  Meta:', project.goalAmount);
    console.log('  Captado por:', project.capturedBy);

    // Calcular puntos
    let points = 10; // Base
    points += Math.floor(project.goalAmount / 1000); // Bonus por monto
    
    if (project.storytelling?.photos?.length > 0) {
      points += 5;
      console.log('  ✅ Bonus fotos: +5');
    }
    if (project.storytelling?.story) {
      points += 3;
      console.log('  ✅ Bonus historia: +3');
    }

    console.log('\n🎯 PUNTOS CALCULADOS:', points);

    // Actualizar usuario
    const user = await User.findById(project.capturedBy);
    
    if (!user) {
      console.log('❌ Usuario credcamer no encontrado');
      return;
    }

    console.log('\n👤 USUARIO ANTES:');
    console.log('  Puntos:', user.points);
    console.log('  Nivel:', user.level);

    user.points = (user.points || 0) + points;
    
    // Actualizar stats
    if (!user.stats) {
      user.stats = { totalPoints: 0, projectsCaptured: 0, successRate: 0 };
    }
    user.stats.totalPoints = user.points;
    user.stats.projectsCaptured = user.totalCaptured;
    
    // Actualizar nivel
    if (user.points >= 300) {
      user.level = 'Leyenda';
    } else if (user.points >= 150) {
      user.level = 'Elite';
    } else if (user.points >= 50) {
      user.level = 'Pro';
    } else {
      user.level = 'Novato';
    }

    await user.save();

    // Actualizar proyecto
    project.pointsAwarded = points;
    await project.save();

    console.log('\n👤 USUARIO DESPUÉS:');
    console.log('  Puntos:', user.points);
    console.log('  Nivel:', user.level);
    console.log('  Stats:', user.stats);

    console.log('\n✅ Puntos otorgados exitosamente!');

    await mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

fixPoints();
