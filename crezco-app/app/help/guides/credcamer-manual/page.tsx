'use client'

import Link from 'next/link'
import { Header } from '../../../../components/Header'
import { Footer } from '../../../../components/Footer'

export default function GuideCredcamerManualPage() {
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
          <div className="bg-gradient-to-br from-yellow-500 to-orange-600 text-white rounded-2xl p-8 md:p-12 mb-8">
            <div className="text-5xl mb-4">🎯</div>
            <h1 className="text-4xl font-bold mb-4">
              Manual Completo de Credcamer
            </h1>
            <p className="text-xl text-yellow-100 mb-4">
              Conviértete en cazatalentos de proyectos prometedores y gana puntos
            </p>
            <div className="flex items-center gap-4 text-yellow-100">
              <span>⏱️ 12 min lectura</span>
              <span>•</span>
              <span>📅 Actualizado: Octubre 2025</span>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-xl shadow-sm border p-8 md:p-12 prose prose-lg max-w-none">
            <h2>📋 Tabla de Contenidos</h2>
            <ul>
              <li><a href="#que-es">1. ¿Qué es ser Credcamer?</a></li>
              <li><a href="#como-funciona">2. Cómo funciona el sistema</a></li>
              <li><a href="#requisitos">3. Requisitos para ser Credcamer</a></li>
              <li><a href="#wizard">4. El wizard de captación (6 pasos)</a></li>
              <li><a href="#puntos">5. Sistema de puntos detallado</a></li>
              <li><a href="#niveles">6. Niveles y progresión</a></li>
              <li><a href="#leaderboard">7. Leaderboard y competencia</a></li>
              <li><a href="#estrategias">8. Estrategias para ser top Credcamer</a></li>
              <li><a href="#beneficios">9. Beneficios actuales y futuros</a></li>
              <li><a href="#faq">10. FAQ de Credcamers</a></li>
            </ul>

            <hr />

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6">
              <p className="font-semibold text-yellow-800 mb-2">🌟 ¿Sabías que...?</p>
              <p className="text-yellow-800">
                Los Credcamers han ayudado a lanzar más de 2,500 proyectos exitosos en 2024. El top Credcamer del mes gana hasta €500 en recompensas.
              </p>
            </div>

            <h2 id="que-es">1. ¿Qué es ser Credcamer? 🎯</h2>
            
            <p>
              Un <strong>Credcamer</strong> es un <strong>cazatalentos de proyectos</strong>. Tu misión es descubrir 
              proyectos prometedores <em>antes</em> de que se lancen en la plataforma y ayudarles a tener éxito 
              desde el día 1.
            </p>

            <h3>¿Por qué es importante?</h3>
            <p>Los proyectos "captados" por Credcamers tienen:</p>
            <ul>
              <li>📈 <strong>73% más probabilidad</strong> de alcanzar su meta</li>
              <li>⚡ <strong>2.5x más rápido</strong> en financiarse</li>
              <li>⭐ <strong>Mayor calidad</strong> en contenido y presentación</li>
              <li>🎯 <strong>Mejor preparación</strong> antes del lanzamiento</li>
            </ul>

            <h3>¿Qué NO es Credcamer?</h3>
            <ul>
              <li>❌ No es solo "recomendar" proyectos existentes</li>
              <li>❌ No es spam o marketing agresivo</li>
              <li>❌ No es aprobar/rechazar (eso lo hace el admin)</li>
              <li>❌ No recibes comisión directa por proyectos (ganas puntos)</li>
            </ul>

            <h2 id="como-funciona">2. Cómo funciona el sistema 🔄</h2>

            <h3>El ciclo completo</h3>
            <ol>
              <li><strong>Descubres un proyecto prometedor</strong> (emprendedor, idea, startup)</li>
              <li><strong>Los ayudas a prepararse</strong> (consejos, feedback)</li>
              <li><strong>Los capturas en el sistema</strong> (wizard de 6 pasos)</li>
              <li><strong>Admin revisa y aprueba</strong> (o pide cambios)</li>
              <li><strong>Proyecto se lanza</strong> en la plataforma</li>
              <li><strong>Tú ganas puntos</strong> según el desempeño del proyecto</li>
            </ol>

            <h3>Flujo visual</h3>
            <div className="bg-gray-100 p-6 rounded-lg my-6">
              <pre className="text-sm">
{`Tú descubres → Ayudas a preparar → Captas (wizard)
                                         ↓
                                   Admin revisa
                                         ↓
                              Aprobado / Cambios
                                         ↓
                               Proyecto se lanza
                                         ↓
                              ✨ GANAS PUNTOS ✨`}
              </pre>
            </div>

            <h2 id="requisitos">3. Requisitos para ser Credcamer ✅</h2>

            <h3>Requisitos obligatorios</h3>
            <ul>
              <li>✅ Cuenta verificada en Impulso Crezco</li>
              <li>✅ Haber apoyado al menos 1 proyecto</li>
              <li>✅ Completar el tutorial de Credcamer (5 min)</li>
              <li>✅ Aceptar el código de conducta</li>
            </ul>

            <h3>Habilidades recomendadas</h3>
            <ul>
              <li>👁️ Ojo para detectar proyectos con potencial</li>
              <li>💬 Buena comunicación y empatía</li>
              <li>📝 Capacidad de dar feedback constructivo</li>
              <li>🌐 Red de contactos en emprendimiento</li>
              <li>⏰ Tiempo para seguimiento (2-3h por semana)</li>
            </ul>

            <h3>Cómo activar tu rol Credcamer</h3>
            <ol>
              <li>Ve a tu perfil → Configuración</li>
              <li>Click en "Convertirme en Credcamer"</li>
              <li>Completa el tutorial interactivo</li>
              <li>Acepta términos y condiciones</li>
              <li>¡Listo! Ya puedes captar proyectos</li>
            </ol>

            <h2 id="wizard">4. El wizard de captación (6 pasos) 🧙</h2>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
              <p className="font-semibold text-blue-800 mb-2">💡 Consejo:</p>
              <p className="text-blue-800">
                Completa el wizard CON el emprendedor presente. Es una sesión de trabajo colaborativa, no un formulario solitario.
              </p>
            </div>

            <h3>Paso 1: Información del Creador</h3>
            <p>Datos del emprendedor detrás del proyecto:</p>
            <ul>
              <li>Nombre completo</li>
              <li>Email de contacto</li>
              <li>Teléfono (opcional pero recomendado)</li>
              <li>LinkedIn/web personal</li>
              <li>Biografía corta (150-300 palabras)</li>
            </ul>

            <h3>Paso 2: Información del Proyecto</h3>
            <ul>
              <li>Título (40-60 caracteres)</li>
              <li>Categoría (startup, arte, podcast, tienda, otro)</li>
              <li>Descripción corta (elevator pitch, 160 caracteres)</li>
              <li>Descripción completa (800-2000 palabras)</li>
              <li>Problema que resuelve</li>
              <li>Solución propuesta</li>
            </ul>

            <h3>Paso 3: Objetivos Financieros</h3>
            <ul>
              <li>Meta de financiamiento (mínimo €1,000)</li>
              <li>Duración de la campaña (15-60 días)</li>
              <li>Desglose del uso de fondos (categorizado)</li>
              <li>Plan de ejecución del proyecto</li>
            </ul>

            <h3>Paso 4: Materiales Visuales</h3>
            <ul>
              <li>Imagen principal (1200x675px, obligatoria)</li>
              <li>4-6 imágenes adicionales (alta calidad)</li>
              <li>Video pitch (1-3 min, recomendado)</li>
              <li>Logotipo (si aplica)</li>
              <li>Prototipo/mockup (si aplica)</li>
            </ul>

            <h3>Paso 5: Análisis de Viabilidad</h3>
            <p>Esta es TU evaluación como Credcamer:</p>
            <ul>
              <li><strong>Potencial de éxito</strong> (1-5 estrellas)</li>
              <li><strong>Calidad de presentación</strong> (1-5 estrellas)</li>
              <li><strong>Viabilidad del plan</strong> (1-5 estrellas)</li>
              <li><strong>Preparación del creador</strong> (1-5 estrellas)</li>
              <li><strong>Notas privadas</strong> (solo admin las ve)</li>
            </ul>

            <h3>Paso 6: Revisión y Envío</h3>
            <ul>
              <li>Checklist de calidad (12 puntos)</li>
              <li>Preview de cómo se verá el proyecto</li>
              <li>Confirmar datos del creador</li>
              <li>Mensaje al equipo de revisión</li>
              <li>Enviar a revisión</li>
            </ul>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 my-6">
              <p className="font-semibold text-green-800 mb-2">⚡ Tiempo estimado:</p>
              <p className="text-green-800">
                Con un proyecto bien preparado, el wizard toma 20-30 minutos. Si falta información, puede tomar 1-2 horas en sesiones.
              </p>
            </div>

            <h2 id="puntos">5. Sistema de puntos detallado 🎖️</h2>

            <h3>Puntos base por captación</h3>
            <ul>
              <li><strong>+10 puntos:</strong> Por enviar captación completa</li>
              <li><strong>+20 puntos:</strong> Si el proyecto es aprobado</li>
              <li><strong>+30 puntos:</strong> Si se lanza en menos de 7 días</li>
            </ul>

            <h3>Puntos por desempeño del proyecto</h3>
            <ul>
              <li><strong>+50 puntos:</strong> El proyecto alcanza 30% en primeros 3 días</li>
              <li><strong>+100 puntos:</strong> El proyecto alcanza su meta</li>
              <li><strong>+150 puntos:</strong> El proyecto supera meta en +50%</li>
              <li><strong>+200 puntos:</strong> El proyecto supera meta en +100%</li>
            </ul>

            <h3>Bonos especiales</h3>
            <ul>
              <li><strong>+25 puntos:</strong> Proyecto con video (calidad alta)</li>
              <li><strong>+15 puntos:</strong> Primera captación del mes</li>
              <li><strong>+50 puntos:</strong> Proyecto destacado por admin</li>
              <li><strong>+100 puntos:</strong> Proyecto viral (+10,000 vistas)</li>
            </ul>

            <h3>Penalizaciones (raras)</h3>
            <ul>
              <li><strong>-20 puntos:</strong> Proyecto rechazado por baja calidad</li>
              <li><strong>-50 puntos:</strong> Información falsa o engañosa</li>
              <li><strong>-100 puntos:</strong> Violación del código de conducta</li>
            </ul>

            <h3>Ejemplo de cálculo</h3>
            <div className="bg-gray-100 p-6 rounded-lg my-6">
              <p><strong>Caso: María capta "Café Artesanal"</strong></p>
              <ul className="list-none">
                <li>✅ Captación completa: +10 pts</li>
                <li>✅ Proyecto aprobado: +20 pts</li>
                <li>✅ Lanzado en 5 días: +30 pts</li>
                <li>✅ Tiene video de calidad: +25 pts</li>
                <li>✅ Alcanzó 30% en 3 días: +50 pts</li>
                <li>✅ Alcanzó meta completa: +100 pts</li>
                <li className="font-bold mt-2">= 235 puntos totales 🎉</li>
              </ul>
            </div>

            <h2 id="niveles">6. Niveles y progresión 📊</h2>

            <h3>Sistema de niveles</h3>
            <div className="space-y-4 my-6">
              <div className="border-l-4 border-gray-400 pl-4">
                <p className="font-bold">🥉 Novato (0-99 pts)</p>
                <p>Estás aprendiendo. Límite: 2 captaciones simultáneas</p>
              </div>

              <div className="border-l-4 border-blue-400 pl-4">
                <p className="font-bold">🥈 Intermedio (100-499 pts)</p>
                <p>Ya entiendes el proceso. Límite: 5 captaciones simultáneas</p>
              </div>

              <div className="border-l-4 border-purple-400 pl-4">
                <p className="font-bold">💎 Pro (500-1,999 pts)</p>
                <p>Eres experto en detectar talento. Límite: 10 captaciones</p>
              </div>

              <div className="border-l-4 border-yellow-400 pl-4">
                <p className="font-bold">⭐ Elite (2,000-4,999 pts)</p>
                <p>Top 5% de Credcamers. Sin límite de captaciones</p>
              </div>

              <div className="border-l-4 border-orange-400 pl-4">
                <p className="font-bold">🏆 Leyenda (5,000+ pts)</p>
                <p>Hall of fame. Beneficios premium y acceso VIP</p>
              </div>
            </div>

            <h3>Beneficios por nivel</h3>
            <table className="w-full border-collapse my-6">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">Nivel</th>
                  <th className="border p-2">Badge</th>
                  <th className="border p-2">Prioridad</th>
                  <th className="border p-2">Bonos</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2">Novato</td>
                  <td className="border p-2">Gris</td>
                  <td className="border p-2">Normal</td>
                  <td className="border p-2">-</td>
                </tr>
                <tr>
                  <td className="border p-2">Intermedio</td>
                  <td className="border p-2">Azul</td>
                  <td className="border p-2">Normal</td>
                  <td className="border p-2">+5% pts</td>
                </tr>
                <tr>
                  <td className="border p-2">Pro</td>
                  <td className="border p-2">Púrpura</td>
                  <td className="border p-2">Alta</td>
                  <td className="border p-2">+10% pts</td>
                </tr>
                <tr>
                  <td className="border p-2">Elite</td>
                  <td className="border p-2">Dorado</td>
                  <td className="border p-2">Muy alta</td>
                  <td className="border p-2">+15% pts</td>
                </tr>
                <tr>
                  <td className="border p-2">Leyenda</td>
                  <td className="border p-2">Arcoíris</td>
                  <td className="border p-2">Máxima</td>
                  <td className="border p-2">+25% pts</td>
                </tr>
              </tbody>
            </table>

            <h2 id="leaderboard">7. Leaderboard y competencia 🏅</h2>

            <h3>Rankings disponibles</h3>
            <ul>
              <li><strong>Top Mensual:</strong> Resetea cada mes, premio de €500</li>
              <li><strong>Top Trimestral:</strong> Resetea cada 3 meses, premio de €1,500</li>
              <li><strong>Top Anual:</strong> Hall of fame, premio de €5,000</li>
              <li><strong>Top Histórico:</strong> Todos los tiempos</li>
            </ul>

            <h3>Premios mensuales (2025)</h3>
            <ul>
              <li>🥇 <strong>1er lugar:</strong> €500 + Badge exclusivo</li>
              <li>🥈 <strong>2do lugar:</strong> €250 + Certificado</li>
              <li>🥉 <strong>3er lugar:</strong> €100 + Reconocimiento</li>
              <li>🎖️ <strong>Top 10:</strong> Badge especial + Feature en home</li>
            </ul>

            <h3>Estadísticas públicas</h3>
            <p>En tu perfil de Credcamer se muestra:</p>
            <ul>
              <li>Total de proyectos captados</li>
              <li>Tasa de aprobación (%)</li>
              <li>Tasa de éxito de proyectos (%)</li>
              <li>Total de puntos ganados</li>
              <li>Posición en ranking actual</li>
              <li>Nivel y progreso al siguiente</li>
            </ul>

            <h2 id="estrategias">8. Estrategias para ser top Credcamer 🎯</h2>

            <h3>Calidad {'>'}  Cantidad</h3>
            <ul>
              <li>✅ 1 proyecto excelente = 200+ puntos</li>
              <li>❌ 5 proyectos mediocres = 50 puntos (y mala reputación)</li>
            </ul>

            <h3>Dónde buscar proyectos</h3>
            <ul>
              <li>🎓 Incubadoras y aceleradoras universitarias</li>
              <li>💼 Eventos de networking y pitch nights</li>
              <li>💻 Comunidades online (Reddit, Discord de emprendedores)</li>
              <li>🎨 Espacios de coworking y colectivos creativos</li>
              <li>🎤 Podcasts y contenido de emprendedores</li>
            </ul>

            <h3>Perfil ideal de proyecto</h3>
            <ul>
              <li>Creador preparado y comprometido</li>
              <li>Problema claro y solución viable</li>
              <li>Materiales visuales de calidad</li>
              <li>Red de apoyo inicial (familia, amigos, comunidad)</li>
              <li>Plan de marketing definido</li>
            </ul>

            <h3>Red flags a evitar</h3>
            <ul>
              <li>🚩 Creador no responde emails por días</li>
              <li>🚩 Proyecto sin materiales visuales ni plan</li>
              <li>🚩 Meta de financiamiento irreal (€500K para una idea)</li>
              <li>🚩 Explicación confusa del proyecto</li>
              <li>🚩 No tienen red de apoyo (0 seguidores, 0 contactos)</li>
            </ul>

            <h2 id="beneficios">9. Beneficios actuales y futuros 🎁</h2>

            <h3>Beneficios actuales (2025)</h3>
            <ul>
              <li>💰 Premios mensuales en efectivo</li>
              <li>🎖️ Badges y reconocimiento público</li>
              <li>📈 Estadísticas y dashboard personalizado</li>
              <li>🤝 Networking con emprendedores top</li>
              <li>📚 Acceso a recursos premium</li>
              <li>🎯 Prioridad en revisiones</li>
            </ul>

            <h3>Próximamente (roadmap 2025-2026)</h3>
            <ul>
              <li>💳 <strong>Q4 2025:</strong> Comisiones en efectivo por proyectos exitosos</li>
              <li>🎟️ <strong>Q1 2026:</strong> Acceso VIP a eventos exclusivos</li>
              <li>🏢 <strong>Q2 2026:</strong> Partnership con incubadoras</li>
              <li>🌍 <strong>Q3 2026:</strong> Programa internacional de Credcamers</li>
              <li>💼 <strong>Q4 2026:</strong> Oportunidades laborales en startups captadas</li>
            </ul>

            <h2 id="faq">10. FAQ de Credcamers ❓</h2>

            <h3>¿Puedo captar mi propio proyecto?</h3>
            <p>
              No. Si eres el creador, debes crear tu proyecto normal. El rol de Credcamer es 
              ayudar a <strong>otros</strong> emprendedores.
            </p>

            <h3>¿Cuánto tiempo toma una captación?</h3>
            <p>
              Con proyecto preparado: 30-45 min. Si falta trabajo: 2-4 horas en múltiples sesiones.
            </p>

            <h3>¿Puedo perder mis puntos?</h3>
            <p>
              No. Los puntos ganados son permanentes. Solo hay penalizaciones por mal comportamiento 
              (muy raras).
            </p>

            <h3>¿Hay límite de captaciones?</h3>
            <p>
              Sí, depende de tu nivel. Novato: 2 simultáneas. Elite: sin límite.
            </p>

            <h3>¿Qué pasa si el proyecto falla?</h3>
            <p>
              No pierdes puntos ya ganados. Solo no ganas los bonos de éxito. Es parte del proceso.
            </p>

            <h3>¿Puedo ser Credcamer y tener mi proyecto?</h3>
            <p>
              ¡Sí! Son roles independientes. Pero no puedes captarte a ti mismo.
            </p>

            <div className="bg-purple-50 border-l-4 border-purple-500 p-4 my-6">
              <p className="font-semibold text-purple-800 mb-2">🚀 ¡Empieza ahora!</p>
              <p className="text-purple-800">
                Los mejores Credcamers no nacieron sabiendo. Empezaron con 1 proyecto, aprendieron, mejoraron. 
                ¡Tu primer proyecto captado puede ser el siguiente unicornio! 🦄
              </p>
            </div>

            <hr className="my-8" />

            <h2>¿Listo para ser Credcamer? 🎯</h2>
            <div className="flex gap-4 mt-6">
              <Link
                href="/dashboard"
                className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg font-semibold hover:shadow-lg transition"
              >
                Activar rol Credcamer
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
