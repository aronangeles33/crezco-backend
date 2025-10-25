import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from './src/models/Project.js';
import User from './src/models/User.js';

dotenv.config();

const demoProjects = [
  {
    title: "App de Delivery Sostenible",
    description: "Plataforma de delivery que conecta restaurantes locales con usuarios, priorizando envases biodegradables y rutas optimizadas para reducir emisiones de CO2.",
    category: "startup",
    goalAmount: 25000,
    currentAmount: 8500,
    supportersCount: 42,
    storytelling: {
      photos: ["https://images.unsplash.com/photo-1526367790999-0150786686a2?w=800"],
      story: "Queremos revolucionar el delivery en nuestra ciudad con un enfoque 100% sostenible.",
      pitch: "El futuro del delivery es verde. Únete a nuestra misión de reducir la huella de carbono en cada entrega."
    },
    status: "active"
  },
  {
    title: "Galería de Arte Urbano",
    description: "Espacio dedicado a artistas emergentes de arte urbano y graffiti. Exposiciones mensuales, talleres y venta de obras originales.",
    category: "art",
    goalAmount: 15000,
    currentAmount: 12000,
    supportersCount: 87,
    storytelling: {
      photos: ["https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800"],
      story: "El arte urbano merece un espacio donde brillar. Creamos una galería que celebra la cultura de la calle.",
      pitch: "Apoya el arte urbano y ayuda a artistas emergentes a mostrar su talento al mundo."
    },
    status: "active"
  },
  {
    title: "Podcast Tech en Español",
    description: "Podcast semanal sobre tecnología, startups y innovación en español. Entrevistas con fundadores, ingenieros y emprendedores de Latinoamérica.",
    category: "podcast",
    goalAmount: 8000,
    currentAmount: 5200,
    supportersCount: 156,
    storytelling: {
      photos: ["https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800"],
      story: "La comunidad tech de habla hispana necesita más contenido de calidad. Queremos llevar las mejores historias a tu oído.",
      pitch: "Tecnología, innovación y emprendimiento en tu idioma. Únete a nuestra comunidad de oyentes."
    },
    status: "active"
  },
  {
    title: "Tienda Zero Waste",
    description: "Tienda física y online especializada en productos sin plástico. Desde cosmética sólida hasta utensilios reutilizables para una vida sin residuos.",
    category: "shop",
    goalAmount: 18000,
    currentAmount: 3400,
    supportersCount: 28,
    storytelling: {
      photos: ["https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800"],
      story: "Vivir sin generar basura es posible. Queremos hacer accesibles los productos sostenibles para todos.",
      pitch: "Reduce tu huella ecológica con productos que cuidan el planeta. Cada compra es un paso hacia el futuro."
    },
    status: "active"
  },
  {
    title: "Escuela de Música Comunitaria",
    description: "Proyecto educativo que ofrece clases de música gratuitas a niños y jóvenes de barrios vulnerables. Instrumentos, teoría y formación de bandas.",
    category: "other",
    goalAmount: 30000,
    currentAmount: 18500,
    supportersCount: 203,
    storytelling: {
      photos: ["https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800"],
      story: "La música transforma vidas. Queremos dar oportunidades a jóvenes que no tienen acceso a educación musical.",
      pitch: "Cada niño merece descubrir su talento. Ayúdanos a formar la próxima generación de músicos."
    },
    status: "active"
  },
  {
    title: "Plataforma de Tutorías Online",
    description: "Startup que conecta estudiantes con tutores especializados. Clases en vivo, material educativo y seguimiento personalizado del progreso.",
    category: "startup",
    goalAmount: 40000,
    currentAmount: 22000,
    supportersCount: 94,
    storytelling: {
      photos: ["https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800"],
      story: "La educación de calidad debe ser accesible para todos. Creamos una plataforma que democratiza el aprendizaje.",
      pitch: "El futuro de la educación es personalizado y online. Únete a nuestra revolución educativa."
    },
    status: "active"
  },
  {
    title: "Colectivo de Ilustradores",
    description: "Espacio colaborativo para ilustradores independientes. Incluye estudio compartido, recursos digitales y marketplace para vender obras.",
    category: "art",
    goalAmount: 12000,
    currentAmount: 9800,
    supportersCount: 67,
    storytelling: {
      photos: ["https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800"],
      story: "Los ilustradores merecen un espacio donde crear y colaborar. Construimos una comunidad artística vibrante.",
      pitch: "Arte hecho con pasión. Apoya a ilustradores emergentes y lleva arte único a tu hogar."
    },
    status: "active"
  },
  {
    title: "Podcast de Historia Olvidada",
    description: "Serie de podcast que rescata historias poco conocidas de América Latina. Investigación rigurosa con narrativa envolvente.",
    category: "podcast",
    goalAmount: 6000,
    currentAmount: 4100,
    supportersCount: 189,
    storytelling: {
      photos: ["https://images.unsplash.com/photo-1589903308904-1010c2294adc?w=800"],
      story: "Nuestra historia está llena de relatos fascinantes que nadie cuenta. Queremos rescatar esas voces olvidadas.",
      pitch: "Historia con corazón. Descubre las historias que los libros no cuentan."
    },
    status: "active"
  }
];

async function createDemoProjects() {
  try {
    console.log('📡 Conectando a MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB\n');

    // Buscar un usuario existente para asignar como creator
    const user = await User.findOne();
    if (!user) {
      console.log('❌ No se encontró ningún usuario. Crea un usuario primero.');
      process.exit(1);
    }

    console.log(`👤 Usuario encontrado: ${user.name} (${user.email})`);
    console.log(`📦 Creando ${demoProjects.length} proyectos de demostración...\n`);

    let created = 0;
    for (const projectData of demoProjects) {
      const project = new Project({
        ...projectData,
        creator: user._id,
        createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000) // Fechas aleatorias últimos 30 días
      });

      await project.save();
      created++;
      console.log(`✅ ${created}. "${project.title}" - ${project.category}`);
    }

    console.log(`\n🎉 ${created} proyectos creados exitosamente!`);
    console.log('\n📊 Resumen por categoría:');
    console.log(`  🚀 Startup: ${demoProjects.filter(p => p.category === 'startup').length}`);
    console.log(`  🎨 Arte: ${demoProjects.filter(p => p.category === 'art').length}`);
    console.log(`  🎙️ Podcast: ${demoProjects.filter(p => p.category === 'podcast').length}`);
    console.log(`  🏪 Tienda: ${demoProjects.filter(p => p.category === 'shop').length}`);
    console.log(`  📦 Otro: ${demoProjects.filter(p => p.category === 'other').length}`);

    console.log('\n👋 Visita http://localhost:3000/projects para verlos!');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('\n👋 Desconectado de MongoDB');
  }
}

createDemoProjects();
