
import { Request, Response } from 'express';
import { createProjectService } from './project.service';
import { ApiError } from '../../utils/apiError';

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