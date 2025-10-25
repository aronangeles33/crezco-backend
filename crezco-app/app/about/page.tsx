'use client'

import Link from 'next/link'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'

export default function AboutPage() {
  const stats = [
    { number: '10,000+', label: 'Proyectos Financiados', icon: '🚀' },
    { number: '€50M+', label: 'Dinero Recaudado', icon: '💰' },
    { number: '100,000+', label: 'Apoyadores', icon: '👥' },
    { number: '95%', label: 'Tasa de Éxito', icon: '⭐' },
  ]

  const team = [
    {
      name: 'María González',
      role: 'CEO & Fundadora',
      image: 'https://i.pravatar.cc/300?img=1',
      bio: 'Emprendedora apasionada por el impacto social y la innovación.'
    },
    {
      name: 'Carlos Ramírez',
      role: 'CTO',
      image: 'https://i.pravatar.cc/300?img=3',
      bio: 'Ingeniero con 15 años de experiencia en plataformas fintech.'
    },
    {
      name: 'Ana Martínez',
      role: 'Head of Community',
      image: 'https://i.pravatar.cc/300?img=5',
      bio: 'Construyendo comunidades que impulsan el cambio positivo.'
    },
    {
      name: 'Diego Torres',
      role: 'Head of Design',
      image: 'https://i.pravatar.cc/300?img=7',
      bio: 'Diseñador UX/UI enfocado en experiencias memorables.'
    },
  ]

  const values = [
    {
      icon: '🎯',
      title: 'Transparencia',
      description: 'Cada euro cuenta. Mostramos exactamente dónde va tu dinero y cómo se utiliza.'
    },
    {
      icon: '🤝',
      title: 'Comunidad',
      description: 'Creemos en el poder de las personas trabajando juntas para hacer realidad grandes ideas.'
    },
    {
      icon: '💡',
      title: 'Innovación',
      description: 'Buscamos proyectos que rompan moldes y traigan soluciones creativas a problemas reales.'
    },
    {
      icon: '🌱',
      title: 'Impacto',
      description: 'Priorizamos iniciativas que generen cambios positivos en comunidades y el medio ambiente.'
    },
  ]

  const milestones = [
    { year: '2020', event: 'Fundación de la plataforma', description: 'Inicio de la aventura con 100 proyectos' },
    { year: '2021', event: 'Primera ronda de financiación', description: '€1M recaudado para escalar' },
    { year: '2022', event: 'Expansión internacional', description: 'Llegamos a 10 países de Latinoamérica' },
    { year: '2023', event: 'Sistema Credcamer', description: 'Lanzamos programa de captación comunitaria' },
    { year: '2024', event: '10,000 proyectos', description: 'Alcanzamos hito de proyectos exitosos' },
    { year: '2025', event: 'Presente', description: 'Continuamos creciendo y transformando vidas' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 text-white">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Transformamos Ideas en Realidad
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100">
              Somos la plataforma de crowdfunding que conecta creadores con apoyadores
              para financiar proyectos que cambian el mundo.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/projects"
                className="px-8 py-4 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Ver Proyectos
              </Link>
              <Link
                href="/create"
                className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition"
              >
                Crear Proyecto
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Nuestra Misión</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-pink-500 mx-auto mb-8"></div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                Democratizamos el acceso al financiamiento para que cualquier persona con una buena idea 
                pueda hacerla realidad. Creemos que el talento está distribuido equitativamente, pero las 
                oportunidades no.
              </p>
              <p className="text-xl text-gray-700 leading-relaxed">
                Por eso construimos una plataforma donde emprendedores, artistas, innovadores y soñadores 
                pueden encontrar el apoyo de una comunidad que cree en sus proyectos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Nuestros Valores</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-pink-500 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Los principios que guían cada decisión que tomamos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Nuestra Historia</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-pink-500 mx-auto mb-8"></div>
          </div>

          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex gap-6 mb-8 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-white font-bold shadow-lg">
                    {milestone.year}
                  </div>
                  {index !== milestones.length - 1 && (
                    <div className="w-1 h-full bg-gradient-to-b from-purple-600 to-pink-500 mt-2"></div>
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.event}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Conoce al Equipo</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-pink-500 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Las personas que hacen posible esta plataforma
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <div 
                key={index}
                className="group text-center"
              >
                <div className="relative mb-4 overflow-hidden rounded-2xl">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                    <p className="text-white text-sm px-4">{member.bio}</p>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-purple-600 font-medium">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">¿Listo para Empezar?</h2>
          <p className="text-xl mb-8 text-purple-100 max-w-2xl mx-auto">
            Únete a miles de creadores y apoyadores que están transformando ideas en realidad
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/create"
              className="px-8 py-4 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Crear Tu Proyecto
            </Link>
            <Link
              href="/projects"
              className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition"
            >
              Explorar Proyectos
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
