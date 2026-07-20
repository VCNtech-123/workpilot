import { Client, IClient } from "./client.model";
import { ApiError } from "../../utils/apiError";
import mongoose from "mongoose";

export const createClientService = async (
  data: Partial<IClient>,
  userId: mongoose.Types.ObjectId
) => {
  const existingClient = await Client.findOne({
    email: data.email,
    owner: userId,
    isDeleted: false,
  });

  if (existingClient) {
    throw new ApiError(400, "Client already exists");
  }

  const client = await Client.create({
    ...data,
    owner: userId,
  });

  return client;
};

export const getClientsService = async (userId: mongoose.Types.ObjectId) => {
  const clients = await Client.find({
    owner: userId,
    isDeleted: false,
  }).sort({ createdAt: -1 });

  return clients;
};

export const getClientByIdService = async (
  id: string,
  userId: mongoose.Types.ObjectId
) => {
  const client = await Client.findOne({
    _id: id,
    owner: userId,
    isDeleted: false,
  });

  return client;
};

export const updateClientService = async (
  id: string,
  userId: mongoose.Types.ObjectId,
  data: Partial<IClient>
) => {
    const updateData: Partial<
      Pick<IClient, "name" | "email" | "phone" | "company" | "notes" | "status">
    > = {};

    if (data.name !== undefined) updateData.name = data.name;
    if (data.email !== undefined) updateData.email = data.email;
    if (data.phone !== undefined) updateData.phone = data.phone;
    if (data.company !== undefined) updateData.company = data.company;
    if (data.notes !== undefined) updateData.notes = data.notes;
    if (data.status !== undefined) updateData.status = data.status;

    const updatedClient = await Client.findOneAndUpdate(
      {
        _id: id,
        owner: userId,
        isDeleted: false,
      },
      updateData,
      { new: true }
    );

    return updatedClient;
};

export const deleteClientService = async (
 id: string,
 userId: mongoose.Types.ObjectId,
) => {
  const deletedClient = await Client.findOneAndUpdate(
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

  return deletedClient;
}