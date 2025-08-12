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

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData: IUser = req.body;
    // Capitalizar primera letra del nombre y apellido y pasar a minúscula el resto, 
    if (userData.name) {
      userData.name = userData.name.trim().charAt(0).toUpperCase() + userData.name.trim().slice(1).toLowerCase();
    };
    
    if (userData.lastname) {
      userData.lastname = userData.lastname.trim().charAt(0).toUpperCase() + userData.lastname.trim().slice(1).toLowerCase();
    };
    if (userData.email) {
      userData.email = userData.email.trim().toLowerCase();
    };
   
    if (userData.email) {
      userData.email = userData.email.trim();
    }

    if (userData.dni) {
      userData.dni = userData.dni.trim();
    }

    if (userData.telephone) {
      userData.telephone = userData.telephone.trim();
    }
 
    if (!userData.name?.trim() || 
        !userData.lastname?.trim() || 
        !userData.dni?.trim() || 
        !userData.telephone?.trim() || 
        !userData.email?.trim() || 
        !userData.password) {
      return next(new AppError('Todos los campos son obligatorios y no pueden estar vacíos', 400));
    };
    
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
  // Limpieza del email
  const cleanEmail = email?.toLowerCase();
  const cleanPassword = password?.trim();
  if (!cleanEmail || !cleanPassword) {
    return next(new AppError('Email y contraseña son requeridos', 400));
  };
  const userLog = await loginUserService(cleanEmail, cleanPassword);
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

