
import { Project } from './project.model';
import { Client } from '../client/client.model';
import { ApiError } from '../../utils/apiError';

export const createProjectService = async (
    data: any,
    userId: string
) => {
    const client = await Client.findOne({
        _id: data.client,
        owner: userId,
        isDeleted: false 
    });

    if (!client) {
        throw new ApiError(400, 'Invalid Client');
    }

    const project = await Project.findOne({
        ...data,
        owner: userId
    })

    return project;
}