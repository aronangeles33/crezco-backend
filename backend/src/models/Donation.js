import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
    min: 5,
  },
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  message: {
    type: String,
    maxlength: 500,
  },
  anonymous: {
    type: Boolean,
    default: false,
  },
  stripePaymentIntentId: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    enum: ['pending', 'succeeded', 'failed', 'refunded'],
    default: 'pending',
  },
  date: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

// Índices compuestos optimizados
donationSchema.index({ project: 1, status: 1, createdAt: -1 });
donationSchema.index({ donor: 1, status: 1, createdAt: -1 });

export default mongoose.model('Donation', donationSchema);
