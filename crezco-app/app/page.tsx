'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { SignInButton, SignUpButton, SignedIn, SignedOut } from '@clerk/nextjs'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

export default function Home() {
  const [featuredProjects, setFeaturedProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const categories = [
    { id: '1', name: 'Tecnología', emoji: '💻' },
    { id: '2', name: 'Sostenibilidad', emoji: '🌱' },
    { id: '3', name: 'Arte y Diseño', emoji: '🎨' },
    { id: '4', name: 'Educación', emoji: '📚' },
    { id: '5', name: 'Impacto Social', emoji: '❤️' },
    { id: '6', name: 'Música', emoji: '🎵' },
  ]

  useEffect(() => {
    async function loadFeaturedProjects() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'
        const response = await fetch(`${apiUrl}/projects?status=approved&limit=3`)
        if (response.ok) {
          const data = await response.json()
          setFeaturedProjects(data.slice(0, 3))
        }
      } catch (error) {
        console.error('Error loading featured projects:', error)
      } finally {
        setLoading(false)
      }
    }
    loadFeaturedProjects()
  }, [])

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8 text-white">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Apoya a los que están empezando
            </h1>
            <p className="text-xl md:text-2xl font-light opacity-90">
              Invierte en personas, no en bancos. Impulsa proyectos desde 5€.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link 
                href="/projects"
                className="px-8 py-4 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transition text-lg inline-flex items-center justify-center"
              >
                Explorar Proyectos
                <span className="ml-2">→</span>
              </Link>
              <SignedOut>
                <SignUpButton mode="modal">
                  <button className="px-8 py-4 bg-white/10 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition text-lg">
                    Crear Proyecto
                  </button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <Link 
                  href="/create"
                  className="px-8 py-4 bg-white/10 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition text-lg inline-block"
                >
                  Crear Proyecto
                </Link>
              </SignedIn>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Proyectos Destacados
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Descubre iniciativas increíbles de jóvenes emprendedores españoles
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-purple-600 border-r-transparent"></div>
              <p className="mt-4 text-gray-600">Cargando proyectos...</p>
            </div>
          ) : featuredProjects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">No hay proyectos destacados disponibles.</p>
              <p className="text-sm text-gray-500 mt-2">¡Sé el primero en crear uno!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project) => (
                <Link 
                  key={project._id}
                  href={`/perfil/${project._id}`}
                  className="bg-white rounded-lg shadow-sm border hover:shadow-lg transition overflow-hidden group"
                >
                  <div className="aspect-video bg-gray-200 relative overflow-hidden">
                    {project.storytelling?.photos?.[0] ? (
                      <img 
                        src={project.storytelling.photos[0]} 
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-4xl">
                        📷
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="text-sm text-purple-600 font-medium mb-2">
                      {project.category}
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-purple-600 transition">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex justify-between items-center text-sm mb-2">
                      <span className="text-gray-600">
                        {project.currentAmount || 0}€ / {project.goalAmount}€
                      </span>
                      <span className="text-gray-600">
                        {project.supportersCount || 0} apoyos
                      </span>
                    </div>
                    {project.goalAmount > 0 && (
                      <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div 
                          className="bg-purple-600 h-2 rounded-full transition-all"
                          style={{ width: `${Math.min((project.currentAmount || 0) / project.goalAmount * 100, 100)}%` }}
                        />
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link 
              href="/projects"
              className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition"
            >
              Ver Todos los Proyectos
              <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Explora por Categoría
            </h2>
            <p className="text-lg text-gray-600">
              Encuentra proyectos en las áreas que más te interesan
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/projects?category=${encodeURIComponent(category.name)}`}
                className="p-6 bg-white border rounded-lg text-center hover:shadow-lg hover:border-purple-600 transition group"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition">{category.emoji}</div>
                <div className="font-semibold text-gray-800 group-hover:text-purple-600 transition">
                  {category.name}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why CREZCO */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Por qué CREZCO?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              No necesitas inversores, necesitas personas que crean en ti
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4 p-6">
              <div className="inline-flex p-4 rounded-full bg-purple-100">
                <span className="text-4xl">✨</span>
              </div>
              <h3 className="text-xl font-semibold">Fácil y Rápido</h3>
              <p className="text-gray-600">
                Crea tu proyecto en minutos y empieza a recibir apoyo desde el primer día
              </p>
            </div>

            <div className="text-center space-y-4 p-6">
              <div className="inline-flex p-4 rounded-full bg-pink-100">
                <span className="text-4xl">👥</span>
              </div>
              <h3 className="text-xl font-semibold">Comunidad Real</h3>
              <p className="text-gray-600">
                Conecta con personas que comparten tu visión y quieren verte triunfar
              </p>
            </div>

            <div className="text-center space-y-4 p-6">
              <div className="inline-flex p-4 rounded-full bg-yellow-100">
                <span className="text-4xl">🔒</span>
              </div>
              <h3 className="text-xl font-semibold">100% Seguro</h3>
              <p className="text-gray-600">
                Pagos seguros y transparencia total en cada proyecto
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-3xl p-12 md:p-20 text-center text-white">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              ¿Tienes un proyecto en mente?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Únete a cientos de creadores que ya están construyendo su futuro con el apoyo de la comunidad
            </p>
            <SignedOut>
              <SignUpButton mode="modal">
                <button className="px-8 py-4 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transition text-lg inline-flex items-center">
                  Crear Mi Proyecto
                  <span className="ml-2">→</span>
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Link 
                href="/create"
                className="inline-flex items-center px-8 py-4 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transition text-lg"
              >
                Crear Mi Proyecto
                <span className="ml-2">→</span>
              </Link>
            </SignedIn>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
