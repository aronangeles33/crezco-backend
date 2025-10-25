import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const userSchema = new mongoose.Schema({
  clerkId: String,
  name: String,
  email: String,
  role: String,
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

async function degradeToSupporter(clerkId) {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB\n');

    const user = await User.findOne({ clerkId });

    if (!user) {
      console.log('❌ Usuario no encontrado');
      process.exit(1);
    }

    console.log('👤 ANTES:');
    console.log('  Email:', user.email);
    console.log('  Role:', user.role);

    user.role = 'supporter';
    await user.save();

    console.log('\n✅ Usuario degradado a SUPPORTER\n');
    console.log('👤 DESPUÉS:');
    console.log('  Email:', user.email);
    console.log('  Role:', user.role);

    console.log('\n🔒 Ahora este usuario NO puede acceder a /credcamer');
    console.log('   Recarga la página para ver el error 403');

    await mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

const clerkId = process.argv[2];
if (!clerkId) {
  console.log('❌ Uso: node degrade-to-supporter.js <CLERK_ID>');
  process.exit(1);
}

degradeToSupporter(clerkId);
