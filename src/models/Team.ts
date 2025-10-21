import mongoose from 'mongoose';

const TeamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  logo: {
    type: String, // Cloudinary URL
    required: true,
  },
  managerName: {
    type: String,
    required: true,
  },
    managerPic: {
    type: String, // Cloudinary URL
    required: true,
  },
    headCoach: {
    type: String,
    required: true,
  },
    coachPic: {
    type: String, // Cloudinary URL
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  managerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
  timestamps: true,
});

export default mongoose.models.Team || mongoose.model('Team', TeamSchema);
