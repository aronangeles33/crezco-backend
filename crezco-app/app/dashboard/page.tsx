'use client'

import { useState, useEffect } from 'react'
import { useAuth, useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'

export default function DashboardPage() {
  const { isLoaded, isSignedIn, userId } = useAuth()
  const { user } = useUser()
  const router = useRouter()
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('projects')
  
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/')
    }
  }, [isLoaded, isSignedIn, router])

  useEffect(() => {
    async function loadUserProjects() {
      if (!userId) return
      
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'
        const response = await fetch(`${apiUrl}/projects?creatorId=${userId}`)
        if (response.ok) {
          const data = await response.json()
          // Asegurarse de que data es un array
          setProjects(Array.isArray(data) ? data : [])
        } else {
          setProjects([])
        }
      } catch (error) {
        console.error('Error loading projects:', error)
        setProjects([])
      } finally {
        setLoading(false)
      }
    }
    if (userId) {
      loadUserProjects()
    }
  }, [userId])

  if (!isLoaded || !isSignedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-purple-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    )
  }

  const totalRaised = projects.reduce((sum, p) => sum + (p.currentAmount || 0), 0)
  const totalSupporters = projects.reduce((sum, p) => sum + (p.supportersCount || 0), 0)

  return (
    <div className="min-h-screen">
      <Header />

      <div className="min-h-screen py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center text-white text-3xl font-bold">
                {user?.firstName?.[0] || user?.emailAddresses[0]?.emailAddress[0].toUpperCase()}
              </div>
              <div>
                <h1 className="text-3xl font-bold">{user?.firstName || 'Usuario'} {user?.lastName || ''}</h1>
                <p className="text-gray-600">{user?.emailAddresses[0]?.emailAddress}</p>
              </div>
            </div>
            <Link 
              href="/create"
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-semibold inline-flex items-center"
            >
              <span className="mr-2">+</span>
              Nuevo Proyecto
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Proyectos Activos</p>
                  <p className="text-3xl font-bold">{projects.length}</p>
                </div>
                <div className="p-3 rounded-full bg-purple-100">
                  <span className="text-2xl">📊</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Recaudado</p>
                  <p className="text-3xl font-bold">{totalRaised.toLocaleString('es-ES')}€</p>
                </div>
                <div className="p-3 rounded-full bg-pink-100">
                  <span className="text-2xl">❤️</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Apoyos Totales</p>
                  <p className="text-3xl font-bold">{totalSupporters}</p>
                </div>
                <div className="p-3 rounded-full bg-yellow-100">
                  <span className="text-2xl">👥</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('projects')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'projects'
                      ? 'border-purple-600 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Mis Proyectos
                </button>
                <button
                  onClick={() => setActiveTab('supported')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'supported'
                      ? 'border-purple-600 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Proyectos Apoyados
                </button>
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'profile'
                      ? 'border-purple-600 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Perfil
                </button>
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              {loading ? (
                <div className="text-center py-12">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-purple-600 border-r-transparent"></div>
                  <p className="mt-4 text-gray-600">Cargando proyectos...</p>
                </div>
              ) : projects.length > 0 ? (
                projects.map((project) => {
                  const progress = project.goalAmount > 0 
                    ? (project.currentAmount / project.goalAmount) * 100 
                    : 0
                  
                  return (
                    <div key={project._id} className="bg-white p-6 rounded-lg shadow-sm border">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="w-full md:w-48 h-32 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                          {project.storytelling?.photos?.[0] ? (
                            <img
                              src={project.storytelling.photos[0]}
                              alt={project.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              📷
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-xs px-2 py-1 bg-purple-100 text-purple-600 rounded">
                                  {project.category}
                                </span>
                                <span className={`text-xs px-2 py-1 rounded ${
                                  project.verificationStatus === 'approved' 
                                    ? 'bg-green-100 text-green-600'
                                    : project.verificationStatus === 'pending_review'
                                    ? 'bg-yellow-100 text-yellow-600'
                                    : 'bg-red-100 text-red-600'
                                }`}>
                                  {project.verificationStatus === 'approved' ? '✓ Aprobado' : 
                                   project.verificationStatus === 'pending_review' ? '⏳ Pendiente' : '✗ Rechazado'}
                                </span>
                              </div>
                              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                              <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>
                            </div>
                            <Link 
                              href={`/perfil/${project._id}`}
                              className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                              Ver Perfil
                            </Link>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="font-medium">
                                {project.currentAmount?.toLocaleString('es-ES') || 0}€ de {project.goalAmount.toLocaleString('es-ES')}€
                              </span>
                              <span className="text-gray-600">{Math.round(progress)}%</span>
                            </div>
                            <div className="bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-purple-600 h-2 rounded-full transition-all"
                                style={{ width: `${Math.min(progress, 100)}%` }}
                              />
                            </div>
                            <div className="flex gap-4 text-sm text-gray-600">
                              <span>{project.supportersCount || 0} apoyos</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className="bg-white p-12 rounded-lg shadow-sm border text-center">
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className="text-xl font-semibold mb-2">No tienes proyectos aún</h3>
                  <p className="text-gray-600 mb-6">
                    Crea tu primer proyecto y empieza a recibir apoyo de la comunidad
                  </p>
                  <Link 
                    href="/create"
                    className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  >
                    Crear Mi Primer Proyecto
                  </Link>
                </div>
              )}
            </div>
          )}

          {activeTab === 'supported' && (
            <div className="bg-white p-12 rounded-lg shadow-sm border text-center">
              <div className="text-6xl mb-4">❤️</div>
              <p className="text-gray-600 mb-4">No has apoyado ningún proyecto todavía</p>
              <Link 
                href="/projects"
                className="inline-block px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Explorar Proyectos
              </Link>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-2xl font-semibold mb-6">Información del Perfil</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Nombre</label>
                  <p className="text-gray-600">{user?.firstName} {user?.lastName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Email</label>
                  <p className="text-gray-600">{user?.emailAddresses[0]?.emailAddress}</p>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Miembro desde</label>
                  <p className="text-gray-600">
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('es-ES') : 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
