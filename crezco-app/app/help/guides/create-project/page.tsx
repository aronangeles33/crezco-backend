'use client'

import Link from 'next/link'
import { Header } from '../../../../components/Header'
import { Footer } from '../../../../components/Footer'

export default function GuideCreateProjectPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <Link href="/help" className="text-purple-600 hover:underline">← Volver a Ayuda</Link>
          </nav>

          {/* Header */}
          <div className="bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-2xl p-8 md:p-12 mb-8">
            <div className="text-5xl mb-4">📝</div>
            <h1 className="text-4xl font-bold mb-4">
              Guía Completa para Crear tu Primer Proyecto
            </h1>
            <p className="text-xl text-purple-100 mb-4">
              Paso a paso para configurar, escribir y lanzar tu proyecto exitosamente
            </p>
            <div className="flex items-center gap-4 text-purple-100">
              <span>⏱️ 10 min lectura</span>
              <span>•</span>
              <span>📅 Actualizado: Octubre 2025</span>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-xl shadow-sm border p-8 md:p-12 prose prose-lg max-w-none">
            <h2>📋 Tabla de Contenidos</h2>
            <ul>
              <li><a href="#preparacion">1. Preparación: Antes de empezar</a></li>
              <li><a href="#paso1">2. Paso 1: Identidad del proyecto</a></li>
              <li><a href="#paso2">3. Paso 2: Historia y storytelling</a></li>
              <li><a href="#paso3">4. Paso 3: Multimedia (fotos/videos)</a></li>
              <li><a href="#paso4">5. Paso 4: Redes sociales</a></li>
              <li><a href="#paso5">6. Paso 5: Recompensas (opcional)</a></li>
              <li><a href="#paso6">7. Paso 6: Revisión final</a></li>
              <li><a href="#tips">8. Tips para el éxito</a></li>
            </ul>

            <hr />

            <h2 id="preparacion">1. Preparación: Antes de empezar 🎯</h2>
            <p>
              Antes de crear tu proyecto, asegúrate de tener claro:
            </p>
            <ul>
              <li><strong>Tu objetivo:</strong> ¿Qué quieres lograr con el financiamiento?</li>
              <li><strong>Tu meta:</strong> ¿Cuánto dinero necesitas? (mínimo €100)</li>
              <li><strong>Tu audiencia:</strong> ¿Quién estaría interesado en tu proyecto?</li>
              <li><strong>Tu propuesta de valor:</strong> ¿Por qué alguien debería apoyarte?</li>
            </ul>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6">
              <p className="font-semibold text-yellow-800 mb-2">💡 Consejo Pro:</p>
              <p className="text-yellow-800">
                Los proyectos con metas realistas (€5,000 - €25,000) tienen 3x más probabilidad de éxito que proyectos con metas muy altas.
              </p>
            </div>

            <h2 id="paso1">2. Paso 1: Identidad del proyecto 📋</h2>
            <p>
              Este es el paso más importante. Aquí defines:
            </p>
            
            <h3>Título del proyecto</h3>
            <ul>
              <li>Máximo 100 caracteres</li>
              <li>Debe ser claro y descriptivo</li>
              <li>Incluye palabras clave que la gente buscaría</li>
            </ul>
            <p><strong>✅ Ejemplo bueno:</strong> "App de Delivery Sostenible para Reducir Emisiones en Madrid"</p>
            <p><strong>❌ Ejemplo malo:</strong> "Mi super app increíble"</p>

            <h3>Descripción corta</h3>
            <ul>
              <li>Entre 150-300 caracteres</li>
              <li>Resume tu proyecto en 2-3 frases</li>
              <li>Responde: ¿Qué problema resuelves?</li>
            </ul>

            <h3>Categoría</h3>
            <p>Elige la categoría que mejor describe tu proyecto:</p>
            <ul>
              <li>🚀 <strong>Startup:</strong> Negocios tecnológicos, apps, plataformas</li>
              <li>🎨 <strong>Arte:</strong> Galerías, exposiciones, obras artísticas</li>
              <li>🎙️ <strong>Podcast:</strong> Programas de audio, series narrativas</li>
              <li>🏪 <strong>Tienda:</strong> Comercios físicos u online</li>
              <li>📦 <strong>Otro:</strong> Educación, música, eventos, etc.</li>
            </ul>

            <h3>Meta de financiamiento</h3>
            <ul>
              <li>Mínimo: €100</li>
              <li>Calcula costos reales + comisiones (5% + 2-3% procesamiento)</li>
              <li>Incluye: producción, envíos, imprevistos (15% extra)</li>
            </ul>

            <h2 id="paso2">3. Paso 2: Historia y storytelling ✨</h2>
            <p>
              Aquí conectas emocionalmente con tus apoyadores. Una buena historia incluye:
            </p>

            <h3>Tu historia (Story)</h3>
            <ul>
              <li><strong>El problema:</strong> ¿Qué necesidad o dolor existe?</li>
              <li><strong>Tu solución:</strong> ¿Cómo tu proyecto lo resuelve?</li>
              <li><strong>Tu "por qué":</strong> ¿Por qué te importa este proyecto?</li>
              <li><strong>El impacto:</strong> ¿Qué cambiará si tienes éxito?</li>
            </ul>

            <h3>Tu pitch (Elevator pitch)</h3>
            <ul>
              <li>Máximo 200 palabras</li>
              <li>Debe convencer en 30 segundos</li>
              <li>Incluye tu propuesta de valor única</li>
            </ul>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
              <p className="font-semibold text-blue-800 mb-2">📊 Dato interesante:</p>
              <p className="text-blue-800">
                Proyectos con historias personales y auténticas tienen 60% más probabilidad de alcanzar su meta.
              </p>
            </div>

            <h2 id="paso3">4. Paso 3: Multimedia (fotos/videos) 📸</h2>
            <p>
              El contenido visual es CRÍTICO. Los proyectos con buen multimedia tienen 5x más conversión.
            </p>

            <h3>Fotos</h3>
            <ul>
              <li>Mínimo: 3 fotos de alta calidad</li>
              <li>Recomendado: 5-8 fotos variadas</li>
              <li>Formatos: JPG, PNG (máx 5MB cada una)</li>
              <li>Resolución mínima: 1280x720px</li>
            </ul>

            <p><strong>Tips para fotos efectivas:</strong></p>
            <ul>
              <li>✅ Muestra el producto/resultado final</li>
              <li>✅ Incluye fotos del equipo/fundador</li>
              <li>✅ Muestra el proceso o behind-the-scenes</li>
              <li>✅ Usa buena iluminación natural</li>
              <li>❌ Evita fotos borrosas o pixeladas</li>
            </ul>

            <h3>Videos (Opcional pero recomendado)</h3>
            <ul>
              <li>Duración ideal: 1-3 minutos</li>
              <li>Puedes usar enlaces de YouTube/Vimeo</li>
              <li>Habla directamente a cámara (genera confianza)</li>
            </ul>

            <h2 id="paso4">5. Paso 4: Redes sociales 🌐</h2>
            <p>
              Conecta tus redes para aumentar la credibilidad y alcance:
            </p>
            <ul>
              <li><strong>Website:</strong> Tu página web oficial (si tienes)</li>
              <li><strong>Instagram:</strong> Perfil de tu proyecto/negocio</li>
              <li><strong>Facebook:</strong> Página de Facebook</li>
              <li><strong>Twitter/X:</strong> Cuenta oficial</li>
              <li><strong>LinkedIn:</strong> Perfil profesional</li>
              <li><strong>TikTok:</strong> Si tu proyecto es visual/creativo</li>
            </ul>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 my-6">
              <p className="font-semibold text-green-800 mb-2">✅ Buena práctica:</p>
              <p className="text-green-800">
                Proyectos con 3+ redes sociales activas tienen 40% más engagement y recaudan 25% más.
              </p>
            </div>

            <h2 id="paso5">6. Paso 5: Recompensas (Opcional) 🎁</h2>
            <p>
              Ofrece recompensas para incentivar diferentes niveles de apoyo:
            </p>

            <h3>Ejemplos de recompensas por nivel:</h3>
            <ul>
              <li><strong>€10:</strong> Agradecimiento en redes sociales</li>
              <li><strong>€25:</strong> Newsletter exclusivo con updates</li>
              <li><strong>€50:</strong> Producto digital (ebook, wallpapers)</li>
              <li><strong>€100:</strong> Producto físico (merchandising)</li>
              <li><strong>€250+:</strong> Experiencias exclusivas o early access</li>
            </ul>

            <h2 id="paso6">7. Paso 6: Revisión final ✅</h2>
            <p>
              Antes de enviar, revisa:
            </p>
            <ul>
              <li>✅ Todos los campos están completos</li>
              <li>✅ No hay errores de ortografía</li>
              <li>✅ Las fotos se ven bien</li>
              <li>✅ Los enlaces funcionan</li>
              <li>✅ La meta es realista</li>
            </ul>

            <p><strong>Proceso de revisión:</strong></p>
            <ol>
              <li>Envías tu proyecto</li>
              <li>Nuestro equipo revisa en 24-48h</li>
              <li>Recibes aprobación o feedback</li>
              <li>¡Tu proyecto se publica!</li>
            </ol>

            <h2 id="tips">8. Tips para el éxito 🚀</h2>
            
            <h3>Antes del lanzamiento:</h3>
            <ul>
              <li>Construye audiencia en redes sociales (30 días antes)</li>
              <li>Crea lista de emails de interesados</li>
              <li>Prepara contenido para la primera semana</li>
              <li>Contacta a medios/influencers relevantes</li>
            </ul>

            <h3>Durante la campaña:</h3>
            <ul>
              <li>Publica updates cada 3-5 días</li>
              <li>Responde comentarios y preguntas rápido</li>
              <li>Agradece a cada apoyador</li>
              <li>Comparte progreso en redes sociales</li>
            </ul>

            <h3>Estadísticas clave:</h3>
            <ul>
              <li>El 40% del financiamiento llega en los primeros 3 días</li>
              <li>El 35% llega en los últimos 3 días</li>
              <li>Proyectos con video recaudan 120% más</li>
              <li>Responder comentarios aumenta conversión en 50%</li>
            </ul>

            <div className="bg-purple-50 border-l-4 border-purple-500 p-4 my-6">
              <p className="font-semibold text-purple-800 mb-2">🎯 Objetivo final:</p>
              <p className="text-purple-800">
                Tu proyecto debe responder claramente: ¿QUÉ haces? ¿POR QUÉ importa? ¿CÓMO lo lograrás? ¿QUIÉN se beneficia?
              </p>
            </div>

            <hr className="my-8" />

            <h2>¿Listo para empezar? 🚀</h2>
            <div className="flex gap-4 mt-6">
              <Link
                href="/create"
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg transition"
              >
                Crear Mi Proyecto
              </Link>
              <Link
                href="/help"
                className="px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                Volver a Ayuda
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
