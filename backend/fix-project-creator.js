import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function fixProject() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB\n');

    const projectId = '68f13b6ee3ab9582853608c6';
    const userId = '68efbf9521cc12b74a6b3f58';

    const result = await mongoose.connection.db
      .collection('projects')
      .updateOne(
        { _id: new mongoose.Types.ObjectId(projectId) },
        { 
          $set: { 
            creator: new mongoose.Types.ObjectId(userId),
            verificationStatus: {
              submitted: true,
              submittedAt: new Date()
            }
          } 
        }
      );

    console.log('✅ Proyecto actualizado:', result.modifiedCount);
    
    // Verificar
    const project = await mongoose.connection.db
      .collection('projects')
      .findOne({ _id: new mongoose.Types.ObjectId(projectId) });
    
    console.log('\n📦 PROYECTO:');
    console.log('  Título:', project.title);
    console.log('  Creator:', project.creator);
    console.log('  CapturedBy:', project.capturedBy);
    console.log('  Status:', project.status);

    await mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

fixProject();
