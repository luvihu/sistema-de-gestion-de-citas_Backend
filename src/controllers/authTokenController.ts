import { Request, Response, NextFunction , RequestHandler} from "express";
import { AppError } from "../utils/appError";
import  getTokenService from "../services/tokenService";

const getAuthToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.body.userId;
    const userToken = await getTokenService(userId);
    if (!userToken) {
      return next(new AppError('Token no encontrado', 404));
    }
    res.status(200).json({
      success: true,
      data: userToken
    });
    
  } catch (error) {
    next(error);
  }

};
export default getAuthToken;