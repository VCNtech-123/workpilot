import mongoose, { Schema } from 'mongoose';

export interface ITask {
    title: string;
    description?: string;
    status: "todo" | "in-progress" | "done";
    priority?: "low" | "medium" | "high";
    dueDate?: Date;
    project: mongoose.Types.ObjectId;
    owner: mongoose.Types.ObjectId;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const taskSchema = new Schema<ITask>(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String
        },
        status: {
            type: String,
            enum: ['todo', 'in-progress', 'done'],
            default: "todo"
        },
        priority: {
            type: String,
            enum: ["low", 'medium', 'high'],
            default:"medium"
        },
        dueDate: {
            type: Date
        },
        project: {
            type: Schema.Types.ObjectId,
            ref: "Project",
            required: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        isDeleted: {
            type: Boolean,
            default: false,
            required: false
        }
    },
    {
        timestamps: true
    }
);

export const Task = mongoose.model<ITask>("Task", taskSchema);