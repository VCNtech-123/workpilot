import { api } from "./axios";

export const getProjects = async (params?: any) => {
  const response = await api.get("/projects", { params });
  return response.data;
};

export const createProject = async (data: any) => {
  const response = await api.post("/projects", data);
  return response.data;
};

export const updateProject = async (id: string, data: any) => {
  const response = await api.put(`/projects/${id}`, data);
  return response.data;
};

export const deleteProject = async (id: string) => {
  const response = await api.delete(`/projects/${id}`);
  return response.data;
};

export const restoreProject = async (id: string) => {
  const response = await api.patch(`/projects/${id}/restore`);
  return response.data;
};