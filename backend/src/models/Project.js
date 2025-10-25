import mongoose from 'mongoose';

const rewardSchema = new mongoose.Schema({
  title: String,
  description: String,
  minAmount: Number,
  icon: String,
});

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  description: {
    type: String,
    required: true,
    maxlength: 5000,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // NUEVO - Credcamer System
  capturedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Credcamer que captó este negocio
  },
  businessOwner: {
    name: String, // Nombre del dueño real del negocio
    contact: String, // Email o teléfono del dueño
    contactedAt: Date, // Fecha en que se contactó
    approved: { // Si el dueño aprobó que se publique
      type: Boolean,
      default: false,
    },
  },
  credcamerNotes: String, // Notas internas del credcamer
  pointsAwarded: { // Puntos que generó este proyecto
    type: Number,
    default: 0,
  },
  goalAmount: {
    type: Number,
    required: true,
    min: 100,
  },
  currentAmount: {
    type: Number,
    default: 0,
  },
  donors: {
    type: Number,
    default: 0,
  },
  media: [{
    type: String,
  }],
  category: {
    type: String,
    enum: ['startup', 'art', 'podcast', 'shop', 'other'],
    required: true,
  },
  status: {
    type: String,
    enum: ['draft', 'pending_review', 'active', 'rejected', 'funded', 'closed'],
    default: 'draft',
  },
  
  // NUEVO - Story Telling Multimedia
  storytelling: {
    videos: [{
      type: String, // URLs de YouTube, Vimeo, etc.
    }],
    photos: [{
      type: String, // URLs de imágenes (Cloudinary)
    }],
    audios: [{
      type: String, // URLs de audios
    }],
    story: {
      type: String, // Historia escrita (texto largo, puede ser markdown)
      maxlength: 10000,
    },
    pitch: {
      type: String, // Pitch de 30-60 segundos
      maxlength: 500,
    },
  },
  
  // NUEVO - Redes Sociales
  socialMedia: {
    instagram: String,
    tiktok: String,
    facebook: String,
    linkedin: String,
    twitter: String,
    youtube: String,
    website: String,
  },
  
  // NUEVO - Verificación
  verificationStatus: {
    submitted: {
      type: Boolean,
      default: false,
    },
    submittedAt: Date,
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    reviewedAt: Date,
    rejectionReason: String,
  },
  
  rewards: [rewardSchema],
  location: String,
  endDate: Date,
  views: {
    type: Number,
    default: 0,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

// Virtual para calcular porcentaje
projectSchema.virtual('percentageFunded').get(function() {
  return Math.min((this.currentAmount / this.goalAmount) * 100, 100);
});

// Índices compuestos
projectSchema.index({ category: 1, status: 1, createdAt: -1 });
projectSchema.index({ creator: 1, status: 1 });

export default mongoose.model('Project', projectSchema);
