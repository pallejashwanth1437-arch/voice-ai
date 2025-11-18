import mongoose from 'mongoose';

const ttsHistorySchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    maxLength: 5000
  },
  voice: {
    type: String,
    required: true,
    enum: ['alloy', 'echo', 'fable', 'onyx', 'nova', 'shimmer']
  },
  audioUrl: {
    type: String,
    required: true
  },
  audioFilename: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

export default mongoose.model('TTSHistory', ttsHistorySchema);