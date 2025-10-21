import mongoose from 'mongoose';

const HeadlineSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});

export default mongoose.models.Headline || mongoose.model('Headline', HeadlineSchema);
