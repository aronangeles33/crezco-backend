'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const categories = [
    { id: 'all', name: 'Todo', icon: '📚' },
    { id: 'getting-started', name: 'Empezar', icon: '🚀' },
    { id: 'projects', name: 'Proyectos', icon: '💼' },
    { id: 'payments', name: 'Pagos', icon: '💳' },
    { id: 'credcamer', name: 'Credcamer', icon: '📈' },
    { id: 'account', name: 'Cuenta', icon: '👤' },
  ]

  const faqs = [
    {
      category: 'getting-started',
      question: '¿Qué es esta plataforma?',
      answer: 'Somos una plataforma de crowdfunding que conecta creadores con apoyadores para financiar proyectos innovadores. Puedes crear tu proyecto, recibir apoyo económico y hacer realidad tus ideas.'
    },
    {
      category: 'getting-started',
      question: '¿Cómo empiezo a usar la plataforma?',
      answer: 'Solo necesitas crear una cuenta gratuita. Luego puedes explorar proyectos para apoyar, o crear tu propio proyecto siguiendo nuestro wizard guiado de 6 pasos.'
    },
    {
      category: 'projects',
      question: '¿Cómo creo un proyecto?',
      answer: 'Ve a "Crear Proyecto" y sigue los 6 pasos: 1) Identidad del proyecto, 2) Historia y pitch, 3) Multimedia (fotos/videos), 4) Redes sociales, 5) Recompensas, 6) Revisión. Tu proyecto será revisado por nuestro equipo antes de publicarse.'
    },
    {
      category: 'projects',
      question: '¿Cuánto tiempo tarda la revisión de un proyecto?',
      answer: 'Normalmente revisamos proyectos en 24-48 horas hábiles. Recibirás una notificación cuando tu proyecto sea aprobado o si necesitamos ajustes.'
    },
    {
      category: 'projects',
      question: '¿Qué tipo de proyectos puedo crear?',
      answer: 'Aceptamos proyectos en categorías: Startup, Arte, Podcast, Tienda y Otros. Deben ser legales, éticos y tener un objetivo claro de financiamiento.'
    },
    {
      category: 'payments',
      question: '¿Cómo funcionan los pagos?',
      answer: 'Los apoyadores pueden contribuir con tarjeta de crédito, débito o transferencia. Los fondos se liberan al creador cuando el proyecto alcanza su meta o finaliza el plazo (según el modelo elegido).'
    },
    {
      category: 'payments',
      question: '¿Cuáles son las comisiones?',
      answer: 'Cobramos una comisión del 5% sobre los fondos recaudados exitosamente, más las comisiones de procesamiento de pago (2-3%). Solo pagas si tu proyecto tiene éxito.'
    },
    {
      category: 'payments',
      question: '¿Cuándo recibo el dinero de mi proyecto?',
      answer: 'Los fondos se transfieren a tu cuenta bancaria 7-14 días después de que tu proyecto alcance su meta o finalice exitosamente.'
    },
    {
      category: 'credcamer',
      question: '¿Qué es el sistema Credcamer?',
      answer: 'Credcamer es un programa donde usuarios de la comunidad pueden captar proyectos de terceros y ganar puntos. Es ideal si conoces emprendedores que necesitan financiamiento pero no están en la plataforma.'
    },
    {
      category: 'credcamer',
      question: '¿Cómo me convierto en Credcamer?',
      answer: 'Un administrador debe promoverte a Credcamer. Una vez promovido, accedes a un dashboard especial donde puedes captar negocios locales, ver recomendaciones y competir en el leaderboard.'
    },
    {
      category: 'credcamer',
      question: '¿Cómo funcionan los puntos Credcamer?',
      answer: 'Ganas puntos cuando tus proyectos captados son aprobados. Los puntos se calculan según: monto del proyecto, calidad del contenido (fotos, historia) y progreso. Puedes subir de nivel: Novato → Pro → Elite → Leyenda.'
    },
    {
      category: 'credcamer',
      question: '¿Qué beneficios tiene ser Credcamer?',
      answer: 'Acceso a dashboard exclusivo, recomendaciones de negocios locales, sistema de puntos y niveles, reconocimiento en el leaderboard, y en el futuro tendremos recompensas monetarias.'
    },
    {
      category: 'account',
      question: '¿Cómo cambio mi contraseña?',
      answer: 'Ve a tu perfil de usuario, haz clic en "Configuración" y selecciona "Cambiar contraseña". Recibirás un email de confirmación.'
    },
    {
      category: 'account',
      question: '¿Puedo eliminar mi cuenta?',
      answer: 'Sí, puedes solicitar la eliminación de tu cuenta desde Configuración → Privacidad. Los proyectos activos deben completarse o cancelarse primero.'
    },
    {
      category: 'account',
      question: '¿Cómo contacto con soporte?',
      answer: 'Puedes enviarnos un email a soporte@impulso-crezco.com o usar el formulario de contacto al final de esta página. Respondemos en 24-48 horas.'
    },
  ]

  const guides = [
    {
      title: 'Guía Completa para Crear tu Primer Proyecto',
      description: 'Paso a paso para configurar, escribir y lanzar tu proyecto exitosamente',
      icon: '📝',
      time: '10 min',
      link: '/help/guides/create-project'
    },
    {
      title: 'Cómo Promocionar tu Proyecto',
      description: 'Estrategias de marketing para alcanzar tu meta de financiamiento',
      icon: '📢',
      time: '8 min',
      link: '/help/guides/promote-project'
    },
    {
      title: 'Manual del Credcamer',
      description: 'Todo lo que necesitas saber sobre el sistema de captación',
      icon: '📈',
      time: '15 min',
      link: '/help/guides/credcamer-manual'
    },
    {
      title: 'Mejores Prácticas de Storytelling',
      description: 'Cómo contar la historia de tu proyecto de forma convincente',
      icon: '✨',
      time: '12 min',
      link: '/help/guides/storytelling'
    },
  ]

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              ¿En qué podemos ayudarte?
            </h1>
            <p className="text-xl text-purple-100 mb-8">
              Encuentra respuestas rápidas o explora nuestras guías detalladas
            </p>
            
            {/* Search Bar */}
            <div className="relative">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="search"
                placeholder="Buscar en ayuda... ej: ¿Cómo creo un proyecto?"
                className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-4 focus:ring-purple-300 focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.id)
                  setSearchQuery('')
                }}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* FAQs */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Preguntas Frecuentes
              </h2>
              <p className="text-gray-600">
                {filteredFaqs.length} preguntas {activeCategory !== 'all' && `en ${categories.find(c => c.id === activeCategory)?.name}`}
              </p>
            </div>

            <div className="space-y-4">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition"
                    >
                      <span className="font-semibold text-gray-900 pr-4">
                        {faq.question}
                      </span>
                      <svg
                        className={`w-5 h-5 text-purple-600 flex-shrink-0 transition-transform ${
                          openFaq === index ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {openFaq === index && (
                      <div className="px-6 pb-4 text-gray-600 leading-relaxed">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <p className="text-gray-600 text-lg">
                    No se encontraron preguntas con "{searchQuery}"
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('')
                      setActiveCategory('all')
                    }}
                    className="mt-4 text-purple-600 font-semibold hover:underline"
                  >
                    Ver todas las preguntas
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Guides */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-900">📚 Guías Detalladas</h3>
              <div className="space-y-4">
                {guides.map((guide, index) => (
                  <Link
                    key={index}
                    href={guide.link}
                    className="block p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg hover:shadow-md transition group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-3xl">{guide.icon}</div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1 group-hover:text-purple-600 transition">
                          {guide.title}
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">{guide.description}</p>
                        <span className="text-xs text-purple-600 font-medium">
                          ⏱️ {guide.time} lectura
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact Support */}
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4">💬 ¿Necesitas más ayuda?</h3>
              <p className="mb-4 text-purple-100">
                Nuestro equipo está aquí para ayudarte. Responderemos en 24-48 horas.
              </p>
              <a
                href="mailto:soporte@impulso-crezco.com"
                className="block w-full px-4 py-3 bg-white text-purple-600 rounded-lg font-semibold text-center hover:bg-gray-100 transition"
              >
                Contactar Soporte
              </a>
              <div className="mt-4 pt-4 border-t border-purple-400">
                <p className="text-sm text-purple-100">
                  📧 soporte@impulso-crezco.com<br />
                  📞 +34 900 123 456<br />
                  🕐 Lun-Vie, 9:00 - 18:00 CET
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-900">⚡ Acciones Rápidas</h3>
              <div className="space-y-3">
                <Link
                  href="/create"
                  className="block px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition text-center font-medium text-gray-900"
                >
                  📝 Crear Proyecto
                </Link>
                <Link
                  href="/projects"
                  className="block px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition text-center font-medium text-gray-900"
                >
                  🔍 Explorar Proyectos
                </Link>
                <Link
                  href="/dashboard"
                  className="block px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition text-center font-medium text-gray-900"
                >
                  👤 Mi Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
