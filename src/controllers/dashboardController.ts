import { Request, Response, NextFunction , RequestHandler} from "express";
import { getAllUsers } from "./userController";
import { IUser } from "../interfaces/Interfaces";

export const getDashboard: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const dashboardData = {
      users: await getAllUsers(),
    }
    res.status(200).json({
      success: true,
      data: dashboardData
    });
  } catch (error) {
    next(error);
  }
  
  
  
  
  
  
  
}