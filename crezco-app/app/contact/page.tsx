'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'general',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const categories = [
    { id: 'general', name: 'Consulta General', icon: '💬' },
    { id: 'support', name: 'Soporte Técnico', icon: '🔧' },
    { id: 'project', name: 'Ayuda con Proyecto', icon: '📝' },
    { id: 'credcamer', name: 'Credcamer', icon: '🎯' },
    { id: 'payment', name: 'Pagos y Facturación', icon: '💳' },
    { id: 'legal', name: 'Legal / Privacidad', icon: '⚖️' },
    { id: 'partnership', name: 'Alianzas / Partnership', icon: '🤝' },
    { id: 'press', name: 'Prensa / Medios', icon: '📰' }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Simular envío (en producción, conectar con API)
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      console.log('Formulario enviado:', formData)
      
      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        subject: '',
        category: 'general',
        message: ''
      })
    } catch (error) {
      console.error('Error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-600 to-pink-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-6xl mb-4">📧</div>
            <h1 className="text-5xl font-bold mb-6">
              Contacta con Nosotros
            </h1>
            <p className="text-xl text-purple-100 mb-4">
              ¿Tienes preguntas, sugerencias o necesitas ayuda? Estamos aquí para ti
            </p>
            <p className="text-purple-200">
              Respondemos en menos de 24 horas • Lun-Vie 9h-18h
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Left Column - Contact Info */}
            <div className="md:col-span-1 space-y-6">
              {/* Quick Contact Cards */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <span className="text-2xl">⚡</span>
                  Contacto Rápido
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <span>📧</span>
                      <span className="font-medium">Email General</span>
                    </div>
                    <a href="mailto:hola@impulsocrezco.com" className="text-purple-600 hover:underline">
                      hola@impulsocrezco.com
                    </a>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <span>🔧</span>
                      <span className="font-medium">Soporte Técnico</span>
                    </div>
                    <a href="mailto:soporte@impulsocrezco.com" className="text-purple-600 hover:underline">
                      soporte@impulsocrezco.com
                    </a>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <span>📞</span>
                      <span className="font-medium">Teléfono</span>
                    </div>
                    <a href="tel:+34912345678" className="text-purple-600 hover:underline">
                      +34 912 345 678
                    </a>
                    <p className="text-xs text-gray-500 mt-1">Lun-Vie: 9h-18h</p>
                  </div>
                </div>
              </div>

              {/* Office Info */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <span className="text-2xl">🏢</span>
                  Oficina
                </h3>
                <div className="text-sm text-gray-700 space-y-2">
                  <p><strong>Impulso Crezco S.L.</strong></p>
                  <p>Calle Innovación 123, Piso 4</p>
                  <p>28001 Madrid, España</p>
                  <p className="text-xs text-gray-500 mt-3">
                    Visitas solo con cita previa
                  </p>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <span className="text-2xl">🌐</span>
                  Redes Sociales
                </h3>
                <div className="space-y-3">
                  <a href="#" className="flex items-center gap-3 text-gray-700 hover:text-purple-600 transition">
                    <span className="text-xl">📘</span>
                    <span>Facebook</span>
                  </a>
                  <a href="#" className="flex items-center gap-3 text-gray-700 hover:text-purple-600 transition">
                    <span className="text-xl">📷</span>
                    <span>Instagram</span>
                  </a>
                  <a href="#" className="flex items-center gap-3 text-gray-700 hover:text-purple-600 transition">
                    <span className="text-xl">🐦</span>
                    <span>Twitter / X</span>
                  </a>
                  <a href="#" className="flex items-center gap-3 text-gray-700 hover:text-purple-600 transition">
                    <span className="text-xl">💼</span>
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>

              {/* FAQ Link */}
              <Link
                href="/faq"
                className="block bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-sm border-2 border-purple-200 p-6 hover:shadow-md transition"
              >
                <div className="text-3xl mb-2">❓</div>
                <h3 className="font-semibold mb-2">¿Preguntas Frecuentes?</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Encuentra respuestas instantáneas a las 40 preguntas más comunes
                </p>
                <span className="text-purple-600 font-medium text-sm">
                  Ver FAQ →
                </span>
              </Link>
            </div>

            {/* Right Column - Contact Form */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border p-8">
                <h2 className="text-2xl font-bold mb-2">Envíanos un Mensaje</h2>
                <p className="text-gray-600 mb-6">
                  Completa el formulario y te responderemos lo antes posible
                </p>

                {submitStatus === 'success' && (
                  <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">✅</span>
                      <div>
                        <p className="font-semibold text-green-800">¡Mensaje enviado!</p>
                        <p className="text-sm text-green-700">Te responderemos en menos de 24 horas.</p>
                      </div>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">❌</span>
                      <div>
                        <p className="font-semibold text-red-800">Error al enviar</p>
                        <p className="text-sm text-red-700">Por favor, intenta de nuevo o escríbenos directamente.</p>
                      </div>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre Completo <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Juan Pérez"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="tu@email.com"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Categoría <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>
                          {cat.icon} {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Asunto <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="¿En qué podemos ayudarte?"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mensaje <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                      placeholder="Describe tu consulta con el mayor detalle posible..."
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Mínimo 20 caracteres
                    </p>
                  </div>

                  {/* Privacy Notice */}
                  <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
                    <p className="flex items-start gap-2">
                      <span className="text-lg">🔒</span>
                      <span>
                        Al enviar este formulario, aceptas nuestra{' '}
                        <Link href="/privacy" className="text-purple-600 hover:underline">
                          Política de Privacidad
                        </Link>
                        . Tus datos serán usados únicamente para responder tu consulta.
                      </span>
                    </p>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 rounded-lg font-semibold text-white transition ${
                      isSubmitting
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg'
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Enviando...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <span>📨</span>
                        Enviar Mensaje
                      </span>
                    )}
                  </button>
                </form>
              </div>

              {/* Additional Help */}
              <div className="mt-6 grid sm:grid-cols-2 gap-4">
                <Link
                  href="/help"
                  className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition group"
                >
                  <div className="text-3xl mb-2">💡</div>
                  <h3 className="font-semibold mb-1 group-hover:text-purple-600 transition">
                    Centro de Ayuda
                  </h3>
                  <p className="text-sm text-gray-600">
                    Guías completas y tutoriales
                  </p>
                </Link>

                <Link
                  href="/help/guides/create-project"
                  className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition group"
                >
                  <div className="text-3xl mb-2">📝</div>
                  <h3 className="font-semibold mb-1 group-hover:text-purple-600 transition">
                    Crear Proyecto
                  </h3>
                  <p className="text-sm text-gray-600">
                    Guía paso a paso (10 min)
                  </p>
                </Link>
              </div>
            </div>
          </div>

          {/* Response Time Stats */}
          <div className="mt-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Nuestro Compromiso de Respuesta</h2>
              <p className="text-purple-100">
                Nos tomamos tu tiempo en serio. Estas son nuestras garantías:
              </p>
            </div>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-2">⚡</div>
                <div className="text-3xl font-bold mb-1">{'<'}24h</div>
                <div className="text-sm text-purple-100">Primera respuesta</div>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">✅</div>
                <div className="text-3xl font-bold mb-1">95%</div>
                <div className="text-sm text-purple-100">Problemas resueltos</div>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">⭐</div>
                <div className="text-3xl font-bold mb-1">4.8/5</div>
                <div className="text-sm text-purple-100">Satisfacción</div>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">💬</div>
                <div className="text-3xl font-bold mb-1">24/7</div>
                <div className="text-sm text-purple-100">FAQ disponible</div>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="mt-12 bg-white rounded-2xl shadow-sm border p-8">
            <h2 className="text-2xl font-bold text-center mb-8">Departamentos Especializados</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 rounded-xl bg-gray-50">
                <div className="text-4xl mb-3">🔧</div>
                <h3 className="font-semibold mb-2">Soporte Técnico</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Bugs, errores, problemas de acceso
                </p>
                <a href="mailto:soporte@impulsocrezco.com" className="text-purple-600 text-sm hover:underline">
                  soporte@impulsocrezco.com
                </a>
              </div>

              <div className="text-center p-6 rounded-xl bg-gray-50">
                <div className="text-4xl mb-3">⚖️</div>
                <h3 className="font-semibold mb-2">Legal y Privacidad</h3>
                <p className="text-sm text-gray-600 mb-3">
                  RGPD, términos, reclamaciones
                </p>
                <a href="mailto:legal@impulsocrezco.com" className="text-purple-600 text-sm hover:underline">
                  legal@impulsocrezco.com
                </a>
              </div>

              <div className="text-center p-6 rounded-xl bg-gray-50">
                <div className="text-4xl mb-3">📰</div>
                <h3 className="font-semibold mb-2">Prensa y Medios</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Entrevistas, partnership, alianzas
                </p>
                <a href="mailto:prensa@impulsocrezco.com" className="text-purple-600 text-sm hover:underline">
                  prensa@impulsocrezco.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
