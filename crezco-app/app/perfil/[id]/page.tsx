'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'
import Link from 'next/link'

interface Project {
  _id: string
  title: string
  description: string
  category: string
  goalAmount: number
  currentAmount: number
  supporters: number
  creatorId: string
  createdAt: string
  verificationStatus: 'pending_review' | 'approved' | 'rejected'
  pointsAwarded?: number
  capturedBy?: {
    _id: string
    name: string
    avatar: string
    level: string
    points: number
  }
  businessOwner?: {
    name: string
    contact: string
  }
  storytelling: {
    photos: string[]
    videos: string[]
    audios: string[]
    story: string
    pitch: string
  }
  socialMedia: {
    facebook?: string
    twitter?: string
    instagram?: string
    linkedin?: string
    tiktok?: string
    youtube?: string
    website?: string
  }
}

export default function PerfilPage() {
  const params = useParams()
  const router = useRouter()
  const { userId } = useAuth()
  
  const projectId = params.id as string

  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'historia' | 'multimedia' | 'actualizaciones'>('historia')

  useEffect(() => {
    fetchProject()
  }, [projectId])

  async function fetchProject() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/${projectId}`, {
        credentials: 'include',
      })

      if (!res.ok) {
        throw new Error('Proyecto no encontrado')
      }

      const data = await res.json()
      setProject(data)
    } catch (err: any) {
      setError(err.message || 'Error al cargar el proyecto')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando perfil...</p>
        </div>
      </div>
    )
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Proyecto no encontrado</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            href="/projects"
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:shadow-lg transition"
          >
            Ver todos los proyectos
          </Link>
        </div>
      </div>
    )
  }

  const isOwner = userId === project.creatorId
  const progress = Math.min((project.currentAmount / project.goalAmount) * 100, 100)
  const mainPhoto = project.storytelling.photos.find(p => p) || 'https://via.placeholder.com/1200x400?text=Sin+Imagen'

  const socialPlatforms = [
    { key: 'instagram', label: 'Instagram', icon: '📸', color: 'bg-pink-500' },
    { key: 'tiktok', label: 'TikTok', icon: '🎵', color: 'bg-black' },
    { key: 'youtube', label: 'YouTube', icon: '📺', color: 'bg-red-500' },
    { key: 'facebook', label: 'Facebook', icon: '📘', color: 'bg-blue-600' },
    { key: 'twitter', label: 'Twitter', icon: '🐦', color: 'bg-sky-500' },
    { key: 'linkedin', label: 'LinkedIn', icon: '💼', color: 'bg-blue-700' },
    { key: 'website', label: 'Sitio Web', icon: '🌐', color: 'bg-green-600' },
  ]

  const connectedSocials = socialPlatforms.filter(
    (platform) => project.socialMedia[platform.key as keyof typeof project.socialMedia]
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="relative h-80 bg-gradient-to-r from-purple-600 to-pink-500">
        <img
          src={mainPhoto}
          alt={project.title}
          className="w-full h-full object-cover opacity-90"
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/1200x400?text=Imagen+Principal'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white transition shadow-lg"
        >
          ← Volver
        </button>

        {/* Owner actions */}
        {isOwner && (
          <div className="absolute top-4 right-4">
            <Link
              href={`/projects/${project._id}/edit`}
              className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white transition shadow-lg"
            >
              ✏️ Editar Proyecto
            </Link>
          </div>
        )}
      </div>

      {/* Profile Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 pb-12">
        {/* Main Card */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          {/* Header Section */}
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{project.title}</h1>
                  {project.verificationStatus === 'approved' && (
                    <span className="flex-shrink-0 px-3 py-1 bg-green-100 text-green-800 text-sm font-semibold rounded-full">
                      ✓ Verificado
                    </span>
                  )}
                  {project.capturedBy && (
                    <span className="flex-shrink-0 px-3 py-1 bg-purple-100 text-purple-800 text-sm font-semibold rounded-full">
                      📈 Captado por Credcamer
                    </span>
                  )}
                </div>
                
                <p className="text-purple-600 font-semibold mb-3">📂 {project.category}</p>
                
                {project.storytelling.pitch && (
                  <p className="text-lg text-gray-700 italic border-l-4 border-purple-500 pl-4 py-2 bg-purple-50 rounded">
                    "{project.storytelling.pitch}"
                  </p>
                )}
              </div>

              {/* CTA Button */}
              <div className="flex-shrink-0">
                <button className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl hover:shadow-xl transition font-bold text-lg">
                  💜 Apoyar Proyecto
                </button>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Objetivo</p>
                <p className="text-2xl font-bold text-purple-600">
                  €{project.goalAmount.toLocaleString()}
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Recaudado</p>
                <p className="text-2xl font-bold text-pink-600">
                  €{project.currentAmount.toLocaleString()}
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Progreso</p>
                <p className="text-2xl font-bold text-green-600">{Math.round(progress)}%</p>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Apoyos</p>
                <p className="text-2xl font-bold text-blue-600">{project.supporters}</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-6">
              <div className="overflow-hidden h-3 text-xs flex rounded-full bg-gray-200">
                <div
                  style={{ width: `${progress}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-purple-600 to-pink-500 transition-all duration-500"
                ></div>
              </div>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="border-t border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('historia')}
                className={`flex-1 px-6 py-4 text-center font-semibold transition ${
                  activeTab === 'historia'
                    ? 'border-b-4 border-purple-600 text-purple-600 bg-purple-50'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                📖 Historia
              </button>
              <button
                onClick={() => setActiveTab('multimedia')}
                className={`flex-1 px-6 py-4 text-center font-semibold transition ${
                  activeTab === 'multimedia'
                    ? 'border-b-4 border-purple-600 text-purple-600 bg-purple-50'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                📸 Multimedia
              </button>
              <button
                onClick={() => setActiveTab('actualizaciones')}
                className={`flex-1 px-6 py-4 text-center font-semibold transition ${
                  activeTab === 'actualizaciones'
                    ? 'border-b-4 border-purple-600 text-purple-600 bg-purple-50'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                📢 Actualizaciones
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6 md:p-8">
            {/* Historia Tab */}
            {activeTab === 'historia' && (
              <div className="space-y-6">
                <div className="prose max-w-none">
                  <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                    {project.storytelling.story || 'No hay historia disponible.'}
                  </p>
                </div>

                {/* Social Media Links */}
                {connectedSocials.length > 0 && (
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">🌐 Síguenos en Redes</h3>
                    <div className="flex flex-wrap gap-3">
                      {connectedSocials.map((social) => (
                        <a
                          key={social.key}
                          href={project.socialMedia[social.key as keyof typeof project.socialMedia] || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-2 px-4 py-2 ${social.color} text-white rounded-lg hover:shadow-lg transition font-semibold`}
                        >
                          <span>{social.icon}</span>
                          <span>{social.label}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Multimedia Tab */}
            {activeTab === 'multimedia' && (
              <div className="space-y-8">
                {/* Photos Gallery */}
                {project.storytelling.photos.filter(p => p).length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">📸 Galería de Fotos</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {project.storytelling.photos
                        .filter((p) => p)
                        .map((photo, index) => (
                          <div key={index} className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition">
                            <img
                              src={photo}
                              alt={`Foto ${index + 1}`}
                              className="w-full h-64 object-cover"
                              onError={(e) => {
                                e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Imagen+No+Disponible'
                              }}
                            />
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* Videos */}
                {project.storytelling.videos.filter(v => v).length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">🎥 Videos</h3>
                    <div className="space-y-4">
                      {project.storytelling.videos
                        .filter((v) => v)
                        .map((video, index) => (
                          <div key={index} className="bg-gray-100 rounded-lg p-4">
                            <a
                              href={video}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-purple-600 hover:underline font-semibold"
                            >
                              📺 Video {index + 1}: {video}
                            </a>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* Audios */}
                {project.storytelling.audios.filter(a => a).length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">🎙️ Audios</h3>
                    <div className="space-y-4">
                      {project.storytelling.audios
                        .filter((a) => a)
                        .map((audio, index) => (
                          <div key={index} className="bg-gray-100 rounded-lg p-4">
                            <a
                              href={audio}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-purple-600 hover:underline font-semibold"
                            >
                              🎵 Audio {index + 1}: {audio}
                            </a>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {project.storytelling.photos.filter(p => p).length === 0 &&
                  project.storytelling.videos.filter(v => v).length === 0 &&
                  project.storytelling.audios.filter(a => a).length === 0 && (
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4">📦</div>
                      <p className="text-gray-600">No hay contenido multimedia disponible</p>
                    </div>
                  )}
              </div>
            )}

            {/* Actualizaciones Tab */}
            {activeTab === 'actualizaciones' && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🚧</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Próximamente</h3>
                <p className="text-gray-600">
                  Las actualizaciones del proyecto estarán disponibles pronto
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Credcamer Info - Si fue captado */}
          {project.capturedBy && (
            <div className="bg-gradient-to-br from-purple-600 to-pink-500 rounded-xl shadow-lg p-6 text-white md:col-span-3">
              <div className="flex items-center gap-4">
                <img
                  src={project.capturedBy.avatar}
                  alt={project.capturedBy.name}
                  className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold">📈 Captado por Credcamer</h3>
                    <span className="px-2 py-1 bg-white/20 rounded-full text-xs font-semibold">
                      {project.capturedBy.level}
                    </span>
                  </div>
                  <p className="text-white/90 text-sm font-semibold">{project.capturedBy.name}</p>
                  <p className="text-white/75 text-xs">{project.capturedBy.points} puntos • {project.capturedBy.level}</p>
                </div>
                {project.pointsAwarded && (
                  <div className="text-center bg-white/20 rounded-lg px-4 py-2">
                    <div className="text-2xl font-bold">+{project.pointsAwarded}</div>
                    <div className="text-xs text-white/75">puntos</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Creator Info */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">👤 Creador</h3>
            <p className="text-sm text-gray-600 mb-4">
              Proyecto creado el {new Date(project.createdAt).toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </p>
            <button className="w-full px-4 py-2 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition font-semibold">
              💬 Enviar Mensaje
            </button>
          </div>

          {/* Share */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">📤 Compartir</h3>
            <div className="space-y-2">
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                📘 Facebook
              </button>
              <button className="w-full px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition">
                🐦 Twitter
              </button>
              <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                📱 WhatsApp
              </button>
            </div>
          </div>

          {/* Report */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">⚠️ Reportar</h3>
            <p className="text-sm text-gray-600 mb-4">
              ¿Encontraste algo inapropiado?
            </p>
            <button className="w-full px-4 py-2 border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition font-semibold">
              🚨 Reportar Proyecto
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
