import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
    {
        description: String,
        longDescription: String,
        iconUrl: String,
        category: String,
        lessonsCount: Number,
        seqNo: Number,
        url: String
    },
    {
        timestamps: true,
        autoCreate: true
    }
);

const CourseModule = mongoose.model('Course', courseSchema);

module.exports = CourseModule;
