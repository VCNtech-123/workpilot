
import { Request, Response } from "express";
import { createTaskService, getTaskService } from "./task.service";

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
        req.body
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