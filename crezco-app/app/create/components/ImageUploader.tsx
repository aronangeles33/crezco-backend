'use client'

import { useState, useRef } from 'react'

interface ImageUploaderProps {
  onUploadComplete: (url: string) => void
  maxSizeMB?: number
}

export function ImageUploader({ onUploadComplete, maxSizeMB = 10 }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Cloudinary config - Using unsigned preset for client-side upload
  const CLOUDINARY_CLOUD_NAME = 'demo' // TODO: Replace with your cloud name
  const CLOUDINARY_UPLOAD_PRESET = 'ml_default' // TODO: Replace with your unsigned preset

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Por favor selecciona un archivo de imagen válido')
      return
    }

    // Validate file size
    const sizeMB = file.size / (1024 * 1024)
    if (sizeMB > maxSizeMB) {
      setError(`El archivo es muy grande. Máximo ${maxSizeMB}MB`)
      return
    }

    // Show preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)

    // Upload to Cloudinary
    await uploadToCloudinary(file)
  }

  async function uploadToCloudinary(file: File) {
    setUploading(true)
    setError(null)
    setProgress(0)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)
      formData.append('cloud_name', CLOUDINARY_CLOUD_NAME)

      const xhr = new XMLHttpRequest()

      // Progress tracking
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const percentComplete = Math.round((e.loaded / e.total) * 100)
          setProgress(percentComplete)
        }
      })

      // Upload complete
      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText)
          const secureUrl = response.secure_url
          onUploadComplete(secureUrl)
          setUploading(false)
          setProgress(100)
          
          // Reset after success
          setTimeout(() => {
            setPreview(null)
            setProgress(0)
            if (fileInputRef.current) fileInputRef.current.value = ''
          }, 1500)
        } else {
          throw new Error('Upload failed')
        }
      })

      // Error handling
      xhr.addEventListener('error', () => {
        setError('Error al subir imagen. Intenta de nuevo.')
        setUploading(false)
        setProgress(0)
      })

      xhr.open('POST', `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`)
      xhr.send(formData)
    } catch (err: any) {
      setError(err.message || 'Error desconocido')
      setUploading(false)
      setProgress(0)
    }
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && fileInputRef.current) {
      // Create a new FileList-like object
      const dataTransfer = new DataTransfer()
      dataTransfer.items.add(file)
      fileInputRef.current.files = dataTransfer.files
      
      // Trigger change event manually
      const event = new Event('change', { bubbles: true })
      fileInputRef.current.dispatchEvent(event)
      
      // Also call handler directly
      handleFileSelect({ target: fileInputRef.current } as any)
    }
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
  }

  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-purple-300 rounded-lg p-8 text-center cursor-pointer hover:border-purple-500 hover:bg-purple-50 transition"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />

        {preview ? (
          <div className="space-y-4">
            <img
              src={preview}
              alt="Preview"
              className="mx-auto max-h-48 rounded-lg shadow-md"
            />
            {uploading && (
              <div className="space-y-2">
                <div className="overflow-hidden h-2 text-xs flex rounded-full bg-gray-200">
                  <div
                    style={{ width: `${progress}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-purple-600 to-pink-500 transition-all duration-300"
                  ></div>
                </div>
                <p className="text-sm text-gray-600">Subiendo... {progress}%</p>
              </div>
            )}
            {progress === 100 && !uploading && (
              <p className="text-sm text-green-600 font-semibold">✅ Imagen subida exitosamente</p>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            <div className="text-5xl">📸</div>
            <div>
              <p className="text-lg font-semibold text-gray-700">
                Click para subir o arrastra aquí
              </p>
              <p className="text-sm text-gray-500 mt-1">
                PNG, JPG, GIF hasta {maxSizeMB}MB
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}
    </div>
  )
}
