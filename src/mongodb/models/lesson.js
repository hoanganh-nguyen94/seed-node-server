import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema(
    {
        description: String,
        duration: Date,
        seqNo: Number,
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        }
    },
    {
        timestamps: true,
        autoCreate: true
    }
);

const LessonModule = mongoose.model('Lesson', lessonSchema);

module.exports = LessonModule;
