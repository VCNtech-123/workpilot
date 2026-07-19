
import { Request, Response } from "express";
import { getDashboardService } from "./dashboard.service";

export const getDashboard = async (
    req: Request,
    res: Response
) => {

    const stats = await getDashboardService(
        req.user!._id
    )

    res.status(200).json({
        status: "success",
        data: stats
    });
}