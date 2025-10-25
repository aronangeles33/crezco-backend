'use client'

import Link from 'next/link'
import { Header } from '../../../../components/Header'
import { Footer } from '../../../../components/Footer'

export default function GuidePromoteProjectPage() {
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
            <div className="text-5xl mb-4">📢</div>
            <h1 className="text-4xl font-bold mb-4">
              Cómo Promocionar tu Proyecto
            </h1>
            <p className="text-xl text-purple-100 mb-4">
              Estrategias de marketing para alcanzar tu meta de financiamiento
            </p>
            <div className="flex items-center gap-4 text-purple-100">
              <span>⏱️ 8 min lectura</span>
              <span>•</span>
              <span>📅 Actualizado: Octubre 2025</span>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-xl shadow-sm border p-8 md:p-12 prose prose-lg max-w-none">
            <h2>📋 Tabla de Contenidos</h2>
            <ul>
              <li><a href="#pre-lanzamiento">1. Antes del lanzamiento (30 días)</a></li>
              <li><a href="#dia-1">2. Los primeros 3 días (críticos)</a></li>
              <li><a href="#momentum">3. Mantener el momentum</a></li>
              <li><a href="#recta-final">4. La recta final (últimos 3 días)</a></li>
              <li><a href="#redes-sociales">5. Estrategia en redes sociales</a></li>
              <li><a href="#email">6. Email marketing efectivo</a></li>
              <li><a href="#medios">7. Relaciones con medios</a></li>
              <li><a href="#errores">8. Errores comunes a evitar</a></li>
            </ul>

            <hr />

            <div className="bg-purple-50 border-l-4 border-purple-500 p-4 my-6">
              <p className="font-semibold text-purple-800 mb-2">🎯 Dato clave:</p>
              <p className="text-purple-800">
                El 40% del total se recauda en los primeros 3 días y el 35% en los últimos 3 días. La promoción desde el día 1 es CRÍTICA.
              </p>
            </div>

            <h2 id="pre-lanzamiento">1. Antes del lanzamiento (30 días) 🚀</h2>
            
            <h3>Construye tu audiencia</h3>
            <ul>
              <li><strong>Crea landing page:</strong> Una página simple con "Próximamente" y formulario de email</li>
              <li><strong>Redes sociales:</strong> Publica contenido relacionado 2-3 veces por semana</li>
              <li><strong>Behind-the-scenes:</strong> Muestra el proceso de creación</li>
              <li><strong>Teasers:</strong> Genera curiosidad sin revelar todo</li>
            </ul>

            <h3>Lista de contactos (tu oro)</h3>
            <p>Crea una lista de al menos 100 personas que contactarás el día 1:</p>
            <ul>
              <li>✅ Familia y amigos cercanos</li>
              <li>✅ Colegas y ex-compañeros de trabajo</li>
              <li>✅ Comunidades online donde participas</li>
              <li>✅ Contactos de LinkedIn/Facebook</li>
              <li>✅ Clientes o fans existentes</li>
            </ul>

            <h3>Prepara contenido</h3>
            <p>Ten listo ANTES del lanzamiento:</p>
            <ul>
              <li>📸 10-15 imágenes de alta calidad</li>
              <li>🎬 1-2 videos cortos (15-60 seg) para redes</li>
              <li>📝 5 posts programados para la primera semana</li>
              <li>✉️ Email de lanzamiento redactado</li>
              <li>📰 Kit de prensa (si contactarás medios)</li>
            </ul>

            <h2 id="dia-1">2. Los primeros 3 días (CRÍTICOS) ⚡</h2>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 my-6">
              <p className="font-semibold text-red-800 mb-2">🔥 URGENTE:</p>
              <p className="text-red-800">
                Los primeros apoyos son los más importantes. Generan momentum y confianza en nuevos visitantes. Objetivo: alcanzar 30% de la meta en 72 horas.
              </p>
            </div>

            <h3>Día 1 - Hora por hora</h3>
            <p><strong>Hora 0 (Lanzamiento):</strong></p>
            <ul>
              <li>Envía email a tu lista completa</li>
              <li>Publica en TODAS tus redes sociales</li>
              <li>Pide a 10 amigos cercanos que apoyen en la primera hora</li>
            </ul>

            <p><strong>Horas 1-6:</strong></p>
            <ul>
              <li>Responde cada comentario y pregunta</li>
              <li>Agradece a cada apoyador públicamente</li>
              <li>Comparte progreso cada 2 horas</li>
            </ul>

            <p><strong>Horas 6-24:</strong></p>
            <ul>
              <li>Publica historias en Instagram/Facebook mostrando apoyos</li>
              <li>Contacta a 50 personas personalmente (mensajes directos)</li>
              <li>Celebra cada milestone (10%, 20%, etc.)</li>
            </ul>

            <h3>Días 2-3</h3>
            <ul>
              <li>Publica 2-3 veces al día en redes</li>
              <li>Varía el contenido: video, imagen, texto, stats</li>
              <li>Comparte testimonios de apoyadores</li>
              <li>Crea sentido de urgencia: "¡Ya llevamos X%!"</li>
            </ul>

            <h2 id="momentum">3. Mantener el momentum (Días 4-27) 📈</h2>

            <h3>Calendario de contenido</h3>
            <p><strong>Lunes:</strong> Update de progreso + nueva meta semanal</p>
            <p><strong>Miércoles:</strong> Behind-the-scenes o testimonial</p>
            <p><strong>Viernes:</strong> Celebración de milestone o agradecimiento</p>

            <h3>Updates de proyecto</h3>
            <p>Publica update en la plataforma cada 3-5 días:</p>
            <ul>
              <li>Progreso actual y próxima meta</li>
              <li>Nuevas features o recompensas</li>
              <li>Historias de apoyadores</li>
              <li>Behind-the-scenes del desarrollo</li>
            </ul>

            <h3>Colaboraciones</h3>
            <ul>
              <li>Busca proyectos similares y haz cross-promotion</li>
              <li>Contacta microinfluencers de tu nicho</li>
              <li>Participa en comunidades relevantes (sin spam)</li>
              <li>Haz entrevistas en podcasts pequeños</li>
            </ul>

            <h2 id="recta-final">4. La recta final (Últimos 3 días) 🏁</h2>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6">
              <p className="font-semibold text-yellow-800 mb-2">⚡ Últimas 72 horas:</p>
              <p className="text-yellow-800">
                Este es el momento de dar TODO. La gente que estuvo "esperando" tomará acción. Aumenta frecuencia de posts x2.
              </p>
            </div>

            <h3>Estrategia final</h3>
            <p><strong>72h antes:</strong></p>
            <ul>
              <li>Email: "Últimas 72 horas - No te quedes fuera"</li>
              <li>Publica countdown en redes cada 12h</li>
              <li>Activa recordatorios push a apoyadores inactivos</li>
            </ul>

            <p><strong>24h antes:</strong></p>
            <ul>
              <li>Email urgente: "ÚLTIMAS 24 HORAS"</li>
              <li>Livestream en Instagram/Facebook</li>
              <li>Publica cada 4 horas</li>
              <li>Muestra cuánto falta para la meta</li>
            </ul>

            <p><strong>Últimas 6 horas:</strong></p>
            <ul>
              <li>Countdown cada hora</li>
              <li>Historias de Instagram cada 2 horas</li>
              <li>Email final: "Quedan 6 horas"</li>
              <li>Activa a todos los amigos para compartir</li>
            </ul>

            <h2 id="redes-sociales">5. Estrategia en redes sociales 📱</h2>

            <h3>Instagram (Alto impacto visual)</h3>
            <ul>
              <li><strong>Feed:</strong> 1 post cada 2-3 días, fotos de calidad</li>
              <li><strong>Stories:</strong> 3-5 historias diarias (más casual)</li>
              <li><strong>Reels:</strong> 1-2 por semana (máximo alcance)</li>
              <li><strong>Hashtags:</strong> 15-20 relevantes por post</li>
            </ul>

            <h3>Facebook (Comunidad y grupos)</h3>
            <ul>
              <li>Crea evento de Facebook para el proyecto</li>
              <li>Únete a 10 grupos relevantes de tu nicho</li>
              <li>Comparte en tu timeline + grupos (sin spam)</li>
              <li>Usa Facebook Ads si tienes presupuesto (€5-10/día)</li>
            </ul>

            <h3>Twitter/X (Conversación)</h3>
            <ul>
              <li>Tweets cortos y frecuentes (2-3 al día)</li>
              <li>Usa threads para contar tu historia</li>
              <li>Interactúa con tu comunidad</li>
              <li>Usa hashtags trending cuando sea relevante</li>
            </ul>

            <h3>LinkedIn (B2B y profesional)</h3>
            <ul>
              <li>1 post detallado por semana</li>
              <li>Enfoque en problema/solución profesional</li>
              <li>Contacta a inversionistas potenciales</li>
            </ul>

            <h2 id="email">6. Email marketing efectivo ✉️</h2>

            <h3>Calendario de emails</h3>
            <ul>
              <li><strong>Día -7:</strong> "Próximamente: Algo grande viene"</li>
              <li><strong>Día 0:</strong> "¡LANZAMOS! Apóyanos ahora"</li>
              <li><strong>Día 3:</strong> "Primeros 3 días: ¡Increíble respuesta!"</li>
              <li><strong>Día 10:</strong> "Ya llevamos X%, pero necesitamos tu ayuda"</li>
              <li><strong>Día 20:</strong> "Última semana para apoyarnos"</li>
              <li><strong>Día 27:</strong> "¡ÚLTIMAS 72 HORAS!"</li>
              <li><strong>Día 29:</strong> "URGENTE: Quedan 24 horas"</li>
            </ul>

            <h3>Anatomía de un buen email</h3>
            <ul>
              <li><strong>Asunto:</strong> Claro, urgente, personal (usa emojis)</li>
              <li><strong>Primer párrafo:</strong> Por qué les escribes (personal)</li>
              <li><strong>Cuerpo:</strong> Qué es el proyecto (breve)</li>
              <li><strong>Call-to-action:</strong> Botón grande "Apoyar Ahora"</li>
              <li><strong>PS:</strong> Recordatorio o incentivo extra</li>
            </ul>

            <h2 id="medios">7. Relaciones con medios 📰</h2>

            <h3>Kit de prensa básico</h3>
            <ul>
              <li>Comunicado de prensa (1 página)</li>
              <li>Biografía corta del fundador</li>
              <li>5-10 fotos de alta resolución</li>
              <li>Logotipo en varios formatos</li>
              <li>Contacto directo (email/teléfono)</li>
            </ul>

            <h3>A quién contactar</h3>
            <ul>
              <li>📝 Blogs de tu nicho</li>
              <li>🎙️ Podcasts locales</li>
              <li>📺 Medios locales (periódicos, radio, TV)</li>
              <li>💻 Influencers y YouTubers de tu sector</li>
            </ul>

            <h3>Cómo hacer el pitch</h3>
            <ul>
              <li>Email corto (máx 150 palabras)</li>
              <li>Título: "Historia local: [Tu proyecto]"</li>
              <li>Por qué es interesante para SU audiencia</li>
              <li>Call-to-action: "¿Podemos hablar 10 min?"</li>
            </ul>

            <h2 id="errores">8. Errores comunes a evitar ❌</h2>

            <h3>❌ NO hagas esto:</h3>
            <ul>
              <li><strong>Spam:</strong> No envíes el mismo mensaje a 100 grupos</li>
              <li><strong>Silencio:</strong> No desaparezcas por días sin actualizar</li>
              <li><strong>Solo pedir dinero:</strong> Cuenta historias, no solo "dame dinero"</li>
              <li><strong>Ignorar comentarios:</strong> Responde SIEMPRE (en menos de 2h)</li>
              <li><strong>Esperar el último día:</strong> Para entonces ya es tarde</li>
            </ul>

            <h3>✅ SÍ haz esto:</h3>
            <ul>
              <li><strong>Sé auténtico:</strong> La gente apoya personas, no proyectos</li>
              <li><strong>Cuenta historias:</strong> Emociona, no solo informes</li>
              <li><strong>Agradece:</strong> A CADA apoyador, siempre</li>
              <li><strong>Sé constante:</strong> Mejor 10 posts regulares que 50 el día 1</li>
              <li><strong>Pide ayuda:</strong> No tengas miedo de pedir apoyo</li>
            </ul>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 my-6">
              <p className="font-semibold text-green-800 mb-2">💪 Recuerda:</p>
              <p className="text-green-800">
                Promocionar tu proyecto es el 80% del éxito. Un proyecto mediocre con gran marketing vence a un proyecto increíble sin promoción.
              </p>
            </div>

            <hr className="my-8" />

            <h2>📊 Checklist final de promoción</h2>
            <ul>
              <li>☐ Lista de 100+ contactos preparada</li>
              <li>☐ 10+ posts de redes sociales programados</li>
              <li>☐ 5+ emails escritos y listos</li>
              <li>☐ Kit de prensa creado</li>
              <li>☐ Plan de contenido para 30 días</li>
              <li>☐ Estrategia de redes definida</li>
              <li>☐ Calendario de actualizaciones</li>
            </ul>

            <h2>¿Listo para promocionar? 🚀</h2>
            <div className="flex gap-4 mt-6">
              <Link
                href="/projects"
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg transition"
              >
                Ver Proyectos Exitosos
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
