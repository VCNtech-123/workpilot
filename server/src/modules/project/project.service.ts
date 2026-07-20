
import { Project, IProject } from './project.model';
import { Client } from '../client/client.model';
import { Task } from '../task/task.model';
import { ApiError } from '../../utils/apiError';
import { getPagination } from '../../utils/pagination';
import mongoose from 'mongoose';

export const createProjectService = async (
  data: any,
  userId: mongoose.Types.ObjectId
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
  userId: mongoose.Types.ObjectId
) => {
  const project = await Project.findOne({
    _id: id,
    owner: userId,
    isDeleted: false
  });

  return project;
}

export const getProjectsService = async (
  userId: mongoose.Types.ObjectId,
  query: Record<string, unknown>
) => {

  const { page, limit, skip } = getPagination(query);
  const status = query.status;

  const filter: Record<string, unknown> = {
    owner: userId,
    isDeleted: false,
  };

  if (status) {
    filter.status = status;
  }

  const projects = await Project.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Project.countDocuments(filter);

  return {
    projects,
    total,
    page,
    pages: Math.ceil(total / limit),
  };
};

export const updateProjectService = async (
  id: string,
  userId: mongoose.Types.ObjectId,
  data: any
) => {

  const allowedFields: (keyof IProject)[] = [
    "name",
    "description",
    "status",
    "deadline",
    "budget",
    "client"
  ];

  
  const updateData: Partial<IProject> = {};

  for (const key of allowedFields) {
    if (data[key] !== undefined) {
      updateData[key] = data[key];
    }
  }

   if (updateData.client) {
    if (!mongoose.Types.ObjectId.isValid(updateData.client)) {
      throw new ApiError(400, "Invalid client ID");
    }

    const client = await Client.findOne({
      _id: updateData.client,
      owner: userId,
      isDeleted: false
    });

    if (!client) {
      throw new ApiError(400, "Invalid client");
    }
  }

  const updatedProject = await Project.findOneAndUpdate(
    {
      _id: id,
      owner: userId,
      isDeleted: false
    },
    updateData,
    { new: true }
  );

  return updatedProject;
}

export const deleteProjectService = async (
  id: string,
  userId: mongoose.Types.ObjectId
) => {

  const deletedProject = Project.findOneAndUpdate(
    {
    _id: id,
      owner: userId,
      isDeleted: false
    },
    {
      isDeleted: true
    },
    {
      new: true
    }
  );

  if (!deletedProject) {
    return null
  };

  await Task.updateMany(
    {
      project: id,
      owner: userId,
      isDeleted: false
    },
    {
      isDeleted: true
    }
  );

  return deletedProject;
}

export const restoreProjectService = async (
  id: string, 
  userId: mongoose.Types.ObjectId
) => {

  const restoredProject = await Project.findOneAndUpdate(
    {
      owner: userId,
      _id: id,
      isDeleted: true
    },
    {
      isDeleted: false
    },
    { new: true }
  );

  return restoredProject;
}