'use client'

import Link from 'next/link'
import { Header } from '../../../../components/Header'
import { Footer } from '../../../../components/Footer'

export default function GuideStorytellingPage() {
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
          <div className="bg-gradient-to-br from-pink-600 to-purple-700 text-white rounded-2xl p-8 md:p-12 mb-8">
            <div className="text-5xl mb-4">📖</div>
            <h1 className="text-4xl font-bold mb-4">
              Storytelling para Crowdfunding
            </h1>
            <p className="text-xl text-pink-100 mb-4">
              Aprende a contar historias que conecten emocionalmente y conviertan
            </p>
            <div className="flex items-center gap-4 text-pink-100">
              <span>⏱️ 10 min lectura</span>
              <span>•</span>
              <span>📅 Actualizado: Octubre 2025</span>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-xl shadow-sm border p-8 md:p-12 prose prose-lg max-w-none">
            <h2>📋 Tabla de Contenidos</h2>
            <ul>
              <li><a href="#por-que">1. Por qué el storytelling importa</a></li>
              <li><a href="#elementos">2. Los 5 elementos de una gran historia</a></li>
              <li><a href="#estructura">3. Estructura narrativa para crowdfunding</a></li>
              <li><a href="#conexion">4. Crear conexión emocional</a></li>
              <li><a href="#visual">5. Storytelling visual</a></li>
              <li><a href="#video">6. El video pitch perfecto</a></li>
              <li><a href="#ejemplos">7. Ejemplos de historias exitosas</a></li>
              <li><a href="#errores">8. Errores comunes a evitar</a></li>
              <li><a href="#templates">9. Templates y frameworks</a></li>
            </ul>

            <hr />

            <div className="bg-pink-50 border-l-4 border-pink-500 p-4 my-6">
              <p className="font-semibold text-pink-800 mb-2">💡 Dato clave:</p>
              <p className="text-pink-800">
                Los proyectos con storytelling emocional tienen <strong>63% más probabilidades</strong> de 
                alcanzar su meta. La gente apoya historias, no ideas.
              </p>
            </div>

            <h2 id="por-que">1. Por qué el storytelling importa 📚</h2>
            
            <h3>La ciencia detrás de las historias</h3>
            <p>
              Cuando escuchamos una historia, nuestro cerebro libera <strong>oxitocina</strong> (la hormona 
              de la empatía) y activa múltiples áreas cerebrales. No solo procesamos información, 
              <em>vivimos</em> la experiencia.
            </p>

            <h3>Estadísticas que lo prueban</h3>
            <ul>
              <li>📊 <strong>63%</strong> más conversión con storytelling vs. solo datos</li>
              <li>🧠 <strong>22x</strong> más memorable una historia que datos sueltos</li>
              <li>💰 <strong>€3,200</strong> promedio recaudado con historia vs. €1,800 sin ella</li>
              <li>⏱️ <strong>4.5 min</strong> promedio de tiempo en página con buena narrativa</li>
            </ul>

            <h3>Qué NO es storytelling</h3>
            <ul>
              <li>❌ No es solo "contar qué es tu producto"</li>
              <li>❌ No es listar características técnicas</li>
              <li>❌ No es copiar la historia de otra campaña</li>
              <li>❌ No es mentir o exagerar</li>
            </ul>

            <h2 id="elementos">2. Los 5 elementos de una gran historia 🎭</h2>

            <h3>1. Protagonista (El héroe)</h3>
            <p><strong>Quién es:</strong> Puedes ser tú (el creador) o tu usuario/cliente ideal.</p>
            <p><strong>Ejemplo:</strong></p>
            <ul>
              <li>✅ "Soy María, madre soltera que dejó su trabajo corporativo para..."</li>
              <li>✅ "Conoce a Juan, un estudiante que no puede pagar libros universitarios..."</li>
            </ul>

            <h3>2. Problema (El conflicto)</h3>
            <p><strong>Qué duele:</strong> El obstáculo, frustración o necesidad no resuelta.</p>
            <p><strong>Ejemplo:</strong></p>
            <ul>
              <li>✅ "Cada año se desperdician 2 toneladas de café en nuestra ciudad"</li>
              <li>✅ "Los músicos independientes pierden el 80% de sus ingresos en comisiones"</li>
            </ul>

            <h3>3. Solución (La transformación)</h3>
            <p><strong>Cómo cambias las cosas:</strong> Tu proyecto como el puente entre problema y futuro.</p>
            <p><strong>Ejemplo:</strong></p>
            <ul>
              <li>✅ "Creamos jabones artesanales con ese café, generando 0 residuos"</li>
              <li>✅ "Una plataforma donde el 95% de las donaciones van directo al artista"</li>
            </ul>

            <h3>4. Impacto (El resultado)</h3>
            <p><strong>Qué cambia:</strong> El mundo después de tu solución.</p>
            <p><strong>Ejemplo:</strong></p>
            <ul>
              <li>✅ "100 familias con ingresos extra vendiendo nuestros productos"</li>
              <li>✅ "1,000 músicos ganando 3x más que antes"</li>
            </ul>

            <h3>5. Llamado a la acción (La invitación)</h3>
            <p><strong>Qué pides:</strong> Cómo el lector se convierte en parte de la historia.</p>
            <p><strong>Ejemplo:</strong></p>
            <ul>
              <li>✅ "Con €25 produces 10 jabones y generas 1 hora de empleo"</li>
              <li>✅ "Tu apoyo de €10 permite que 1 artista cobre sin comisiones por 1 mes"</li>
            </ul>

            <h2 id="estructura">3. Estructura narrativa para crowdfunding 📝</h2>

            <h3>El framework de 3 actos</h3>

            <div className="bg-gray-100 p-6 rounded-lg my-6">
              <p><strong>ACTO 1: EL MUNDO ANTES (15%)</strong></p>
              <ul className="list-disc ml-6 mt-2">
                <li>Presentas el contexto</li>
                <li>Introduces al protagonista</li>
                <li>Muestras el problema</li>
              </ul>

              <p className="mt-4"><strong>ACTO 2: EL VIAJE (70%)</strong></p>
              <ul className="list-disc ml-6 mt-2">
                <li>Explicas tu solución</li>
                <li>Cómo llegaste a ella</li>
                <li>Obstáculos superados</li>
                <li>Plan de ejecución</li>
                <li>Uso de fondos</li>
              </ul>

              <p className="mt-4"><strong>ACTO 3: EL MUNDO DESPUÉS (15%)</strong></p>
              <ul className="list-disc ml-6 mt-2">
                <li>Visión del futuro</li>
                <li>Impacto esperado</li>
                <li>Llamado a la acción</li>
              </ul>
            </div>

            <h3>Ejemplo aplicado: "Café Sostenible"</h3>
            
            <p><strong>Acto 1 (100 palabras):</strong></p>
            <div className="bg-blue-50 p-4 rounded my-4 italic">
              "Trabajo en una cafetería desde hace 5 años. Cada noche tiramos a la basura 10kg de café 
              usado. Un día calculé: son 3.6 toneladas al año. Solo en mi cafetería. Pensé en las miles 
              de cafeterías de la ciudad... Me rompió el corazón ver tanto desperdicio cuando mi abuela 
              siempre me enseñó a no tirar nada."
            </div>

            <p><strong>Acto 2 (500 palabras):</strong></p>
            <div className="bg-blue-50 p-4 rounded my-4 italic">
              "Investigué durante 6 meses. Descubrí que el café usado tiene propiedades exfoliantes 
              increíbles. Experimenté en mi cocina: jabones, velas, fertilizante. Mi familia los probó. 
              Funcionaron. Pero no quería solo vender productos. Quería crear impacto real...
              <br/><br/>
              Con €15,000 vamos a: 1) Instalar contenedores en 20 cafeterías, 2) Contratar 3 personas 
              para recolección, 3) Montar taller pequeño, 4) Crear 50 kits para vender...
              <br/><br/>
              Los primeros 3 meses son críticos. Necesitamos el equipo, las materias primas, y pagar 
              los primeros sueldos. Después, el proyecto se sostiene con las ventas..."
            </div>

            <p><strong>Acto 3 (100 palabras):</strong></p>
            <div className="bg-blue-50 p-4 rounded my-4 italic">
              "Imagina una ciudad donde el 90% del café se reutiliza. Donde 100 familias tienen trabajo 
              digno. Donde cada jabón cuenta una historia de sostenibilidad. Eso es lo que construimos 
              juntos. Con €25 produces 10 jabones que generan 1 hora de empleo. Con €100, 1 día completo. 
              ¿Nos ayudas a hacer historia?"
            </div>

            <h2 id="conexion">4. Crear conexión emocional ❤️</h2>

            <h3>Las 4 emociones que convierten</h3>

            <p><strong>1. Esperanza (la más poderosa)</strong></p>
            <ul>
              <li>✅ "Juntos podemos cambiar..."</li>
              <li>✅ "Imagina un futuro donde..."</li>
              <li>✅ "Este es solo el comienzo de..."</li>
            </ul>

            <p><strong>2. Empatía (la que conecta)</strong></p>
            <ul>
              <li>✅ "Quizás tú también has sentido..."</li>
              <li>✅ "Todos conocemos a alguien que..."</li>
              <li>✅ "¿Te ha pasado que...?"</li>
            </ul>

            <p><strong>3. Urgencia (la que activa)</strong></p>
            <ul>
              <li>✅ "Cada día que pasa, se pierden..."</li>
              <li>✅ "Ahora tenemos una oportunidad única de..."</li>
              <li>✅ "Si no actuamos hoy..."</li>
            </ul>

            <p><strong>4. Orgullo (la que motiva)</strong></p>
            <ul>
              <li>✅ "Sé parte de los primeros 100 que..."</li>
              <li>✅ "Tu nombre estará en..."</li>
              <li>✅ "Imagina poder decir: yo ayudé a..."</li>
            </ul>

            <h3>Técnicas de escritura emocional</h3>

            <p><strong>Usa sensaciones físicas:</strong></p>
            <ul>
              <li>❌ "Estaba preocupado por el proyecto"</li>
              <li>✅ "Se me hacía un nudo en el estómago cada vez que veía los números"</li>
            </ul>

            <p><strong>Muestra, no digas:</strong></p>
            <ul>
              <li>❌ "Muchos niños no tienen libros"</li>
              <li>✅ "Vi a Sofía, 7 años, leer el mismo libro por quinta vez porque era el único que tenía"</li>
            </ul>

            <p><strong>Usa detalles específicos:</strong></p>
            <ul>
              <li>❌ "Desperdicié mucho dinero en mi startup anterior"</li>
              <li>✅ "Gasté €23,000 en un logo que nadie recuerda y 0 euros en hablar con clientes"</li>
            </ul>

            <h2 id="visual">5. Storytelling visual 📸</h2>

            <h3>El poder de las imágenes</h3>
            <p>Una imagen vale más que 1,000 palabras, pero la imagen CORRECTA vale más que 10,000.</p>

            <h3>Tipos de fotos que cuentan historias</h3>

            <p><strong>1. El Antes/Después</strong></p>
            <ul>
              <li>Problema → Solución</li>
              <li>Prototipo feo → Producto final</li>
              <li>Primer día → Hoy</li>
            </ul>

            <p><strong>2. Behind-the-scenes (Entre bastidores)</strong></p>
            <ul>
              <li>Tú trabajando en tu garaje/cocina</li>
              <li>Primeras pruebas (aunque salieran mal)</li>
              <li>El equipo en acción</li>
            </ul>

            <p><strong>3. Personas reales usando tu producto</strong></p>
            <ul>
              <li>No modelos, usuarios reales</li>
              <li>Expresiones genuinas</li>
              <li>Contexto natural</li>
            </ul>

            <p><strong>4. El rostro del creador</strong></p>
            <ul>
              <li>Foto de perfil mirando a cámara</li>
              <li>Sonrisa genuina</li>
              <li>En tu espacio de trabajo</li>
            </ul>

            <h3>Errores visuales fatales</h3>
            <ul>
              <li>❌ Fotos de stock genéricas</li>
              <li>❌ Solo renders 3D (sin producto real)</li>
              <li>❌ Baja calidad o pixeladas</li>
              <li>❌ Sin personas (solo objetos)</li>
              <li>❌ Demasiado texto en la imagen</li>
            </ul>

            <h2 id="video">6. El video pitch perfecto 🎬</h2>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6">
              <p className="font-semibold text-yellow-800 mb-2">🎥 Estadística clave:</p>
              <p className="text-yellow-800">
                Proyectos con video recaudan en promedio <strong>105% más</strong> que proyectos sin video. 
                No necesitas producción de Hollywood, necesitas autenticidad.
              </p>
            </div>

            <h3>Estructura del video (1-3 minutos)</h3>

            <p><strong>Primeros 5 segundos (CRÍTICOS):</strong></p>
            <ul>
              <li>Hook emocional o pregunta impactante</li>
              <li>Ejemplo: "¿Sabías que tiramos 10 toneladas de café al día en esta ciudad?"</li>
            </ul>

            <p><strong>Segundos 5-20:</strong></p>
            <ul>
              <li>Preséntate (nombre + credibilidad)</li>
              <li>"Soy Ana, barista desde hace 10 años"</li>
            </ul>

            <p><strong>Segundos 20-60:</strong></p>
            <ul>
              <li>Explica el problema (con imágenes)</li>
              <li>Muestra tu solución (producto en acción)</li>
            </ul>

            <p><strong>Segundos 60-120:</strong></p>
            <ul>
              <li>Cómo usarás los fondos</li>
              <li>Impacto esperado (números específicos)</li>
            </ul>

            <p><strong>Últimos 10 segundos:</strong></p>
            <ul>
              <li>Llamado a la acción directo</li>
              <li>"Apóyanos hoy con €25 y crea 10 jabones sostenibles"</li>
            </ul>

            <h3>Tips técnicos (producción simple)</h3>
            <ul>
              <li>📱 <strong>Cámara:</strong> Smartphone moderno es suficiente</li>
              <li>🎤 <strong>Audio:</strong> Lo MÁS importante. Usa micrófono externo (€20)</li>
              <li>💡 <strong>Luz:</strong> Natural (cerca de ventana) o ring light (€30)</li>
              <li>🎬 <strong>Edición:</strong> iMovie/CapCut (gratis y fácil)</li>
              <li>🎵 <strong>Música:</strong> Suave de fondo (no distraer)</li>
            </ul>

            <h3>Qué mostrar en el video</h3>
            <ul>
              <li>✅ Tu cara (50% del tiempo)</li>
              <li>✅ Producto/servicio en uso (30%)</li>
              <li>✅ Behind-the-scenes (10%)</li>
              <li>✅ Beneficiarios/clientes (10%)</li>
            </ul>

            <h2 id="ejemplos">7. Ejemplos de historias exitosas 🏆</h2>

            <h3>Caso 1: "Mi Primer Podcast" (€18,500 recaudados)</h3>
            <div className="bg-green-50 p-4 rounded my-4">
              <p className="font-semibold mb-2">Hook inicial:</p>
              <p className="italic">
                "Perdí mi trabajo en marzo 2023. Tenía 34 años, dos hijos, y cero plan. En mi peor 
                momento, decidí hacer lo que siempre soñé: un podcast sobre crianza real..."
              </p>
              <p className="font-semibold mt-4 mb-2">Por qué funcionó:</p>
              <ul className="list-disc ml-6">
                <li>Vulnerabilidad auténtica (perdió trabajo)</li>
                <li>Transformación clara (peor momento → seguir sueño)</li>
                <li>Audiencia identificable (padres/madres)</li>
                <li>Meta alcanzable (€12,000 para equipo básico)</li>
              </ul>
            </div>

            <h3>Caso 2: "Biblioteca Móvil Rural" (€31,200 recaudados)</h3>
            <div className="bg-green-50 p-4 rounded my-4">
              <p className="font-semibold mb-2">Hook inicial:</p>
              <p className="italic">
                "En el pueblo donde crecí, el único libro que había era la Biblia de mi abuela. 
                A los 12 años, caminé 8km hasta la biblioteca más cercana. Hoy, quiero llevar 5,000 
                libros a 20 pueblos olvidados..."
              </p>
              <p className="font-semibold mt-4 mb-2">Por qué funcionó:</p>
              <ul className="list-disc ml-6">
                <li>Historia personal poderosa (caminó 8km por leer)</li>
                <li>Problema visual y concreto (pueblos sin libros)</li>
                <li>Solución escalable (biblioteca móvil)</li>
                <li>Impacto medible (5,000 libros, 20 pueblos)</li>
              </ul>
            </div>

            <h2 id="errores">8. Errores comunes a evitar ❌</h2>

            <h3>Error #1: Empezar con tu currículum</h3>
            <ul>
              <li>❌ "Soy ingeniero con MBA y 15 años de experiencia..."</li>
              <li>✅ "A los 7 años, mi padre cerró su negocio por falta de crédito. Ese día decidí..."</li>
            </ul>

            <h3>Error #2: Solo hablar de tu producto</h3>
            <ul>
              <li>❌ "Nuestra app tiene IA, ML, blockchain y..."</li>
              <li>✅ "María gasta 3 horas al día buscando recetas. Nuestra app le devuelve ese tiempo..."</li>
            </ul>

            <h3>Error #3: Historia muy larga</h3>
            <ul>
              <li>❌ 3,000 palabras de tu vida completa</li>
              <li>✅ 800-1,200 palabras enfocadas en: problema → solución → impacto</li>
            </ul>

            <h3>Error #4: Falta de especificidad</h3>
            <ul>
              <li>❌ "Ayudaremos a muchas personas"</li>
              <li>✅ "En 6 meses, 200 familias tendrán acceso a agua potable"</li>
            </ul>

            <h3>Error #5: No pedir ayuda</h3>
            <ul>
              <li>❌ Terminar sin llamado a la acción</li>
              <li>✅ "Necesito tu ayuda. Con €50, produces X. ¿Estás dentro?"</li>
            </ul>

            <h2 id="templates">9. Templates y frameworks 📋</h2>

            <h3>Template 1: "El Viaje del Héroe"</h3>
            <div className="bg-gray-100 p-6 rounded-lg my-6 text-sm">
              <p><strong>[Mundo ordinario]</strong> Describe tu situación inicial</p>
              <p><strong>[Llamado a la aventura]</strong> El momento que cambió todo</p>
              <p><strong>[Obstáculos]</strong> Qué te detuvo al principio</p>
              <p><strong>[Mentor/Aprendizaje]</strong> Qué te ayudó a avanzar</p>
              <p><strong>[Solución]</strong> Tu proyecto como resultado</p>
              <p><strong>[Visión]</strong> El mundo transformado</p>
              <p><strong>[Invitación]</strong> Únete a la aventura</p>
            </div>

            <h3>Template 2: "Problema-Agitación-Solución"</h3>
            <div className="bg-gray-100 p-6 rounded-lg my-6 text-sm">
              <p><strong>[Problema]</strong> Presenta el dolor (100 palabras)</p>
              <p><strong>[Agitación]</strong> Haz que duela más, muestra consecuencias (150 palabras)</p>
              <p><strong>[Solución]</strong> Tu proyecto como alivio (400 palabras)</p>
              <p><strong>[Prueba]</strong> Testimonios, datos, resultados (200 palabras)</p>
              <p><strong>[Llamado]</strong> Cómo apoyar (100 palabras)</p>
            </div>

            <h3>Template 3: "Antes-Después-Puente"</h3>
            <div className="bg-gray-100 p-6 rounded-lg my-6 text-sm">
              <p><strong>[Antes]</strong> Cómo era la vida antes de tu proyecto (200 palabras)</p>
              <p><strong>[Después]</strong> Cómo será con tu proyecto (200 palabras)</p>
              <p><strong>[Puente]</strong> Cómo llegas del antes al después (400 palabras)</p>
              <p><strong>[Invitación]</strong> Cruza el puente conmigo (150 palabras)</p>
            </div>

            <div className="bg-purple-50 border-l-4 border-purple-500 p-4 my-6">
              <p className="font-semibold text-purple-800 mb-2">✍️ Ejercicio final:</p>
              <p className="text-purple-800">
                Escribe tu historia en 100 palabras. Si no puedes explicar tu proyecto emocionalmente 
                en 100 palabras, no está listo. Practica hasta que fluya natural.
              </p>
            </div>

            <hr className="my-8" />

            <h2>📖 Checklist de storytelling</h2>
            <ul>
              <li>☐ Mi historia tiene protagonista claro</li>
              <li>☐ El problema es específico y visual</li>
              <li>☐ La solución transforma vidas (no solo vende)</li>
              <li>☐ Uso emociones (no solo lógica)</li>
              <li>☐ Tengo detalles específicos (nombres, números, fechas)</li>
              <li>☐ Mi video muestra mi cara y pasión</li>
              <li>☐ Las fotos son auténticas (no stock)</li>
              <li>☐ Termino con llamado a la acción claro</li>
            </ul>

            <h2>¿Listo para contar tu historia? 📖</h2>
            <div className="flex gap-4 mt-6">
              <Link
                href="/create"
                className="px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition"
              >
                Crear mi Proyecto
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
