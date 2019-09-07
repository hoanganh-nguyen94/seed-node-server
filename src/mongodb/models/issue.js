import mongoose from 'mongoose';

const issueSchema = new mongoose.Schema(
    {
        description: String,
        status: String,
    },
    {
        timestamps: true,
        autoCreate: true
    }
);

const IssueModule = mongoose.model('Issue', issueSchema);

module.exports = IssueModule;
