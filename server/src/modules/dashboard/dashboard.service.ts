
import { Client } from '../client/client.model';
import { Project } from '../project/project.model';
import { Task } from '../task/task.model';
import mongoose from 'mongoose';

export const getDashboardService = async (
    userId: mongoose.Types.ObjectId
) => {

    const now = new Date();

    const [ 
        totalClients,
        totalProjects,
        activeProjects,
        completedProjects,
        totalTasks,
        todoTasks,
        inProgressTasks,
        doneTasks,
        overdueTasks
     ] = await Promise.all([
        Client.countDocuments({ owner: userId, isDeleted: false }),
        Project.countDocuments({ owner: userId, isDeleted: false }),
        Project.countDocuments(
            {
                owner: userId,
                status: 'active',
                isDeleted: false
            }),
        Project.countDocuments(
            { 
                owner: userId,
                status: 'completed',
                isDeleted: false
            }),
        Task.countDocuments({ owner: userId, isDeleted: false }),
        Task.countDocuments(
            { 
                owner: userId, 
                isDeleted: false,
                status: 'todo' 
            }),
        Task.countDocuments(
            {
                owner: userId,
                isDeleted: false,
                status: 'in-progress'
            }),
        Task.countDocuments(
            {
                owner: userId,
                isDeleted: false,
                status: 'done'
            }),
        Task.countDocuments(
            {
                owner: userId,
                isDeleted: false,
                dueDate: { $lt: now },
                status: { $ne: "done" } 
            })
    ]);

    return {
        totalClients,
        totalProjects,
        activeProjects,
        completedProjects,
        totalTasks,
        todoTasks,
        inProgressTasks,
        doneTasks,
        overdueTasks
    };
}
