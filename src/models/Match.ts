import mongoose from 'mongoose';

const MatchSchema = new mongoose.Schema({
    homeTeam: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required: true,
    },
    awayTeam: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required: true,
    },
    homeScore: {
        type: Number,
        required: true,
    },
    awayScore: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    venue: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

export default mongoose.models.Match || mongoose.model('Match', MatchSchema);
