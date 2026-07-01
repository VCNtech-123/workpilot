import mongoose, { Schema } from 'mongoose';

export interface IClient extends mongoose.Document {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    notes?: string;
    status: 'active' | 'inactive';
    owner: mongoose.Types.ObjectId;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const clientSchema = new Schema<IClient>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },
        phone: {
            type: String,
            trim: true,
        },
        company: {
            type: String,
        },
        notes: {
            type: String,
        },
        status: {
            type: String,
            required: true,
            enum: ["active", "inactive"],
            default: "active"
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        isDeleted: {
            type: Boolean,
            default: false
            }
    },
    {
        timestamps: true,
    }
)

export const Client = mongoose.model<IClient>("Client", clientSchema)