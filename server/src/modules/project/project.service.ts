
import { Project, IProject } from './project.model';
import { Client } from '../client/client.model';
import { ApiError } from '../../utils/apiError';

export const createProjectService = async (
  data: any,
  userId: string
): Promise<IProject> => {

  const client = await Client.findOne({
    _id: data.client,
    owner: userId,
    isDeleted: false
  });

  if (!client) {
    throw new ApiError(400, "Invalid client");
  }

  const project = await Project.create({
    ...data,
    owner: userId
  });

  return project;
};

export const getProjectByIdService = async (
  id: string,
  userId: string
) => {
  const project = await Project.findOne({
    _id: id,
    owner: userId,
    isDeleted: false
  });

  return project;
}

export const getProjectsService = async (
  userId: string
) => {
  const projects = await Project.find({
    owner: userId, 
    isDeleted: false
  }).sort({ createdAt: -1 });

  return projects;
}