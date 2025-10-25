interface Step1Props {
  title: string
  setTitle: (value: string) => void
  description: string
  setDescription: (value: string) => void
  goalAmount: string
  setGoalAmount: (value: string) => void
  category: string
  setCategory: (value: string) => void
}

export function Step1Identity({
  title,
  setTitle,
  description,
  setDescription,
  goalAmount,
  setGoalAmount,
  category,
  setCategory,
}: Step1Props) {
  // Categorías que coinciden con el backend (enum en Project.js)
  const categories = [
    { value: 'startup', label: 'Startup / Tecnología' },
    { value: 'art', label: 'Arte / Creatividad' },
    { value: 'podcast', label: 'Podcast / Medios' },
    { value: 'shop', label: 'Tienda / Comercio' },
    { value: 'other', label: 'Otro' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-2">
          📋 Identidad del Proyecto
        </h2>
        <p className="text-gray-600">
          Comencemos con la información básica de tu proyecto o negocio
        </p>
      </div>

      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Nombre del Proyecto *
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ej: Mi Tienda de Café Sostenible"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          required
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Descripción Breve *
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Resume tu proyecto en pocas líneas..."
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          required
        />
        <p className="text-sm text-gray-500 mt-1">{description.length} caracteres</p>
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Categoría *
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          required
        >
          <option value="">Selecciona una categoría</option>
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      {/* Goal Amount */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Objetivo de Financiación (€) *
        </label>
        <input
          type="number"
          value={goalAmount}
          onChange={(e) => setGoalAmount(e.target.value)}
          placeholder="5000"
          min="1"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          required
        />
      </div>
    </div>
  )
}
