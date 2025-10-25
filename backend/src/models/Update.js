import mongoose from 'mongoose';

const updateSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: String,
    required: true,
    maxlength: 2000,
  },
  media: [{
    type: String,
  }],
  date: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

updateSchema.index({ projectId: 1, createdAt: -1 });

export default mongoose.model('Update', updateSchema);
