import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError";
import  getTokenService from "../services/tokenService";

const getAuthToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.body.userId;
    const user = await getTokenService(userId);
    if (!user) {
      return next(new AppError('Token no encontrado', 404));
    }
    res.status(200).json({
      success: true,
      user
    });
    
  } catch (error) {
    next(error);
  }

};
export default getAuthToken;