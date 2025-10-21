import mongoose from 'mongoose';

const PlayerSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  position: {
    type: String,
    enum: ['Guard', 'Forward', 'Center'],
    required: true,
  },
  jerseyNumber: {
    type: Number,
    required: true,
  },
  contact: {
    phone: String,
    email: String,
  },
  profilePicture: {
    type: String, // Cloudinary URL
  },
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    required: true,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Player || mongoose.model('Player', PlayerSchema);
