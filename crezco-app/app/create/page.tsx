'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'
import { StepIndicator } from './components/StepIndicator'
import { Step1Identity } from './components/Step1Identity'
import { Step2Storytelling } from './components/Step2Storytelling'
import { Step3Multimedia } from './components/Step3Multimedia'
import { Step4SocialMedia } from './components/Step4SocialMedia'
import { Step5Review } from './components/Step5Review'

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

export default function CreateProjectPage() {
  const router = useRouter()
  const { userId } = useAuth()

  // Step state
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 5

  const steps = [
    { number: 1, title: 'Identidad', icon: '📋' },
    { number: 2, title: 'Historia', icon: '✨' },
    { number: 3, title: 'Multimedia', icon: '📸' },
    { number: 4, title: 'Redes', icon: '🌐' },
    { number: 5, title: 'Revisar', icon: '✅' },
  ]

  // Form state
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
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [draftSaved, setDraftSaved] = useState(false)

  // LocalStorage draft key
  const DRAFT_KEY = 'crezco_project_draft'

  // Load draft on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem(DRAFT_KEY)
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft)
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

  // Auto-save draft when data changes
  useEffect(() => {
    const draft = {
      title,
      description,
      goalAmount,
      category,
      storytelling,
      socialMedia,
      currentStep,
      savedAt: new Date().toISOString(),
    }
    
    // Only save if there's actual content
    if (title || description || storytelling.story) {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(draft))
      setDraftSaved(true)
      
      // Hide "saved" indicator after 2 seconds
      const timer = setTimeout(() => setDraftSaved(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [title, description, goalAmount, category, storytelling, socialMedia, currentStep])

  // Clear draft
  function clearDraft() {
    localStorage.removeItem(DRAFT_KEY)
  }

  // Warn before leaving if there's unsaved content
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (title || description || storytelling.story) {
        e.preventDefault()
        e.returnValue = ''
      }
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [title, description, storytelling.story])

  // Array helpers (for storytelling arrays)
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
      return !!(title && description && goalAmount && category)
    }
    if (step === 2) {
      return !!storytelling.story
    }
    if (step === 3) {
      return storytelling.photos.some((p) => p.trim())
    }
    // Step 4 and 5 are optional
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
    setLoading(true)
    setError(null)

    try {
      const payload = {
        title,
        description,
        goalAmount: Number(goalAmount) || 0,
        category,
        storytelling,
        socialMedia,
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        credentials: 'include',
      })

      if (!res.ok) {
        const err = await res.text()
        throw new Error(err || 'Error creating project')
      }

      const data = await res.json()
      
      // Clear draft after successful submission
      clearDraft()
      
      if (data && data._id) {
        router.push(`/perfil/${data._id}`)
      } else if (data && data.id) {
        router.push(`/perfil/${data.id}`)
      } else {
        router.push('/projects')
      }
    } catch (err: any) {
      setError(err.message || String(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                Crear Nuevo Proyecto
              </h1>
              <p className="text-gray-600 mt-2">
                Comparte tu historia y conecta con la comunidad CREZCO
              </p>
            </div>
            
            {/* Draft saved indicator */}
            {draftSaved && (
              <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg animate-fade-in">
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
            {/* Step 1: Identity */}
            {currentStep === 1 && (
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

            {/* Step 2: Storytelling */}
            {currentStep === 2 && (
              <Step2Storytelling
                storytelling={storytelling}
                setStorytelling={setStorytelling}
                updateArrayField={updateArrayField}
                addArrayField={addArrayField}
                removeArrayField={removeArrayField}
              />
            )}

            {/* Step 3: Multimedia */}
            {currentStep === 3 && (
              <Step3Multimedia
                storytelling={storytelling}
                updateArrayField={updateArrayField}
                addArrayField={addArrayField}
                removeArrayField={removeArrayField}
              />
            )}

            {/* Step 4: Social Media */}
            {currentStep === 4 && (
              <Step4SocialMedia socialMedia={socialMedia} setSocialMedia={setSocialMedia} />
            )}

            {/* Step 5: Review */}
            {currentStep === 5 && (
              <Step5Review
                title={title}
                description={description}
                goalAmount={goalAmount}
                category={category}
                storytelling={storytelling}
                socialMedia={socialMedia}
              />
            )}

            {/* Error Message */}
            {error && (
              <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-500 rounded">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-8 flex justify-between items-center">
              {/* Back Button */}
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={goToPreviousStep}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-semibold"
                >
                  ← Anterior
                </button>
              )}

              <div className="flex-1"></div>

              {/* Next/Submit Button */}
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
                  disabled={loading}
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:shadow-lg transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Enviando...' : '🚀 Crear Proyecto'}
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Help Text + Clear Draft */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>
            ¿Necesitas ayuda?{' '}
            <a href="/help" className="text-purple-600 hover:underline">
              Visita nuestro centro de ayuda
            </a>
          </p>
          
          {(title || description || storytelling.story) && (
            <button
              onClick={() => {
                if (confirm('¿Estás seguro de que quieres borrar el borrador? Esta acción no se puede deshacer.')) {
                  clearDraft()
                  // Reset form
                  setTitle('')
                  setDescription('')
                  setGoalAmount('')
                  setCategory('')
                  setStorytelling({
                    photos: [''],
                    videos: [''],
                    audios: [''],
                    story: '',
                    pitch: '',
                  })
                  setSocialMedia({
                    facebook: '',
                    twitter: '',
                    instagram: '',
                    linkedin: '',
                    tiktok: '',
                    youtube: '',
                    website: '',
                  })
                  setCurrentStep(1)
                  setError(null)
                }
              }}
              className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition font-semibold"
            >
              🗑️ Limpiar Borrador
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
