'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'
import { StepIndicator } from '../../create/components/StepIndicator'
import { Step1Identity } from '../../create/components/Step1Identity'
import { Step2Storytelling } from '../../create/components/Step2Storytelling'
import { Step3Multimedia } from '../../create/components/Step3Multimedia'
import { Step4SocialMedia } from '../../create/components/Step4SocialMedia'
import { Step5Review } from '../../create/components/Step5Review'

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

export default function CaptureBusinessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { getToken } = useAuth()

  const recommendationId = searchParams.get('recommendation')

  // Step state
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 6 // Added step for business owner info

  const steps = [
    { number: 1, title: 'Dueño', icon: '👤' },
    { number: 2, title: 'Identidad', icon: '📋' },
    { number: 3, title: 'Historia', icon: '✨' },
    { number: 4, title: 'Multimedia', icon: '📸' },
    { number: 5, title: 'Redes', icon: '🌐' },
    { number: 6, title: 'Revisar', icon: '✅' },
  ]

  // Form state
  const [businessOwnerName, setBusinessOwnerName] = useState('')
  const [businessOwnerContact, setBusinessOwnerContact] = useState('')
  const [credcamerNotes, setCredcamerNotes] = useState('')
  const [location, setLocation] = useState('')

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [goalAmount, setGoalAmount] = useState('')
  const [category, setCategory] = useState('')

  const [storytelling, setStorytelling] = useState<StorytellingInput>({
    photos: [''],
    videos: [''],
    audios: [''],
    story: '',
    pitch: '',
  })

  const [socialMedia, setSocialMedia] = useState<SocialMediaInput>({
    facebook: '',
    twitter: '',
    instagram: '',
    linkedin: '',
    tiktok: '',
    youtube: '',
    website: '',
  })

  // UI state
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [draftSaved, setDraftSaved] = useState(false)

  const DRAFT_KEY = 'crezco_credcamer_capture_draft'

  // Load draft
  useEffect(() => {
    const savedDraft = localStorage.getItem(DRAFT_KEY)
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft)
        setBusinessOwnerName(draft.businessOwnerName || '')
        setBusinessOwnerContact(draft.businessOwnerContact || '')
        setCredcamerNotes(draft.credcamerNotes || '')
        setLocation(draft.location || '')
        setTitle(draft.title || '')
        setDescription(draft.description || '')
        setGoalAmount(draft.goalAmount || '')
        setCategory(draft.category || '')
        setStorytelling(draft.storytelling || {
          photos: [''],
          videos: [''],
          audios: [''],
          story: '',
          pitch: '',
        })
        setSocialMedia(draft.socialMedia || {
          facebook: '',
          twitter: '',
          instagram: '',
          linkedin: '',
          tiktok: '',
          youtube: '',
          website: '',
        })
        setCurrentStep(draft.currentStep || 1)
      } catch (err) {
        console.error('Error loading draft:', err)
      }
    }
  }, [])

  // Auto-save draft
  useEffect(() => {
    const draft = {
      businessOwnerName,
      businessOwnerContact,
      credcamerNotes,
      location,
      title,
      description,
      goalAmount,
      category,
      storytelling,
      socialMedia,
      currentStep,
      savedAt: new Date().toISOString(),
    }

    if (businessOwnerName || title) {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(draft))
      setDraftSaved(true)

      const timer = setTimeout(() => setDraftSaved(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [businessOwnerName, businessOwnerContact, credcamerNotes, location, title, description, goalAmount, category, storytelling, socialMedia, currentStep])

  function clearDraft() {
    localStorage.removeItem(DRAFT_KEY)
  }

  // Warn before leaving
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (businessOwnerName || title) {
        e.preventDefault()
        e.returnValue = ''
      }
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [businessOwnerName, title])

  // Array helpers
  function updateArrayField(field: keyof StorytellingInput, index: number, value: string) {
    setStorytelling((prev) => {
      const arr = [...(prev[field] as string[])]
      arr[index] = value
      return { ...prev, [field]: arr } as StorytellingInput
    })
  }

  function addArrayField(field: keyof StorytellingInput) {
    setStorytelling(
      (prev) => ({ ...prev, [field]: [...(prev[field] as string[]), ''] } as StorytellingInput)
    )
  }

  function removeArrayField(field: keyof StorytellingInput, index: number) {
    setStorytelling((prev) => {
      const arr = [...(prev[field] as string[])]
      arr.splice(index, 1)
      return { ...prev, [field]: arr } as StorytellingInput
    })
  }

  // Validation
  function canProceedFromStep(step: number): boolean {
    if (step === 1) {
      return !!(businessOwnerName && businessOwnerContact)
    }
    if (step === 2) {
      return !!(title && description && goalAmount && category)
    }
    if (step === 3) {
      return !!storytelling.story
    }
    if (step === 4) {
      // TEMPORAL: Hacer multimedia opcional para testing
      // return storytelling.photos.some((p) => p.trim())
      return true // Skip validation temporalmente
    }
    return true
  }

  // Navigation
  function goToNextStep() {
    if (!canProceedFromStep(currentStep)) {
      setError('Por favor completa los campos obligatorios antes de continuar')
      return
    }
    setError(null)
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  function goToPreviousStep() {
    setError(null)
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // Submit
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      const token = await getToken()
      if (!token) {
        throw new Error('No autorizado')
      }

      const payload = {
        title,
        description,
        goalAmount: Number(goalAmount) || 0,
        category,
        storytelling,
        socialMedia,
        businessOwner: {
          name: businessOwnerName,
          contact: businessOwnerContact,
        },
        credcamerNotes,
        location,
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/credcamer/capture`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
        credentials: 'include',
      })

      if (!res.ok) {
        const err = await res.text()
        throw new Error(err || 'Error capturando negocio')
      }

      const data = await res.json()

      clearDraft()

      alert('✅ Negocio captado exitosamente! Pendiente de revisión.')
      router.push('/credcamer')
    } catch (err: any) {
      setError(err.message || String(err))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/credcamer')}
                type="button"
                className="px-4 py-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition font-medium flex items-center gap-2"
              >
                ← Dashboard
              </button>
              <div className="border-l border-gray-300 h-8"></div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                  📈 Captar Negocio
                </h1>
                <p className="text-gray-600 mt-2">
                  Sube un negocio/proyecto de terceros y gana puntos
                </p>
              </div>
            </div>

            {draftSaved && (
              <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg">
                <span>💾</span>
                <span className="text-sm font-semibold">Borrador guardado</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Step Indicator */}
        <StepIndicator currentStep={currentStep} totalSteps={totalSteps} steps={steps} />

        {/* Form Container */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Business Owner Info */}
            {currentStep === 1 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  👤 Información del Dueño del Negocio
                </h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nombre del dueño <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={businessOwnerName}
                      onChange={(e) => setBusinessOwnerName(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Juan Pérez"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Contacto (Email o Teléfono) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={businessOwnerContact}
                      onChange={(e) => setBusinessOwnerContact(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="juan@negocio.com o +1234567890"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Ubicación del negocio
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Calle Principal #123, Ciudad"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Notas internas (solo tú las verás)
                    </label>
                    <textarea
                      value={credcamerNotes}
                      onChange={(e) => setCredcamerNotes(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      rows={4}
                      placeholder="Contacté al dueño el 15/10, está interesado..."
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Identity */}
            {currentStep === 2 && (
              <Step1Identity
                title={title}
                setTitle={setTitle}
                description={description}
                setDescription={setDescription}
                goalAmount={goalAmount}
                setGoalAmount={setGoalAmount}
                category={category}
                setCategory={setCategory}
              />
            )}

            {/* Step 3: Storytelling */}
            {currentStep === 3 && (
              <Step2Storytelling
                storytelling={storytelling}
                setStorytelling={setStorytelling}
                updateArrayField={updateArrayField}
                addArrayField={addArrayField}
                removeArrayField={removeArrayField}
              />
            )}

            {/* Step 4: Multimedia */}
            {currentStep === 4 && (
              <Step3Multimedia
                storytelling={storytelling}
                updateArrayField={updateArrayField}
                addArrayField={addArrayField}
                removeArrayField={removeArrayField}
              />
            )}

            {/* Step 5: Social Media */}
            {currentStep === 5 && (
              <Step4SocialMedia socialMedia={socialMedia} setSocialMedia={setSocialMedia} />
            )}

            {/* Step 6: Review */}
            {currentStep === 6 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  ✅ Revisar antes de captar
                </h2>

                {/* Business Owner Summary */}
                <div className="bg-purple-50 border-l-4 border-purple-500 p-6 mb-6 rounded-lg">
                  <h3 className="font-bold text-purple-900 mb-3">👤 Dueño del negocio</h3>
                  <div className="space-y-2 text-sm text-purple-800">
                    <p><strong>Nombre:</strong> {businessOwnerName}</p>
                    <p><strong>Contacto:</strong> {businessOwnerContact}</p>
                    {location && <p><strong>Ubicación:</strong> {location}</p>}
                    {credcamerNotes && <p><strong>Notas:</strong> {credcamerNotes}</p>}
                  </div>
                </div>

                {/* Project Preview */}
                <Step5Review
                  title={title}
                  description={description}
                  goalAmount={goalAmount}
                  category={category}
                  storytelling={storytelling}
                  socialMedia={socialMedia}
                />

                <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    ⚠️ Este negocio quedará <strong>pendiente de revisión</strong> por un administrador.
                    Si es aprobado, recibirás puntos automáticamente.
                  </p>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-500 rounded">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-8 flex justify-between items-center">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={goToPreviousStep}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-semibold"
                >
                  ← Anterior
                </button>
              )}

              {currentStep === 1 && (
                <button
                  type="button"
                  onClick={() => router.push('/credcamer')}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-semibold"
                >
                  ✕ Cancelar
                </button>
              )}

              <div className="flex-1"></div>

              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={goToNextStep}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:shadow-lg transition font-semibold"
                >
                  Siguiente →
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:shadow-lg transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Captando...' : '📈 Captar Negocio'}
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Help Text */}
        <div className="mt-6 flex items-center justify-between gap-4 text-sm text-gray-500">
          <button
            onClick={() => router.push('/credcamer')}
            className="text-purple-600 hover:underline"
          >
            ← Volver al dashboard
          </button>

          {(businessOwnerName || title) && (
            <button
              onClick={() => {
                if (confirm('¿Descartar borrador?')) {
                  clearDraft()
                  router.push('/credcamer')
                }
              }}
              className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition font-semibold"
            >
              🗑️ Descartar Borrador
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
