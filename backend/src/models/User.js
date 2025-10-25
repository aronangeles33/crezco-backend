import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  avatar: {
    type: String,
    default: 'https://api.dicebear.com/7.x/avataaars/svg?seed=default',
  },
  role: {
    type: String,
    enum: ['creator', 'supporter', 'admin', 'credcamer'],
    default: 'supporter',
  },
  points: {
    type: Number,
    default: 0,
  },
  level: {
    type: String,
    enum: ['Novato', 'Pro', 'Elite', 'Leyenda'],
    default: 'Novato',
  },
  totalCaptured: {
    type: Number,
    default: 0,
  },
  stats: {
    totalPoints: {
      type: Number,
      default: 0,
    },
    projectsCaptured: {
      type: Number,
      default: 0,
    },
    successRate: {
      type: Number,
      default: 0,
    },
  },
  bio: {
    type: String,
    maxlength: 500,
    default: '',
  },
  socialLinks: {
    instagram: String,
    tiktok: String,
    twitter: String,
    linkedin: String,
    website: String,
  },
  badges: [{
    type: String,
  }],
  totalDonated: {
    type: Number,
    default: 0,
  },
  stripeCustomerId: String,
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
});

export default mongoose.model('User', userSchema);
