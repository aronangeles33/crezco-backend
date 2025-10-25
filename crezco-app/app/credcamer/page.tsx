'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth, useUser } from '@clerk/nextjs'
import Link from 'next/link'

interface Stats {
  totalCaptured: number
  points: number
  level: string
  pending: number
  approved: number
  rejected: number
}

interface Project {
  _id: string
  title: string
  description: string
  goalAmount: number
  category: string
  status: string
  createdAt: string
  pointsAwarded: number
  businessOwner: {
    name: string
    contact: string
  }
}

interface Recommendation {
  id: string
  type: string
  name: string
  description: string
  category: string
  estimatedGoal: number
  location: string
  confidence: number
}

export default function CredcamerDashboard() {
  const router = useRouter()
  const { userId, getToken } = useAuth()
  const { user } = useUser()

  const [activeTab, setActiveTab] = useState<'captures' | 'recommendations' | 'leaderboard'>('captures')
  const [stats, setStats] = useState<Stats | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [leaderboard, setLeaderboard] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  async function fetchDashboardData() {
    try {
      const token = await getToken()
      if (!token) {
        router.push('/sign-in')
        return
      }

      // Fetch captures and stats
      const capturesRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/credcamer/my-captures`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
      })

      if (!capturesRes.ok) {
        throw new Error('No tienes acceso a este dashboard')
      }

      const capturesData = await capturesRes.json()
      setProjects(capturesData.projects)
      setStats(capturesData.stats)

      // Fetch recommendations
      const recsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/credcamer/recommendations`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
      })

      if (recsRes.ok) {
        const recsData = await recsRes.json()
        setRecommendations(recsData.recommendations)
      }

      // Fetch leaderboard
      const leaderRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/credcamer/leaderboard`)
      if (leaderRes.ok) {
        const leaderData = await leaderRes.json()
        setLeaderboard(leaderData.leaderboard)
      }

      setLoading(false)
    } catch (err: any) {
      setError(err.message)
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">🚫</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Acceso Denegado</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            href="/dashboard"
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:shadow-lg transition inline-block"
          >
            ← Volver al Dashboard
          </Link>
        </div>
      </div>
    )
  }

  const levelColors = {
    Novato: 'bg-gray-500',
    Pro: 'bg-blue-500',
    Elite: 'bg-purple-500',
    Leyenda: 'bg-yellow-500',
  }

  const levelIcons = {
    Novato: '🌱',
    Pro: '⭐',
    Elite: '💎',
    Leyenda: '👑',
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="px-4 py-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition font-medium flex items-center gap-2"
              >
                ← Inicio
              </Link>
              <div className="border-l border-gray-300 h-8"></div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                  📈 Dashboard Credcamer
                </h1>
                <p className="text-gray-600 mt-2">
                  Bienvenido, {user?.firstName} - Nivel: {stats?.level || 'Novato'}
                </p>
              </div>
            </div>
            
            <Link
              href="/credcamer/captar"
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:shadow-lg transition font-semibold whitespace-nowrap"
            >
              ➕ Captar Negocio
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Captured */}
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Captados</p>
                <p className="text-3xl font-bold text-gray-900">{stats?.totalCaptured || 0}</p>
              </div>
              <div className="text-4xl">🎯</div>
            </div>
          </div>

          {/* Points */}
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Puntos</p>
                <p className="text-3xl font-bold text-gray-900">{stats?.points || 0}</p>
              </div>
              <div className="text-4xl">⭐</div>
            </div>
          </div>

          {/* Level */}
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-pink-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Nivel</p>
                <p className="text-2xl font-bold text-gray-900">
                  {levelIcons[stats?.level as keyof typeof levelIcons]} {stats?.level}
                </p>
              </div>
              <div className="text-4xl">🚀</div>
            </div>
          </div>

          {/* Pending */}
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Pendientes</p>
                <p className="text-3xl font-bold text-gray-900">{stats?.pending || 0}</p>
              </div>
              <div className="text-4xl">⏳</div>
            </div>
          </div>
        </div>

        {/* Progress Bar to Next Level */}
        {stats && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-700 font-semibold">Progreso al siguiente nivel</p>
              <p className="text-sm text-gray-600">
                {stats.points} / {stats.level === 'Novato' ? 50 : stats.level === 'Pro' ? 200 : stats.level === 'Elite' ? 500 : '∞'} pts
              </p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-gradient-to-r from-purple-600 to-pink-500 h-4 rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(
                    (stats.points / (stats.level === 'Novato' ? 50 : stats.level === 'Pro' ? 200 : stats.level === 'Elite' ? 500 : 1000)) * 100,
                    100
                  )}%`,
                }}
              ></div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex gap-2 sm:gap-4 border-b border-gray-200 overflow-x-auto">
            <button
              onClick={() => setActiveTab('captures')}
              className={`px-4 sm:px-6 py-3 font-semibold transition-all whitespace-nowrap ${
                activeTab === 'captures'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              📦 Mis Capturas ({projects.length})
            </button>
            <button
              onClick={() => setActiveTab('recommendations')}
              className={`px-4 sm:px-6 py-3 font-semibold transition-all whitespace-nowrap ${
                activeTab === 'recommendations'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              💡 Recomendaciones ({recommendations.length})
            </button>
            <button
              onClick={() => setActiveTab('leaderboard')}
              className={`px-4 sm:px-6 py-3 font-semibold transition-all ${
                activeTab === 'leaderboard'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span className="hidden sm:inline">🏆 Ranking</span>
              <span className="sm:hidden">🏆 Rank</span>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {/* Captures Tab */}
          {activeTab === 'captures' && (
            <div className="space-y-4">
              {projects.length === 0 ? (
                <div className="bg-white rounded-xl shadow-md p-12 text-center">
                  <div className="text-6xl mb-4">📭</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No has captado negocios aún</h3>
                  <p className="text-gray-600 mb-6">
                    Empieza a captar negocios locales y gana puntos
                  </p>
                  <Link
                    href="/credcamer/captar"
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:shadow-lg transition inline-block"
                  >
                    ➕ Captar Primer Negocio
                  </Link>
                </div>
              ) : (
                projects.map((project) => (
                  <div key={project._id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              project.status === 'active'
                                ? 'bg-green-100 text-green-700'
                                : project.status === 'pending_review'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {project.status === 'active' ? '✅ Aprobado' : project.status === 'pending_review' ? '⏳ Pendiente' : '❌ Rechazado'}
                          </span>
                          {project.pointsAwarded > 0 && (
                            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">
                              +{project.pointsAwarded} pts
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 mb-3">{project.description.slice(0, 150)}...</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>🏪 {project.businessOwner.name}</span>
                          <span>📧 {project.businessOwner.contact}</span>
                          <span>💰 ${project.goalAmount.toLocaleString()}</span>
                          <span>📅 {new Date(project.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <Link
                        href={`/perfil/${project._id}`}
                        className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition text-sm font-semibold"
                      >
                        Ver Perfil →
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Recommendations Tab */}
          {activeTab === 'recommendations' && (
            <div className="space-y-4">
              {recommendations.map((rec) => (
                <div key={rec.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{rec.name}</h3>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                          {rec.type}
                        </span>
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                          {Math.round(rec.confidence * 100)}% confianza
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3">{rec.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>📍 {rec.location}</span>
                        <span>💰 ${rec.estimatedGoal.toLocaleString()} estimado</span>
                        <span>🏷️ {rec.category}</span>
                      </div>
                    </div>
                    <Link
                      href={`/credcamer/captar?recommendation=${rec.id}`}
                      className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:shadow-lg transition text-sm font-semibold"
                    >
                      📈 Captar →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Leaderboard Tab */}
          {activeTab === 'leaderboard' && (
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-purple-600 to-pink-500 text-white">
                    <tr>
                      <th className="px-4 sm:px-6 py-4 text-left">Posición</th>
                      <th className="px-4 sm:px-6 py-4 text-left">Credcamer</th>
                      <th className="px-4 sm:px-6 py-4 text-center">Nivel</th>
                      <th className="px-4 sm:px-6 py-4 text-center">
                        <span className="hidden sm:inline">Puntos</span>
                        <span className="sm:hidden">Pts</span>
                      </th>
                      <th className="px-4 sm:px-6 py-4 text-center hidden sm:table-cell">Captados</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {leaderboard.map((credcamer, index) => (
                      <tr
                        key={credcamer._id}
                        className={`hover:bg-purple-50 transition ${
                          credcamer._id === userId ? 'bg-purple-100 font-bold' : ''
                        }`}
                      >
                        <td className="px-4 sm:px-6 py-4">
                          <span className="text-2xl">
                            {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                          </span>
                        </td>
                        <td className="px-4 sm:px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={credcamer.avatar}
                              alt={credcamer.name}
                              className="w-10 h-10 rounded-full"
                            />
                            <span className="font-semibold">{credcamer.name}</span>
                            {credcamer._id === userId && (
                              <span className="px-2 py-1 bg-purple-600 text-white rounded text-xs">Tú</span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-4 text-center">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
                            levelColors[credcamer.level as keyof typeof levelColors]
                          }`}>
                            {levelIcons[credcamer.level as keyof typeof levelIcons]} {credcamer.level}
                          </span>
                        </td>
                        <td className="px-4 sm:px-6 py-4 text-center font-bold text-purple-600">
                          {credcamer.points}
                        </td>
                        <td className="px-4 sm:px-6 py-4 text-center text-gray-600 hidden sm:table-cell">
                          {credcamer.totalCaptured}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
