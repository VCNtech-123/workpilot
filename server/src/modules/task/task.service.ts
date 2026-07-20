
import { Task, ITask } from "./task.model";
import { Project } from "../project/project.model";
import { ApiError } from "../../utils/ApiError";
import { getPagination } from "../../utils/pagination";

import mongoose from 'mongoose'

export const createTaskService = async (
    data: Partial<ITask>,
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
    query: Record<string, unknown>
) => {

    const { page, limit, skip } = getPagination(query);

    const filter: Record<string, unknown> = {
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
    data: Partial<ITask>
) => {

    const allowedFields: (keyof ITask)[] = [
    "title",
    "description",
    "status",
    "priority",
    "dueDate"
  ];

  const updateData: Record<string, unknown> = {};

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

export const restoreTaskService = async (
    id: string,
    userId: mongoose.Types.ObjectId
) => {
    
    const restoredTask = await Task.findOneAndUpdate(
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

    return restoredTask;
}