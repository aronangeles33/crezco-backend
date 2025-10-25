interface SocialMediaInput {
  facebook: string
  twitter: string
  instagram: string
  linkedin: string
  tiktok: string
  youtube: string
  website: string
}

interface Step4Props {
  socialMedia: SocialMediaInput
  setSocialMedia: (value: SocialMediaInput) => void
}

export function Step4SocialMedia({ socialMedia, setSocialMedia }: Step4Props) {
  const socialPlatforms = [
    { key: 'instagram', label: 'Instagram', icon: '📸', placeholder: '@tu_usuario' },
    { key: 'tiktok', label: 'TikTok', icon: '🎵', placeholder: '@tu_usuario' },
    { key: 'youtube', label: 'YouTube', icon: '📺', placeholder: 'Canal URL' },
    { key: 'facebook', label: 'Facebook', icon: '📘', placeholder: 'Página URL' },
    { key: 'twitter', label: 'Twitter/X', icon: '🐦', placeholder: '@tu_usuario' },
    { key: 'linkedin', label: 'LinkedIn', icon: '💼', placeholder: 'Perfil URL' },
    { key: 'website', label: 'Sitio Web', icon: '🌐', placeholder: 'https://tu-sitio.com' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-2">
          🌐 Redes Sociales
        </h2>
        <p className="text-gray-600">
          Conecta tus perfiles para que la comunidad pueda seguirte
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {socialPlatforms.map((platform) => (
          <div key={platform.key}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {platform.icon} {platform.label}
            </label>
            <input
              type="text"
              value={socialMedia[platform.key as keyof SocialMediaInput]}
              onChange={(e) =>
                setSocialMedia({
                  ...socialMedia,
                  [platform.key]: e.target.value,
                })
              }
              placeholder={platform.placeholder}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        ))}
      </div>

      <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
        <p className="text-sm text-green-700">
          💡 <strong>Tip:</strong> Cuantas más redes compartas, más credibilidad tendrás.
          Verifica que los enlaces sean correctos.
        </p>
      </div>

      {/* Preview social links */}
      {Object.values(socialMedia).some((value) => value) && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            Vista Previa de Enlaces:
          </h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(socialMedia).map(([key, value]) => {
              if (!value) return null
              const platform = socialPlatforms.find((p) => p.key === key)
              return (
                <span
                  key={key}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-white rounded-full text-sm shadow-sm"
                >
                  <span>{platform?.icon}</span>
                  <span className="text-gray-700">{platform?.label}</span>
                  <span className="text-gray-400">✓</span>
                </span>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
