import { Client } from "./client.model";
import { ApiError } from "../../utils/apiError";

export const createClientService = async (
  data: any,
  userId: string
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