import mongoose from 'mongoose';

const jobRequestSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String
    },
    location: {
        type: String
    },
    contactName: {
        type: String
    },
    contactEmail: {
        type: String,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        
    },
    status: {
        type: String,
        enum: ['Open', 'In Progress', 'Closed'],
        default: 'Open'
    }
},
    {
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: false
        }
    }

);

export const JobRequest = mongoose.model('JobRequest', jobRequestSchema, 'jobRequests')
