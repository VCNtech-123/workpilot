
import { Task } from "./task.model";
import { Project } from "../project/project.model";
import { ApiError } from "../../utils/apiError";
import mongoose from 'mongoose'

export const createTaskService = async (
    data: any,
    userId: mongoose.Types.ObjectId
) => {

    const project = await Project.findOne({
        _id: data.project,
        owner: userId,
        isDeleted: false
    });

    if (!project) {
        throw new ApiError(400, "Invalid project");
    }

    const task = await Task.create({
        ...data,
        owner: userId
    })

    return task;
}

export const getTaskService = async (
    userId: mongoose.Types.ObjectId,
    query: any
) => {

    const page = parseInt(query.page as string) || 1;
    const limit = parseInt(query.limit as string) || 1;
    const skip = (page - 1) * limit

    const filter: any = {
        owner: userId,
        isDeleted: false
    }

    if (query.project) {
        filter.project = query.project;
    }

    if (query.status) {
        filter.status = query.status;
    }

    if (query.priority) {
        filter.priority = query.priority;
    } 

    const tasks = await Task.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

    const total = await Task.countDocuments(filter);

    return {
        tasks,
        total,
        page,
        pages: Math.ceil(total / limit)
    }
}

export const getTaskByIdService = async (
    id: string,
    userId: mongoose.Types.ObjectId
) => {
    
    const task = Task.findOne({
        _id: id,
        owner: userId,
        isDeleted: false
    });

    return task;
}

export const updateTaskByIdService = async (
    id: string,
    userId: mongoose.Types.ObjectId,
    data: any
) => {

    const allowedFields = [
    "title",
    "description",
    "status",
    "priority",
    "dueDate"
  ];

  const updateData: any = {};

  for (const key of allowedFields) {
    if (data[key] !== undefined) {
      updateData[key] = data[key];
    }
  }

  const updatedTask = await Task.findOneAndUpdate(
    {
    _id: id,
    owner: userId,
    isDeleted: false
  },
    updateData,
    { new: true }
    );

    return updatedTask;
}

export const deleteTaskService = async (
    id: string,
    userId: mongoose.Types.ObjectId
) => {

    const deletedTask = await Task.findOneAndUpdate(
        {
            _id: id,
            owner: userId,
            isDeleted: false
        },
        {
            isDeleted: true
        },
        { new: true }
    );

    return deletedTask;
}