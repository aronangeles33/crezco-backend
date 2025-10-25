interface StorytellingInput {
  photos: string[]
  videos: string[]
  audios: string[]
  story: string
  pitch: string
}

interface SocialMediaInput {
  facebook: string
  twitter: string
  instagram: string
  linkedin: string
  tiktok: string
  youtube: string
  website: string
}

interface Step5Props {
  title: string
  description: string
  goalAmount: string
  category: string
  storytelling: StorytellingInput
  socialMedia: SocialMediaInput
}

export function Step5Review({
  title,
  description,
  goalAmount,
  category,
  storytelling,
  socialMedia,
}: Step5Props) {
  const socialCount = Object.values(socialMedia).filter((v) => v).length

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-2">
          ✅ Revisión Final
        </h2>
        <p className="text-gray-600">
          Revisa toda la información antes de enviar tu proyecto
        </p>
      </div>

      {/* Summary Card */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        {/* Header Image */}
        {storytelling.photos[0] && (
          <div className="h-48 bg-gray-100">
            <img
              src={storytelling.photos[0]}
              alt={title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/800x300?text=Imagen+Principal'
              }}
            />
          </div>
        )}

        <div className="p-6 space-y-4">
          {/* Basic Info */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900">{title || 'Sin título'}</h3>
            <p className="text-purple-600 font-semibold mt-1">{category || 'Sin categoría'}</p>
          </div>

          <p className="text-gray-600">{description || 'Sin descripción'}</p>

          {/* Goal */}
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-4">
            <p className="text-sm text-gray-600">Objetivo de Financiación</p>
            <p className="text-3xl font-bold text-purple-600">
              {goalAmount ? `€${Number(goalAmount).toLocaleString()}` : '€0'}
            </p>
          </div>

          {/* Pitch */}
          {storytelling.pitch && (
            <div className="border-l-4 border-purple-500 pl-4 py-2 bg-purple-50 rounded">
              <p className="text-sm font-semibold text-gray-700">💡 Pitch</p>
              <p className="text-gray-800 italic">"{storytelling.pitch}"</p>
            </div>
          )}

          {/* Story Preview */}
          {storytelling.story && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">📖 Historia</h4>
              <p className="text-gray-600 text-sm line-clamp-3">{storytelling.story}</p>
              <p className="text-xs text-gray-500 mt-1">
                {storytelling.story.length} caracteres
              </p>
            </div>
          )}

          {/* Media Summary */}
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-2xl">📸</span>
              <span className="text-gray-700">
                {storytelling.photos.filter((p) => p).length} fotos
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎥</span>
              <span className="text-gray-700">
                {storytelling.videos.filter((v) => v).length} videos
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎙️</span>
              <span className="text-gray-700">
                {storytelling.audios.filter((a) => a).length} audios
              </span>
            </div>
          </div>

          {/* Social Media Summary */}
          {socialCount > 0 && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">🌐 Redes Sociales</h4>
              <div className="flex flex-wrap gap-2">
                {socialMedia.instagram && (
                  <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs">
                    📸 Instagram
                  </span>
                )}
                {socialMedia.tiktok && (
                  <span className="px-3 py-1 bg-black text-white rounded-full text-xs">
                    🎵 TikTok
                  </span>
                )}
                {socialMedia.youtube && (
                  <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs">
                    📺 YouTube
                  </span>
                )}
                {socialMedia.facebook && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                    📘 Facebook
                  </span>
                )}
                {socialMedia.twitter && (
                  <span className="px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-xs">
                    🐦 Twitter
                  </span>
                )}
                {socialMedia.linkedin && (
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs">
                    💼 LinkedIn
                  </span>
                )}
                {socialMedia.website && (
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                    🌐 Sitio Web
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Warning */}
      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
        <p className="text-sm text-yellow-700">
          ⚠️ <strong>Importante:</strong> Tu proyecto será enviado a revisión por nuestro equipo
          de administradores antes de ser publicado.
        </p>
      </div>
    </div>
  )
}
