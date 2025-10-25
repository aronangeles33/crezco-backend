'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'
import Link from 'next/link'

interface User {
  _id: string
  name: string
  email: string
  avatar: string
  role: string
  credcamerPoints?: number
  credcamerLevel?: string
  totalCaptured?: number
}

interface Stats {
  totalCredcamers: number
  totalCaptured: number
  totalPointsAwarded: number
  levelDistribution: Array<{
    _id: string
    count: number
  }>
}

export default function AdminCredcamersPage() {
  const router = useRouter()
  const { getToken } = useAuth()

  const [users, setUsers] = useState<User[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      const token = await getToken()
      if (!token) {
        router.push('/sign-in')
        return
      }

      // Fetch all users
      const usersRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
      })

      if (!usersRes.ok) {
        throw new Error('No tienes acceso a este panel')
      }

      const usersData = await usersRes.json()
      setUsers(usersData)

      // Fetch credcamer stats
      const statsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/credcamer/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
      })

      if (statsRes.ok) {
        const statsData = await statsRes.json()
        setStats(statsData)
      }

      setLoading(false)
    } catch (err: any) {
      setError(err.message)
      setLoading(false)
    }
  }

  async function promoteToCredcamer(userId: string) {
    try {
      const token = await getToken()
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/credcamer/promote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ userId }),
        credentials: 'include',
      })

      if (!res.ok) {
        throw new Error('Error promoviendo usuario')
      }

      alert('✅ Usuario promovido a Credcamer exitosamente')
      fetchData() // Refresh data
    } catch (err: any) {
      alert('❌ ' + err.message)
    }
  }

  async function demoteCredcamer(userId: string) {
    try {
      const token = await getToken()
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/credcamer/demote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ userId }),
        credentials: 'include',
      })

      if (!res.ok) {
        throw new Error('Error degradando credcamer')
      }

      alert('✅ Credcamer degradado a usuario normal')
      fetchData() // Refresh data
    } catch (err: any) {
      alert('❌ ' + err.message)
    }
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const credcamers = filteredUsers.filter((u) => u.role === 'credcamer')
  const normalUsers = filteredUsers.filter((u) => u.role !== 'credcamer' && u.role !== 'admin')

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando panel...</p>
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
            ← Volver
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                👑 Gestión de Credcamers
              </h1>
              <p className="text-gray-600 mt-2">Promover/degradar usuarios y ver estadísticas</p>
            </div>

            <Link
              href="/admin/pending"
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:shadow-lg transition font-semibold"
            >
              ← Volver a Admin
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Total Credcamers</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalCredcamers}</p>
                </div>
                <div className="text-4xl">👥</div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Negocios Captados</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalCaptured}</p>
                </div>
                <div className="text-4xl">🎯</div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Puntos Otorgados</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalPointsAwarded}</p>
                </div>
                <div className="text-4xl">⭐</div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-pink-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Nivel Elite+</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stats.levelDistribution.find((l) => l._id === 'Elite')?.count || 0}
                  </p>
                </div>
                <div className="text-4xl">💎</div>
              </div>
            </div>
          </div>
        )}

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="🔍 Buscar por nombre o email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        {/* Credcamers Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-500">
            <h2 className="text-xl font-bold text-white">📈 Credcamers Activos ({credcamers.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Usuario</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Nivel</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Puntos</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Captados</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {credcamers.map((user) => (
                  <tr key={user._id} className="hover:bg-purple-50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
                        <div>
                          <p className="font-semibold text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                        {user.credcamerLevel || 'Novato'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center font-bold text-purple-600">
                      {user.credcamerPoints || 0}
                    </td>
                    <td className="px-6 py-4 text-center text-gray-600">{user.totalCaptured || 0}</td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => {
                          if (confirm(`¿Degradar a ${user.name} de Credcamer?`)) {
                            demoteCredcamer(user._id)
                          }
                        }}
                        className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition text-sm font-semibold"
                      >
                        ⬇️ Degradar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {credcamers.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No hay credcamers activos</p>
              </div>
            )}
          </div>
        </div>

        {/* Normal Users Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="px-6 py-4 bg-gray-700">
            <h2 className="text-xl font-bold text-white">👤 Usuarios Normales ({normalUsers.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Usuario</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Rol</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {normalUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
                        <div>
                          <p className="font-semibold text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => {
                          if (confirm(`¿Promover a ${user.name} a Credcamer?`)) {
                            promoteToCredcamer(user._id)
                          }
                        }}
                        className="px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:shadow-lg transition text-sm font-semibold"
                      >
                        ⬆️ Promover
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {normalUsers.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No se encontraron usuarios</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
