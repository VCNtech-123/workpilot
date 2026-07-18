
import { Task } from "./task.model";
import { Project } from "../project/project.model";
import { ApiError } from "../../utils/apiError";

export const createTaskService = async (
    data: any,
    userId: string,
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