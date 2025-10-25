'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'
import { StepIndicator } from '../../../create/components/StepIndicator'
import { Step1Identity } from '../../../create/components/Step1Identity'
import { Step2Storytelling } from '../../../create/components/Step2Storytelling'
import { Step3Multimedia } from '../../../create/components/Step3Multimedia'
import { Step4SocialMedia } from '../../../create/components/Step4SocialMedia'
import { Step5Review } from '../../../create/components/Step5Review'

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

interface Project {
  _id: string
  title: string
  description: string
  goalAmount: number
  category: string
  creatorId: string
  storytelling: StorytellingInput
  socialMedia: SocialMediaInput
}

export default function EditProjectPage() {
  const params = useParams()
  const router = useRouter()
  const { userId } = useAuth()
  
  const projectId = params.id as string

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
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [draftSaved, setDraftSaved] = useState(false)

  // LocalStorage draft key (unique per project)
  const DRAFT_KEY = `crezco_project_edit_${projectId}`

  // Fetch project data
  useEffect(() => {
    fetchProject()
  }, [projectId])

  async function fetchProject() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/${projectId}`, {
        credentials: 'include',
      })

      if (!res.ok) {
        throw new Error('Proyecto no encontrado')
      }

      const project: Project = await res.json()

      // Check if user is owner
      if (project.creatorId !== userId) {
        router.push(`/perfil/${projectId}`)
        return
      }

      // Check for draft first
      const savedDraft = localStorage.getItem(DRAFT_KEY)
      if (savedDraft) {
        try {
          const draft = JSON.parse(savedDraft)
          loadDraft(draft)
          setLoading(false)
          return
        } catch (err) {
          console.error('Error loading draft:', err)
        }
      }

      // Load project data
      setTitle(project.title || '')
      setDescription(project.description || '')
      setGoalAmount(project.goalAmount?.toString() || '')
      setCategory(project.category || '')
      setStorytelling(project.storytelling || {
        photos: [''],
        videos: [''],
        audios: [''],
        story: '',
        pitch: '',
      })
      setSocialMedia(project.socialMedia || {
        facebook: '',
        twitter: '',
        instagram: '',
        linkedin: '',
        tiktok: '',
        youtube: '',
        website: '',
      })

      setLoading(false)
    } catch (err: any) {
      setError(err.message || 'Error al cargar el proyecto')
      setLoading(false)
    }
  }

  function loadDraft(draft: any) {
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
  }

  // Auto-save draft when data changes
  useEffect(() => {
    if (!loading) {
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
      
      if (title || description || storytelling.story) {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(draft))
        setDraftSaved(true)
        
        const timer = setTimeout(() => setDraftSaved(false), 2000)
        return () => clearTimeout(timer)
      }
    }
  }, [title, description, goalAmount, category, storytelling, socialMedia, currentStep, loading])

  // Clear draft
  function clearDraft() {
    localStorage.removeItem(DRAFT_KEY)
  }

  // Warn before leaving
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
      return !!(title && description && goalAmount && category)
    }
    if (step === 2) {
      return !!storytelling.story
    }
    if (step === 3) {
      return storytelling.photos.some((p) => p.trim())
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
      const payload = {
        title,
        description,
        goalAmount: Number(goalAmount) || 0,
        category,
        storytelling,
        socialMedia,
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/${projectId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        credentials: 'include',
      })

      if (!res.ok) {
        const err = await res.text()
        throw new Error(err || 'Error actualizando proyecto')
      }

      // Clear draft after successful update
      clearDraft()

      // Redirect to profile
      router.push(`/perfil/${projectId}`)
    } catch (err: any) {
      setError(err.message || String(err))
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando proyecto...</p>
        </div>
      </div>
    )
  }

  if (error && !title) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Error</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => router.back()}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:shadow-lg transition"
          >
            ← Volver
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                ✏️ Editar Proyecto
              </h1>
              <p className="text-gray-600 mt-2">
                Actualiza la información de tu proyecto
              </p>
            </div>
            
            {/* Draft saved indicator */}
            {draftSaved && (
              <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg">
                <span>💾</span>
                <span className="text-sm font-semibold">Cambios guardados</span>
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

              {/* Cancel button on first step */}
              {currentStep === 1 && (
                <button
                  type="button"
                  onClick={() => router.push(`/perfil/${projectId}`)}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-semibold"
                >
                  ✕ Cancelar
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
                  disabled={submitting}
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:shadow-lg transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Guardando...' : '💾 Guardar Cambios'}
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Help Text + Discard Draft */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <button
            onClick={() => router.push(`/perfil/${projectId}`)}
            className="text-purple-600 hover:underline"
          >
            ← Volver al perfil sin guardar
          </button>
          
          {(title || description || storytelling.story) && (
            <button
              onClick={() => {
                if (confirm('¿Descartar cambios no guardados?')) {
                  clearDraft()
                  router.push(`/perfil/${projectId}`)
                }
              }}
              className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition font-semibold"
            >
              🗑️ Descartar Cambios
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
