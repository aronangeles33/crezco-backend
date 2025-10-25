'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const categories = [
    { id: 'all', name: 'Todas', icon: '📚' },
    { id: 'getting-started', name: 'Primeros Pasos', icon: '🚀' },
    { id: 'creating', name: 'Crear Proyecto', icon: '✨' },
    { id: 'supporting', name: 'Apoyar', icon: '💰' },
    { id: 'credcamer', name: 'Credcamer', icon: '🎯' },
    { id: 'payments', name: 'Pagos', icon: '💳' },
    { id: 'account', name: 'Cuenta', icon: '👤' },
    { id: 'technical', name: 'Técnico', icon: '🔧' }
  ]

  const faqs = [
    // PRIMEROS PASOS
    {
      category: 'getting-started',
      question: '¿Qué es Impulso Crezco?',
      answer: 'Impulso Crezco es una plataforma de crowdfunding (financiamiento colectivo) donde emprendedores, artistas y creadores pueden recaudar fondos para sus proyectos. Conectamos a personas con ideas innovadoras con una comunidad de apoyadores que creen en ellas.'
    },
    {
      category: 'getting-started',
      question: '¿Cómo funciona el crowdfunding?',
      answer: 'Es simple: 1) Un creador publica su proyecto con una meta de financiamiento, 2) La comunidad apoya el proyecto con diferentes cantidades, 3) Si se alcanza la meta en el tiempo establecido, el creador recibe los fondos para hacer realidad su proyecto. Si no se alcanza, los apoyadores recuperan su dinero.'
    },
    {
      category: 'getting-started',
      question: '¿Es gratis usar la plataforma?',
      answer: 'Registrarte y apoyar proyectos es completamente gratis. Para creadores, cobramos una comisión del 5% solo sobre los fondos recaudados exitosamente. Si tu proyecto no alcanza la meta, no pagas nada.'
    },
    {
      category: 'getting-started',
      question: '¿Necesito verificar mi identidad?',
      answer: 'Para apoyar proyectos solo necesitas un email. Para crear proyectos, necesitamos verificar tu identidad con documento de identidad para cumplir con regulaciones financieras y proteger a la comunidad.'
    },

    // CREAR PROYECTO
    {
      category: 'creating',
      question: '¿Qué tipo de proyectos puedo crear?',
      answer: 'Aceptamos proyectos en 5 categorías: Startups/Negocios, Arte y Cultura, Podcasts/Contenido, Tiendas/Productos, y Otros. Pueden ser proyectos creativos, emprendimientos, causas sociales, productos innovadores, eventos, o cualquier idea que necesite financiamiento.'
    },
    {
      category: 'creating',
      question: '¿Cuánto dinero puedo pedir?',
      answer: 'La meta mínima es €1,000 y no hay máximo. Sin embargo, recomendamos ser realista: proyectos con metas entre €5,000-€25,000 tienen 73% más probabilidad de éxito. Calcula exactamente lo que necesitas y añade un 10-15% para imprevistos.'
    },
    {
      category: 'creating',
      question: '¿Cuánto tiempo dura una campaña?',
      answer: 'Puedes elegir entre 15 y 60 días. La duración ideal depende de tu proyecto: campañas de 30 días tienen la mayor tasa de éxito (68%). Muy cortas (15 días) son difíciles de promocionar, muy largas (60 días) pierden urgencia.'
    },
    {
      category: 'creating',
      question: '¿Necesito tener el proyecto terminado antes de lanzar?',
      answer: 'No necesariamente. Puedes recaudar fondos para proyectos en etapa de idea, prototipo o producción. Lo importante es explicar claramente en qué etapa estás y cómo usarás los fondos. Proyectos con prototipos/demos tienen 2.5x más éxito.'
    },
    {
      category: 'creating',
      question: '¿Qué pasa si no alcanzo mi meta?',
      answer: 'Usamos el modelo "Todo o Nada": si no alcanzas el 100% de tu meta antes de la fecha límite, todos los apoyadores recuperan su dinero automáticamente y tú no recibes nada. Esto protege a todos: los apoyadores saben que su dinero solo se usará si el proyecto es viable.'
    },
    {
      category: 'creating',
      question: '¿Puedo editar mi proyecto después de publicarlo?',
      answer: 'Sí, pero con limitaciones. Puedes actualizar la descripción, añadir imágenes/videos, y publicar actualizaciones. NO puedes cambiar la meta de financiamiento ni la fecha límite una vez que alguien ya haya apoyado tu proyecto.'
    },
    {
      category: 'creating',
      question: '¿Cuánto tarda en aprobarse mi proyecto?',
      answer: 'Revisamos cada proyecto en 24-48 horas laborables. Si tu proyecto fue "captado" por un Credcamer, tiene prioridad y se revisa en menos de 24h. Te notificaremos por email si es aprobado o si necesitamos cambios.'
    },

    // APOYAR
    {
      category: 'supporting',
      question: '¿Cómo apoyo un proyecto?',
      answer: 'Es muy fácil: 1) Encuentra un proyecto que te guste, 2) Elige la cantidad que quieres aportar (mínimo €5), 3) Ingresa tus datos de pago, 4) Confirma tu apoyo. Recibirás un email de confirmación inmediatamente.'
    },
    {
      category: 'supporting',
      question: '¿Cuándo se cobra mi tarjeta?',
      answer: 'Tu tarjeta se cobra INMEDIATAMENTE cuando apoyas un proyecto. Sin embargo, si el proyecto no alcanza su meta, te reembolsamos el 100% del dinero automáticamente (tarda 5-7 días en reflejarse en tu cuenta).'
    },
    {
      category: 'supporting',
      question: '¿Puedo cancelar mi apoyo?',
      answer: 'Sí, puedes cancelar tu apoyo hasta 48 horas antes de que termine la campaña. Después de eso, si el proyecto alcanza su meta, tu apoyo es final. Si el proyecto no alcanza la meta, recuperas tu dinero de todas formas.'
    },
    {
      category: 'supporting',
      question: '¿Recibiré algo a cambio de mi apoyo?',
      answer: 'Depende del proyecto. Algunos creadores ofrecen recompensas (productos, menciones, acceso exclusivo) según la cantidad que apoyes. Otros son donaciones puras. Todo está especificado en la página del proyecto antes de apoyar.'
    },
    {
      category: 'supporting',
      question: '¿Puedo apoyar un proyecto desde fuera de España?',
      answer: 'Sí, aceptamos apoyos desde cualquier país. Los pagos se procesan en euros (€). Si tu tarjeta es de otra moneda, tu banco aplicará el tipo de cambio del día más una pequeña comisión por conversión.'
    },
    {
      category: 'supporting',
      question: '¿Es seguro dar mis datos de pago?',
      answer: 'Absolutamente. Usamos Stripe, uno de los procesadores de pago más seguros del mundo. Nosotros NUNCA vemos ni guardamos tus datos de tarjeta. Todo se encripta con certificación PCI-DSS nivel 1 (el más alto estándar de seguridad).'
    },

    // CREDCAMER
    {
      category: 'credcamer',
      question: '¿Qué es un Credcamer?',
      answer: 'Un Credcamer es un "cazatalentos de proyectos". Son usuarios que ayudan a emprendedores a preparar y lanzar sus proyectos en la plataforma. Reciben puntos por cada proyecto exitoso que captan. Es como ser un mentor + promotor.'
    },
    {
      category: 'credcamer',
      question: '¿Cómo me convierto en Credcamer?',
      answer: 'Requisitos: 1) Cuenta verificada, 2) Haber apoyado al menos 1 proyecto, 3) Completar el tutorial de Credcamer (5 min), 4) Aceptar el código de conducta. Luego vas a tu perfil → Configuración → "Convertirme en Credcamer".'
    },
    {
      category: 'credcamer',
      question: '¿Gano dinero como Credcamer?',
      answer: 'Actualmente ganas PUNTOS que se convierten en premios mensuales (€500 para el 1er lugar). En Q4 2025 lanzaremos comisiones en efectivo: recibirás entre 2-5% de los fondos recaudados por proyectos que captures exitosamente.'
    },
    {
      category: 'credcamer',
      question: '¿Puedo captar mi propio proyecto?',
      answer: 'No. El rol de Credcamer es ayudar a OTROS emprendedores. Si eres el creador, debes publicar tu proyecto normalmente. Esto evita conflictos de interés y mantiene la calidad del sistema.'
    },
    {
      category: 'credcamer',
      question: '¿Cuántos proyectos puedo captar a la vez?',
      answer: 'Depende de tu nivel: Novato (0-99pts) = 2 proyectos simultáneos, Intermedio (100-499pts) = 5, Pro (500-1999pts) = 10, Elite (2000-4999pts) = ilimitado, Leyenda (5000+pts) = ilimitado + beneficios VIP.'
    },

    // PAGOS
    {
      category: 'payments',
      question: '¿Qué métodos de pago aceptan?',
      answer: 'Aceptamos todas las tarjetas de crédito y débito (Visa, Mastercard, American Express), transferencias bancarias SEPA, y Google Pay/Apple Pay. Próximamente: PayPal y Bizum.'
    },
    {
      category: 'payments',
      question: '¿Cuándo recibo el dinero si mi proyecto tiene éxito?',
      answer: 'Una vez que tu campaña termina exitosamente, el dinero se transfiere a tu cuenta bancaria en 5-7 días laborables. Primero verificamos que no haya fraudes ni disputas, y luego procesamos el pago.'
    },
    {
      category: 'payments',
      question: '¿Qué comisiones cobran?',
      answer: 'Cobramos 5% sobre fondos recaudados exitosamente + 2.9% + €0.30 por transacción (comisión de Stripe). Ejemplo: si recaudas €10,000, recibes €9,180. Si no alcanzas tu meta, NO pagas nada.'
    },
    {
      category: 'payments',
      question: '¿Puedo recibir el dinero si vivo fuera de España?',
      answer: 'Sí, pero necesitas una cuenta bancaria SEPA (zona euro). Si vives en América Latina u otros continentes, estamos trabajando en opciones con Wise/PayPal para 2026.'
    },
    {
      category: 'payments',
      question: '¿Qué pasa si hay un reembolso o disputa?',
      answer: 'Si un apoyador solicita reembolso antes del fin de campaña (con razón válida), se procesa automáticamente. Si es después y el proyecto ya recibió fondos, el creador debe resolver directamente con el apoyador. Mediamos solo en casos extremos.'
    },
    {
      category: 'payments',
      question: '¿Emiten facturas?',
      answer: 'Sí. Los apoyadores reciben un recibo digital por email. Los creadores reciben una factura detallada con el desglose de comisiones cuando se transfieren los fondos. Todo cumple con normativas fiscales españolas.'
    },

    // CUENTA
    {
      category: 'account',
      question: '¿Cómo cambio mi contraseña?',
      answer: 'Ve a tu Perfil → Configuración → Seguridad → "Cambiar contraseña". Necesitarás tu contraseña actual. Si la olvidaste, usa "Olvidé mi contraseña" en la página de login.'
    },
    {
      category: 'account',
      question: '¿Puedo tener múltiples proyectos activos?',
      answer: 'Sí, puedes tener hasta 3 proyectos activos simultáneamente. Si quieres lanzar un 4to, debes esperar a que termine uno de los 3 activos. Esto asegura que puedas dar atención de calidad a cada proyecto.'
    },
    {
      category: 'account',
      question: '¿Cómo elimino mi cuenta?',
      answer: 'Ve a Configuración → Cuenta → "Eliminar cuenta". ADVERTENCIA: esto es permanente. Se borran todos tus datos, proyectos en borrador, y historial. Proyectos activos NO se pueden eliminar hasta que terminen.'
    },
    {
      category: 'account',
      question: '¿Puedo cambiar mi nombre de usuario?',
      answer: 'Puedes cambiar tu "nombre para mostrar" cuando quieras. Pero tu "nombre de usuario" (@usuario) solo se puede cambiar 1 vez cada 90 días. Esto evita confusión y mantiene la confianza de la comunidad.'
    },
    {
      category: 'account',
      question: '¿Recibo notificaciones por email?',
      answer: 'Sí, por defecto enviamos emails sobre: proyectos que apoyas, cuando alguien apoya tu proyecto, mensajes, actualizaciones importantes. Puedes personalizar qué notificaciones quieres en Configuración → Notificaciones.'
    },

    // TÉCNICO
    {
      category: 'technical',
      question: '¿La plataforma funciona en móvil?',
      answer: 'Sí, está 100% optimizada para móviles. Puedes hacer TODO desde tu smartphone: crear proyectos, apoyar, ver estadísticas, ser Credcamer. También tenemos apps nativas en desarrollo para iOS/Android (Q2 2026).'
    },
    {
      category: 'technical',
      question: '¿Qué navegadores son compatibles?',
      answer: 'Funciona en todos los navegadores modernos: Chrome, Firefox, Safari, Edge (versiones recientes). Para mejor experiencia, recomendamos Chrome o Firefox actualizados. Internet Explorer NO es compatible.'
    },
    {
      category: 'technical',
      question: '¿Tienen API para desarrolladores?',
      answer: 'Próximamente. Estamos desarrollando una API pública (Q1 2026) para que desarrolladores puedan integrar Impulso Crezco en sus apps, mostrar proyectos en sus sitios, o crear herramientas para creadores.'
    },
    {
      category: 'technical',
      question: 'Tengo un error en la página, ¿qué hago?',
      answer: 'Primero intenta: 1) Refrescar la página (Ctrl+F5), 2) Limpiar caché del navegador, 3) Probar en modo incógnito. Si persiste, contáctanos a soporte@impulsocrezco.com con captura de pantalla y descripción del error. Respondemos en menos de 24h.'
    },
    {
      category: 'technical',
      question: '¿Mis datos están protegidos?',
      answer: 'Absolutamente. Cumplimos con RGPD (Reglamento General de Protección de Datos de la UE). Tus datos están encriptados, nunca los vendemos a terceros, y puedes exportar o eliminar toda tu información cuando quieras. Lee nuestra Política de Privacidad completa en el footer.'
    },
    {
      category: 'technical',
      question: '¿Hacen backups de mi proyecto?',
      answer: 'Sí. Hacemos backups automáticos cada 6 horas. Si pierdes información accidentalmente, podemos restaurarla (últimas 30 días). Sin embargo, recomendamos guardar copias locales de tus textos e imágenes importantes.'
    }
  ]

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory
    const matchesSearch = !searchQuery || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Preguntas Frecuentes
            </h1>
            <p className="text-xl text-purple-100 mb-8">
              Todo lo que necesitas saber sobre Impulso Crezco
            </p>

            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar preguntas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 rounded-xl text-gray-800 text-lg focus:outline-none focus:ring-4 focus:ring-purple-300"
              />
              <span className="absolute right-6 top-1/2 -translate-y-1/2 text-2xl">
                🔍
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-white rounded-xl p-6 text-center shadow-sm border">
              <div className="text-3xl mb-2">📚</div>
              <div className="text-2xl font-bold text-purple-600">{faqs.length}</div>
              <div className="text-gray-600 text-sm">Preguntas</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm border">
              <div className="text-3xl mb-2">📂</div>
              <div className="text-2xl font-bold text-purple-600">{categories.length - 1}</div>
              <div className="text-gray-600 text-sm">Categorías</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm border">
              <div className="text-3xl mb-2">⚡</div>
              <div className="text-2xl font-bold text-purple-600">{'<'}24h</div>
              <div className="text-gray-600 text-sm">Respuesta</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm border">
              <div className="text-3xl mb-2">💬</div>
              <div className="text-2xl font-bold text-purple-600">24/7</div>
              <div className="text-gray-600 text-sm">Soporte</div>
            </div>
          </div>

          {/* Category Filters */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-3">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    activeCategory === category.id
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border'
                  }`}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <div className="mb-6 text-gray-600">
            Mostrando <strong>{filteredFaqs.length}</strong> {filteredFaqs.length === 1 ? 'pregunta' : 'preguntas'}
            {activeCategory !== 'all' && (
              <span> en <strong>{categories.find(c => c.id === activeCategory)?.name}</strong></span>
            )}
            {searchQuery && (
              <span> que coinciden con "<strong>{searchQuery}</strong>"</span>
            )}
          </div>

          {/* FAQs List */}
          <div className="space-y-4">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-sm border overflow-hidden"
                >
                  <button
                    className="w-full px-6 py-5 flex justify-between items-center hover:bg-gray-50 transition text-left"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-2xl mt-1">
                        {categories.find(c => c.id === faq.category)?.icon || '❓'}
                      </span>
                      <span className="font-semibold text-gray-800 text-lg">
                        {faq.question}
                      </span>
                    </div>
                    <svg
                      className={`w-6 h-6 text-gray-400 transition-transform flex-shrink-0 ml-4 ${
                        openFaq === index ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {openFaq === index && (
                    <div className="px-6 pb-6 pt-2 border-t bg-gray-50">
                      <div className="flex gap-4">
                        <div className="w-8 flex-shrink-0"></div>
                        <p className="text-gray-700 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  No encontramos preguntas que coincidan
                </h3>
                <p className="text-gray-600 mb-6">
                  Intenta con otros términos de búsqueda o categorías
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setActiveCategory('all')
                  }}
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                >
                  Ver todas las preguntas
                </button>
              </div>
            )}
          </div>

          {/* Contact Section */}
          <div className="mt-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-8 md:p-12 text-white">
            <div className="text-center max-w-2xl mx-auto">
              <div className="text-5xl mb-4">💬</div>
              <h2 className="text-3xl font-bold mb-4">
                ¿No encontraste tu respuesta?
              </h2>
              <p className="text-lg text-purple-100 mb-8">
                Nuestro equipo está aquí para ayudarte. Respondemos en menos de 24 horas.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/help"
                  className="px-8 py-4 bg-white text-purple-600 rounded-xl font-semibold hover:shadow-xl transition"
                >
                  Centro de Ayuda
                </Link>
                <a
                  href="mailto:soporte@impulsocrezco.com"
                  className="px-8 py-4 bg-purple-500 text-white rounded-xl font-semibold hover:bg-purple-400 transition border-2 border-white/30"
                >
                  Contactar Soporte
                </a>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div className="bg-white/10 rounded-xl p-4 backdrop-blur">
                  <div className="text-2xl mb-2">📧</div>
                  <div className="font-semibold mb-1">Email</div>
                  <div className="text-sm text-purple-100">
                    soporte@impulsocrezco.com
                  </div>
                </div>
                <div className="bg-white/10 rounded-xl p-4 backdrop-blur">
                  <div className="text-2xl mb-2">💬</div>
                  <div className="font-semibold mb-1">Chat en vivo</div>
                  <div className="text-sm text-purple-100">
                    Lun-Vie: 9h-18h
                  </div>
                </div>
                <div className="bg-white/10 rounded-xl p-4 backdrop-blur">
                  <div className="text-2xl mb-2">📚</div>
                  <div className="font-semibold mb-1">Guías</div>
                  <div className="text-sm text-purple-100">
                    4 guías detalladas
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-12 grid md:grid-cols-2 gap-6">
            <Link
              href="/help/guides/create-project"
              className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition group"
            >
              <div className="flex items-center gap-4">
                <div className="text-4xl">📝</div>
                <div>
                  <h3 className="font-semibold text-lg group-hover:text-purple-600 transition">
                    Guía: Crear tu Proyecto
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Paso a paso completo (10 min)
                  </p>
                </div>
              </div>
            </Link>

            <Link
              href="/help/guides/credcamer-manual"
              className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition group"
            >
              <div className="flex items-center gap-4">
                <div className="text-4xl">🎯</div>
                <div>
                  <h3 className="font-semibold text-lg group-hover:text-purple-600 transition">
                    Manual de Credcamer
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Conviértete en cazatalentos
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
