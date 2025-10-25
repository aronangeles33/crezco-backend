import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error('❌ ERROR: MONGODB_URI no está definido en .env');
  console.log('');
  console.log('📝 Asegúrate de tener en tu .env:');
  console.log('MONGODB_URI=mongodb+srv://usuario:password@cluster0.xxxxx.mongodb.net/crezco');
  process.exit(1);
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function testConnection() {
  try {
    console.log('⏳ Conectando a MongoDB Atlas...');
    console.log('');
    
    await client.connect();
    
    console.log('✅ ¡CONEXIÓN EXITOSA a MongoDB Atlas!');
    console.log('');
    
    // Probar ping a la base de datos
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Ping a la base de datos: OK");
    console.log('');
    
    // Mostrar bases de datos disponibles
    const databases = await client.db().admin().listDatabases();
    console.log('📊 Bases de datos disponibles:');
    databases.databases.forEach(db => {
      console.log(`   - ${db.name}`);
    });
    console.log('');
    
    console.log('🎉 Todo funciona correctamente!');
    console.log('');
    console.log('▶️  Ahora puedes iniciar el servidor backend:');
    console.log('   node src/server.js');
    
  } catch (err) {
    console.error('❌ ERROR al conectar a MongoDB:');
    console.error('');
    console.error('Detalles:', err.message);
    console.error('');
    
    if (err.message.includes('ENOTFOUND') || err.message.includes('ETIMEDOUT')) {
      console.error('💡 POSIBLES CAUSAS:');
      console.error('   1. La URI de MongoDB Atlas está mal escrita');
      console.error('   2. Tu IP no está en la whitelist de Atlas');
      console.error('   3. Usuario/password incorrectos');
      console.error('');
      console.error('🔧 SOLUCIONES:');
      console.error('   1. Verifica la URI en MongoDB Atlas → Connect → Connect your application');
      console.error('   2. En Atlas: Network Access → Add IP Address → Allow from Anywhere (0.0.0.0/0)');
      console.error('   3. En Atlas: Database Access → Verifica usuario y password');
    } else if (err.message.includes('authentication failed')) {
      console.error('💡 CAUSA: Usuario o contraseña incorrectos');
      console.error('');
      console.error('🔧 SOLUCIÓN:');
      console.error('   1. Ve a MongoDB Atlas → Database Access');
      console.error('   2. Verifica el usuario y password');
      console.error('   3. Si olvidaste el password, edita el usuario y cámbialo');
      console.error('   4. Actualiza el .env con el nuevo password');
    }
    
    process.exit(1);
  } finally {
    await client.close();
    console.log('');
    console.log('🔌 Conexión cerrada');
  }
}

console.log('');
console.log('🧪 TEST DE CONEXIÓN A MONGODB ATLAS');
console.log('═══════════════════════════════════');
console.log('');

testConnection();
