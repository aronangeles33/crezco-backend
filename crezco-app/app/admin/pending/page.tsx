'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@clerk/nextjs'
import { Header } from '../../../components/Header'
import { Footer } from '../../../components/Footer'

export default function AdminPendingPage() {
  const { getToken } = useAuth()
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    checkAdmin()
  }, [])

  async function checkAdmin() {
    try {
      const token = await getToken()
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'
      
      const response = await fetch(`${apiUrl}/admin/check`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
      })
      
      if (response.ok) {
        const data = await response.json()
        setIsAdmin(data.isAdmin)
        if (data.isAdmin) {
          loadPendingProjects()
        }
      }
    } catch (error) {
      console.error('Error checking admin:', error)
    } finally {
      setLoading(false)
    }
  }

  async function loadPendingProjects() {
    try {
      const token = await getToken()
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'
      
      const response = await fetch(`${apiUrl}/projects/pending`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
      })
      
      if (response.ok) {
        const data = await response.json()
        // El endpoint devuelve { projects: [...], totalPages, currentPage, total }
        setProjects(Array.isArray(data.projects) ? data.projects : [])
      } else {
        setProjects([])
      }
    } catch (error) {
      console.error('Error loading pending projects:', error)
      setProjects([])
    }
  }

  async function approveProject(projectId: string) {
    try {
      const token = await getToken()
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'
      
      const response = await fetch(`${apiUrl}/projects/${projectId}/approve`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
      })
      
      if (response.ok) {
        alert('✅ Proyecto aprobado!')
        loadPendingProjects()
      } else {
        alert('❌ Error al aprobar')
      }
    } catch (error) {
      console.error('Error approving project:', error)
      alert('❌ Error al aprobar')
    }
  }

  async function rejectProject(projectId: string) {
    const reason = prompt('Razón del rechazo:')
    if (!reason || reason.trim().length === 0) {
      alert('⚠️ Debes proporcionar una razón para el rechazo')
      return
    }
    
    try {
      const token = await getToken()
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'
      
      const response = await fetch(`${apiUrl}/projects/${projectId}/reject`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ reason: reason.trim() }),
      })
      
      if (response.ok) {
        alert('✅ Proyecto rechazado')
        loadPendingProjects()
      } else {
        alert('❌ Error al rechazar')
      }
    } catch (error) {
      console.error('Error rejecting project:', error)
      alert('❌ Error al rechazar')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-purple-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Verificando permisos...</p>
        </div>
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-3xl font-bold mb-2">Acceso Denegado</h1>
          <p className="text-gray-600 mb-6">No tienes permisos de administrador</p>
          <Link 
            href="/"
            className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Volver al Inicio
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Proyectos Pendientes de Aprobación</h1>
          <p className="text-gray-600">Revisa y aprueba o rechaza proyectos nuevos</p>
        </div>

        {projects.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
            <div className="text-6xl mb-4">✅</div>
            <h3 className="text-xl font-semibold mb-2">No hay proyectos pendientes</h3>
            <p className="text-gray-600">Todos los proyectos han sido revisados</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {projects.map((project) => (
              <div key={project._id} className="bg-white rounded-lg shadow-sm border p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Project Info */}
                  <div>
                    <div className="text-sm text-purple-600 font-medium mb-2">
                      {project.category}
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Meta:</span>
                        <span className="font-medium">{project.goalAmount}€</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Creador:</span>
                        <span className="font-medium">{project.creator?.name || 'Sin asignar'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Estado:</span>
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">
                          {project.status}
                        </span>
                      </div>
                    </div>

                    {/* Multimedia Info */}
                    {project.storytelling && (
                      <div className="mt-4 pt-4 border-t">
                        <h4 className="font-semibold mb-2">📸 Multimedia:</h4>
                        <div className="space-y-1 text-sm text-gray-600">
                          <div>Fotos: {project.storytelling.photos?.length || 0}</div>
                          <div>Videos: {project.storytelling.videos?.length || 0}</div>
                          <div>Audios: {project.storytelling.audios?.length || 0}</div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Preview */}
                  <div>
                    {project.storytelling?.photos?.[0] && (
                      <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden mb-4">
                        <img 
                          src={project.storytelling.photos[0]} 
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {/* Story Preview */}
                    {project.storytelling?.story && (
                      <div className="bg-gray-50 p-4 rounded-lg mb-4">
                        <h4 className="font-semibold mb-2">📖 Historia:</h4>
                        <p className="text-sm text-gray-600 line-clamp-3">
                          {project.storytelling.story}
                        </p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => approveProject(project._id)}
                        className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
                      >
                        ✅ Aprobar
                      </button>
                      <button
                        onClick={() => rejectProject(project._id)}
                        className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold"
                      >
                        ❌ Rechazar
                      </button>
                    </div>
                    
                    <Link
                      href={`/perfil/${project._id}`}
                      className="block mt-3 text-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      👁️ Ver Perfil
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
