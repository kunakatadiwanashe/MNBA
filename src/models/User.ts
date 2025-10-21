import mongoose from 'mongoose';

interface IUser {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'team-manager' | 'player';
  teamId?: mongoose.Types.ObjectId;
}

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'team-manager', 'player'],
    default: 'player',
  },
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    required: function(this: IUser) {
      return this.role === 'team-manager' || this.role === 'player';
    },
  },
}, {
  timestamps: true,
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
