import { Request, Response, NextFunction, RequestHandler } from "express";
import { AppError } from "../utils/appError";
import { getUserService, getUserIdService, deleteUserService, putUserService, registerUserService, loginUserService } from "../services/userService";
import { IUser } from "../interfaces/Interfaces";
import { validateId, sendSuccessResponse } from "../helpers/functionsHelpers";

export const getUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users: IUser[] = await getUserService();
    if (!users || users.length === 0) {
      return next(new AppError('No hay usuarios', 404));
    }
    sendSuccessResponse(res, users);
    
  } catch (error) {
    return next(error);
  }
};
// solo  para el dashboard
export const getAllUsers = async (): Promise<IUser[]> => {
  try {
    const users = await getUserService();
    return users;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData: IUser = req.body;
    if (!userData.name || !userData.lastname || !userData.dni || !userData.telephone || !userData.email || !userData.password) {
      return next(new AppError('Todos los campos son obligatorios', 400));
    }
    const newUser = await registerUserService(userData);
    if (!newUser) {
      return next(new AppError('Error al registrar usuario', 500));
    }
    sendSuccessResponse(res, newUser);
    
  } catch (error) {
    next(error);
  }
  
}

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
try {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError('Email y contraseña son requeridos', 400));
  };
  const userLog = await loginUserService(email, password);
  if(!userLog) {
    return next(new AppError('Credenciales inválidas', 401));
  };
  sendSuccessResponse(res, userLog);

} catch (error) {
  next(error);
}
}

export const getUserId: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
  const { id } = req.params;
 
  if(!validateId(id)) {
    return next(new AppError('ID de usuario inválido', 400));
  } 
    const userIdC = await getUserIdService(id);
    if(!userIdC) {
      return next(new AppError('Usuario no encontrado', 404));
    };
    sendSuccessResponse(res, userIdC);
  } catch (error) {
    next(error);
  }
}

export const deleteUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    if(typeof id !== "string" || id.trim() === "") {
      return next(new AppError('ID de usuario inválido', 400));
    }
    const userDeletC = await deleteUserService(id);
    if(!userDeletC) {
      return next(new AppError('Usuario no encontrado', 404));
    }
    sendSuccessResponse(res, userDeletC);
  } catch (error) {
    next(error);
  }

}
export const putUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if(typeof id !== "string" || id.trim() === "") {
      return next(new AppError('ID de usuario inválido', 400));
    }
    const userData: Partial<IUser> = req.body;
    if(!userData) {
      return next(new AppError('Datos de usuario inválidos', 400));
    }
    const userPutC = await putUserService(id, userData);
    if(!userPutC) {
      return next(new AppError('Usuario no encontrado', 404));
    }
    sendSuccessResponse(res, userPutC);
  } catch (error) {
    next(error);
    }
}

