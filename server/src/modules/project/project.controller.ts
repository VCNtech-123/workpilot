
import { Request, Response } from 'express';
import { createProjectService, getProjectByIdService, getProjectsService } from './project.service';
import { ApiError } from '../../utils/apiError';
import mongoose from 'mongoose'

export const createProject = async (req: Request, res: Response) => {
    const project = await createProjectService(
        req.body,
        (req as any).user._id
    );

    res.status(201).json({
        status: "success",
        data: {
        id: project._id,
        name: project.name,
        description: project.description,
        status: project.status,
        deadline: project.deadline,
        budget: project.budget,
        client: project.client,
        createdAt: project.createdAt,
        },
     });
}

export const getProjectById = async (
    req: Request, 
    res: Response,
) => {
    const id = req.params.id as string;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, 'Invalid project ID');
    }

    const project = await getProjectByIdService(
        id,
        (req as any).user._id
    );

    if (!project) {
        throw new ApiError(400, 'Project not found')
    }

    res.status(200).json({
    status: "success",
    data: {
      id: project._id,
      name: project.name,
      description: project.description,
      status: project.status,
      deadline: project.deadline,
      budget: project.budget,
      client: project.client,
      createdAt: project.createdAt
    }
  });
}

export const getProjects = async (
    req: Request,
    res: Response
) => {
    const projects = await getProjectsService(
    (req as any).user._id
  );

  res.status(200).json({
    status: "success",
    results: projects.length,
    data: projects.map(project => ({
      id: project._id,
      name: project.name,
      description: project.description,
      status: project.status,
      deadline: project.deadline,
      budget: project.budget,
      client: project.client,
      createdAt: project.createdAt
    }))
  });
}