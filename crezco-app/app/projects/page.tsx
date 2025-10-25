'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('recent') // Nuevo: ordenamiento
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const categories = [
    { id: 'startup', name: 'Startup', icon: '🚀' },
    { id: 'art', name: 'Arte', icon: '🎨' },
    { id: 'podcast', name: 'Podcast', icon: '🎙️' },
    { id: 'shop', name: 'Tienda', icon: '🏪' },
    { id: 'other', name: 'Otro', icon: '📦' },
  ]

  useEffect(() => {
    async function loadProjects() {
      try {
        setLoading(true)
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'
        const params = new URLSearchParams()
        params.append('status', 'active')
        if (selectedCategory !== 'all') params.append('category', selectedCategory)
        
        const response = await fetch(`${apiUrl}/projects?${params}`)
        if (response.ok) {
          const data = await response.json()
          // Si data es un array, usarlo directamente; si no, intentar data.projects
          if (Array.isArray(data)) {
            setProjects(data)
          } else if (data.projects && Array.isArray(data.projects)) {
            setProjects(data.projects)
          } else {
            setProjects([])
          }
        } else {
          setProjects([])
        }
      } catch (error) {
        console.error('Error cargando proyectos:', error)
        setProjects([])
      } finally {
        setLoading(false)
      }
    }
    loadProjects()
  }, [selectedCategory])

  const filteredProjects = (projects || [])
    .filter((project) => {
      if (!project) return false
      const matchesSearch = project.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description?.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesSearch
    })
    .sort((a, b) => {
      if (sortBy === 'recent') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }
      if (sortBy === 'popular') {
        return (b.supportersCount || 0) - (a.supportersCount || 0)
      }
      if (sortBy === 'funded') {
        const aProgress = (a.currentAmount || 0) / a.goalAmount
        const bProgress = (b.currentAmount || 0) / b.goalAmount
        return bProgress - aProgress
      }
      return 0
    })

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Descubre Proyectos Increíbles
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Encuentra iniciativas que inspiran y apoya a los creadores del futuro
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="search"
                placeholder="Buscar proyectos por nombre o descripción..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            >
              <option value="all">Todas las categorías</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.icon} {cat.name}
                </option>
              ))}
            </select>

            {/* Sort Filter */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            >
              <option value="recent">Más recientes</option>
              <option value="popular">Más populares</option>
              <option value="funded">Mayor progreso</option>
            </select>
          </div>

          {/* Active Filters */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="font-medium">{filteredProjects.length} proyectos encontrados</span>
            {(searchQuery || selectedCategory !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('all')
                }}
                className="text-purple-600 hover:underline"
              >
                Limpiar filtros
              </button>
            )}
          </div>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-purple-600 border-r-transparent"></div>
            <p className="mt-4 text-gray-600">Cargando proyectos...</p>
          </div>
        ) : filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => {
              const progress = project.goalAmount > 0 
                ? Math.min((project.currentAmount || 0) / project.goalAmount * 100, 100) 
                : 0
              const categoryData = categories.find(c => c.id === project.category)
              
              return (
                <Link 
                  key={project._id}
                  href={`/perfil/${project._id}`}
                  className="bg-white rounded-xl shadow-sm border hover:shadow-xl transition-all duration-300 overflow-hidden group"
                >
                  {/* Image */}
                  <div className="aspect-video bg-gradient-to-br from-purple-100 to-pink-100 relative overflow-hidden">
                    {project.storytelling?.photos?.[0] ? (
                      <img 
                        src={project.storytelling.photos[0]} 
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-5xl">
                        {categoryData?.icon || '📷'}
                      </div>
                    )}
                    
                    {/* Credcamer Badge */}
                    {project.capturedBy && (
                      <div className="absolute top-3 right-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1">
                        <span>📈</span>
                        <span>Credcamer</span>
                      </div>
                    )}
                    
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-purple-600 shadow-md">
                      {categoryData?.icon} {categoryData?.name || project.category}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-purple-600 transition line-clamp-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3 text-sm">
                      {project.description}
                    </p>
                    
                    {/* Stats */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">Progreso</span>
                        <span className="font-bold text-purple-600">{progress.toFixed(0)}%</span>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-purple-600 to-pink-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      
                      <div className="flex justify-between items-center text-sm pt-2">
                        <div>
                          <span className="text-gray-500">Recaudado: </span>
                          <span className="font-bold text-gray-900">{project.currentAmount || 0}€</span>
                        </div>
                        <div className="text-gray-500">
                          Meta: {project.goalAmount}€
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 pt-2 border-t border-gray-100">
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <span>👥</span>
                          <span>{project.supportersCount || 0} apoyos</span>
                        </div>
                        {project.capturedBy && (
                          <div className="flex items-center gap-1 text-sm text-purple-600 font-medium">
                            <span>📈</span>
                            <span>Captado</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-lg text-gray-600 mb-4">
              {searchQuery || selectedCategory !== 'all' 
                ? 'No se encontraron proyectos con los filtros seleccionados'
                : 'No hay proyectos disponibles aún'
              }
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('all')
              }}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
