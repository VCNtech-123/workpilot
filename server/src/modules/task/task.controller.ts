
import { Request, Response } from "express";
import { createTaskService, getTaskService, getTaskByIdService } from "./task.service";
import mongoose from "mongoose";
import { ApiError } from "../../utils/apiError";

export const createTask = async (
    req: Request,
    res: Response
) => {

    const id = (req as any).user._id;

    const task = await createTaskService(req.body, id);

    res.status(201).json({
    status: "success",
    data: {
      id: task._id,
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate,
      project: task.project,
      createdAt: task.createdAt
    }
  });
}

export const getTasks = async (
    req: Request,
    res: Response
) => {

    const result = await getTaskService(
        (req as any).user._id,
        req.query
    )

    res.status(200).json({
    status: "success",
    results: result.tasks.length,
    total: result.total,
    page: result.page,
    pages: result.pages,
    data: result.tasks.map(task => ({
      id: task._id,
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate,
      project: task.project,
      createdAt: task.createdAt
    }))
  });
}

export const getTaskById = async (
    req: Request,
    res: Response
) => {

    const id = req.params.id as string;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid task ID");
    }

    const task = await getTaskByIdService(
        id,
        (req as any).user._id
    );

    if (!task) {
        throw new ApiError(400, "Task not found");
    }

    res.status(200).json({
        status: "success",
        data: {
        id: task._id,
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        dueDate: task.dueDate,
        project: task.project,
        createdAt: task.createdAt
        }
    })
}