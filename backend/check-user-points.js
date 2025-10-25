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

const User = mongoose.model('User', userSchema);

async function checkUser() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB\n');

    // Buscar el usuario credcamer
    const user = await User.findOne({ 
      clerkId: 'user_346Qox2RZehQYh7FuEGMMbIAC7z' 
    });

    if (user) {
      console.log('📊 USUARIO CREDCAMER:');
      console.log('  Nombre:', user.name);
      console.log('  Email:', user.email);
      console.log('  Rol:', user.role);
      console.log('  📈 PUNTOS:', user.points);
      console.log('  🏆 NIVEL:', user.level);
      console.log('  📦 Total Captados:', user.totalCaptured);
      console.log('  📊 Stats:', user.stats);
      console.log('  🆔 ID:', user._id);
    } else {
      console.log('❌ Usuario no encontrado');
    }

    await mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

checkUser();
