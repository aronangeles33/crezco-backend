interface StorytellingInput {
  photos: string[]
  videos: string[]
  audios: string[]
  story: string
  pitch: string
}

interface Step2Props {
  storytelling: StorytellingInput
  setStorytelling: (value: StorytellingInput) => void
  updateArrayField: (field: keyof StorytellingInput, index: number, value: string) => void
  addArrayField: (field: keyof StorytellingInput) => void
  removeArrayField: (field: keyof StorytellingInput, index: number) => void
}

export function Step2Storytelling({
  storytelling,
  setStorytelling,
  updateArrayField,
  addArrayField,
  removeArrayField,
}: Step2Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-2">
          ✨ Cuenta tu Historia
        </h2>
        <p className="text-gray-600">
          Conecta con tu audiencia compartiendo tu historia y tu visión
        </p>
      </div>

      {/* Story (main text) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tu Historia Completa *
        </label>
        <textarea
          value={storytelling.story}
          onChange={(e) =>
            setStorytelling({ ...storytelling, story: e.target.value })
          }
          placeholder="Cuéntanos cómo nació tu proyecto, qué te motivó, qué desafíos has superado..."
          rows={8}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          required
        />
        <p className="text-sm text-gray-500 mt-1">
          {storytelling.story.length} caracteres - Sé auténtico y detallado
        </p>
      </div>

      {/* Pitch (elevator pitch) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tu Pitch en 1 Línea
        </label>
        <input
          type="text"
          value={storytelling.pitch}
          onChange={(e) =>
            setStorytelling({ ...storytelling, pitch: e.target.value })
          }
          placeholder="Ej: Café 100% sostenible que apoya a comunidades indígenas"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
        <p className="text-sm text-gray-500 mt-1">Resume tu proyecto en una frase impactante</p>
      </div>

      {/* Audio URLs */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          🎙️ Audios (URLs)
        </label>
        <p className="text-sm text-gray-500 mb-3">
          Sube audios a SoundCloud, Spotify o tu servidor y pega los enlaces
        </p>
        {storytelling.audios.map((audio, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="url"
              value={audio}
              onChange={(e) => updateArrayField('audios', index, e.target.value)}
              placeholder="https://soundcloud.com/tu-audio"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
            {storytelling.audios.length > 1 && (
              <button
                type="button"
                onClick={() => removeArrayField('audios', index)}
                className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
              >
                ✕
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayField('audios')}
          className="mt-2 px-4 py-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition"
        >
          + Añadir Audio
        </button>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
        <p className="text-sm text-blue-700">
          💡 <strong>Tip:</strong> Una buena historia conecta emocionalmente. Comparte tu "por qué",
          tus desafíos y tu visión del futuro.
        </p>
      </div>
    </div>
  )
}
