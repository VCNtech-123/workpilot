import { Request, Response } from "express";
import { createClientService } from "./client.service";

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