'use client'

import { useState } from 'react'
import { ImageUploader } from './ImageUploader'

interface StorytellingInput {
  photos: string[]
  videos: string[]
  audios: string[]
  story: string
  pitch: string
}

interface Step3Props {
  storytelling: StorytellingInput
  updateArrayField: (field: keyof StorytellingInput, index: number, value: string) => void
  addArrayField: (field: keyof StorytellingInput) => void
  removeArrayField: (field: keyof StorytellingInput, index: number) => void
}

export function Step3Multimedia({
  storytelling,
  updateArrayField,
  addArrayField,
  removeArrayField,
}: Step3Props) {
  const [uploadMethod, setUploadMethod] = useState<'upload' | 'url'>('upload')

  function handleImageUpload(url: string) {
    // Find first empty slot or add new
    const emptyIndex = storytelling.photos.findIndex(p => !p)
    if (emptyIndex !== -1) {
      updateArrayField('photos', emptyIndex, url)
    } else {
      addArrayField('photos')
      // Update the newly added field
      setTimeout(() => {
        updateArrayField('photos', storytelling.photos.length, url)
      }, 0)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-2">
          📸 Contenido Multimedia
        </h2>
        <p className="text-gray-600">
          Añade imágenes y videos para mostrar tu proyecto visualmente
        </p>
      </div>

      {/* Photos Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Fotos *
          </label>
          
          {/* Toggle between Upload / URL */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              type="button"
              onClick={() => setUploadMethod('upload')}
              className={`px-3 py-1 rounded text-sm font-semibold transition ${
                uploadMethod === 'upload'
                  ? 'bg-white text-purple-600 shadow'
                  : 'text-gray-600'
              }`}
            >
              📁 Subir
            </button>
            <button
              type="button"
              onClick={() => setUploadMethod('url')}
              className={`px-3 py-1 rounded text-sm font-semibold transition ${
                uploadMethod === 'url'
                  ? 'bg-white text-purple-600 shadow'
                  : 'text-gray-600'
              }`}
            >
              🔗 URL
            </button>
          </div>
        </div>

        {/* Upload Method */}
        {uploadMethod === 'upload' && (
          <div className="mb-4">
            <ImageUploader onUploadComplete={handleImageUpload} maxSizeMB={10} />
          </div>
        )}

        {/* URL Method */}
        {uploadMethod === 'url' && (
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-3">
              Pega el enlace público de tu imagen
            </p>
          </div>
        )}

        {/* Photos Gallery */}
        {storytelling.photos.some(p => p) && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-700">
              Imágenes cargadas ({storytelling.photos.filter(p => p).length})
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {storytelling.photos.map((photo, index) => {
                if (!photo) return null
                return (
                  <div key={index} className="relative group">
                    <div className="relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition">
                      <img
                        src={photo}
                        alt={`Foto ${index + 1}`}
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Error+Cargando'
                        }}
                      />
                      
                      {/* Badge: Primera imagen */}
                      {index === 0 && (
                        <div className="absolute top-2 left-2 px-3 py-1 bg-purple-600 text-white text-xs font-bold rounded-full">
                          ⭐ Imagen Principal
                        </div>
                      )}
                      
                      {/* Remove button */}
                      <button
                        type="button"
                        onClick={() => removeArrayField('photos', index)}
                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition hover:bg-red-600"
                      >
                        ✕
                      </button>
                    </div>
                    
                    {/* URL display */}
                    <div className="mt-2">
                      <input
                        type="url"
                        value={photo}
                        onChange={(e) => updateArrayField('photos', index, e.target.value)}
                        placeholder="https://ejemplo.com/imagen.jpg"
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                )
              })}
            </div>
            
            {/* Add more button */}
            {uploadMethod === 'url' && (
              <button
                type="button"
                onClick={() => addArrayField('photos')}
                className="w-full px-4 py-3 border-2 border-dashed border-purple-300 rounded-lg text-purple-600 hover:border-purple-500 hover:bg-purple-50 transition font-semibold"
              >
                + Añadir otra foto por URL
              </button>
            )}
          </div>
        )}

        {/* Empty state */}
        {!storytelling.photos.some(p => p) && uploadMethod === 'url' && (
          <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500 mb-3">No hay fotos cargadas</p>
            <button
              type="button"
              onClick={() => addArrayField('photos')}
              className="px-4 py-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition font-semibold"
            >
              + Añadir primera foto
            </button>
          </div>
        )}
      </div>

      {/* Videos Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          🎥 Videos (URLs)
        </label>
        <p className="text-sm text-gray-500 mb-3">
          Sube videos a YouTube, Vimeo o tu servidor y pega los enlaces
        </p>
        {storytelling.videos.map((video, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="url"
              value={video}
              onChange={(e) => updateArrayField('videos', index, e.target.value)}
              placeholder="https://youtube.com/watch?v=..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
            {storytelling.videos.length > 1 && (
              <button
                type="button"
                onClick={() => removeArrayField('videos', index)}
                className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
              >
                ✕
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayField('videos')}
          className="mt-2 px-4 py-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition"
        >
          + Añadir Video
        </button>
      </div>

      {/* Info Boxes */}
      <div className="space-y-3">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <p className="text-sm text-blue-700">
            💡 <strong>Tip:</strong> La primera foto será la imagen principal de tu perfil.
            Elige una que represente bien tu proyecto.
          </p>
        </div>
        
        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
          <p className="text-sm text-green-700">
            ✅ <strong>Recomendado:</strong> Sube entre 3-5 fotos para mostrar diferentes aspectos
            de tu proyecto (equipo, producto, proceso, etc.)
          </p>
        </div>
      </div>
    </div>
  )
}
