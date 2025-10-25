import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const projectId = '68f139b18876a5421d1056ce';

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('✅ Conectado a MongoDB');
    
    const result = await mongoose.connection.db
      .collection('projects')
      .deleteOne({ _id: new mongoose.Types.ObjectId(projectId) });
    
    console.log(`✅ Proyecto eliminado: ${result.deletedCount} documento(s)`);
    
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Error:', err);
    process.exit(1);
  });
