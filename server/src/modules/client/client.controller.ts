import { Request, Response } from "express";
import { createClientService } from "./client.service";
import { getClientsService } from "./client.service";
import mongoose from "mongoose";
import { ApiError } from "../../utils/apiError";
import { getClientByIdService } from "./client.service";

export const createClient = async (req: Request, res: Response) => {
  const client = await createClientService(
    req.body,
    (req as any).user._id
  );

  res.status(201).json({
    status: "success",
    data: {
      id: client._id,
      name: client.name,
      email: client.email,
      phone: client.phone,
      company: client.company,
      notes: client.notes,
      status: client.status,
      createdAt: client.createdAt,
    },
  });
};

export const getClients = async (req: Request, res: Response) => {
  const clients = await getClientsService(
    (req as any).user._id
  );

  res.status(200).json({
    status: "success",
    results: clients.length,
    data: clients.map((client) => ({
      id: client._id,
      name: client.name,
      email: client.email,
      phone: client.phone,
      company: client.company,
      status: client.status,
      createdAt: client.createdAt,
    })),
  });
};

export const getClientById = async (req: Request, res: Response) => {
  const id  = req.params.id as string;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid client ID");
  }

  const client = await getClientByIdService(
    id,
    (req as any).user._id
  );

  if (!client) {
    throw new ApiError(404, "Client not found");
  }

  res.status(200).json({
    status: "success",
    data: {
      id: client._id,
      name: client.name,
      email: client.email,
      phone: client.phone,
      company: client.company,
      status: client.status,
      createdAt: client.createdAt,
    },
  });
};