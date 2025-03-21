import { Request, Response, NextFunction, RequestHandler } from "express";
import { AppError } from "../utils/appError";
import { getSpecialtyService, getIdSpecialtyService, postSpecialtyService, putSpecialtyService, deleteSpecialtyService } from "../services/specialtyService";
import { sendSuccessResponse, validateId } from "../helpers/functionsHelpers";
import { ISpecialty } from "../interfaces/Interfaces";

export const getSpecialty: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const specialty = await getSpecialtyService();
    if(specialty.length === 0) {
      return next(new AppError('No se encontraron especialidades médicas', 404));
    }
    sendSuccessResponse(res, specialty);
    
  } catch (error) {
    next(error);
  }
}
export const getIdSpecialty: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
   const { id } = req.params;
   const isValidId = validateId(id);
   if (!isValidId) {
      return next(new AppError('ID inválido', 400));
    }
   const specialtyId = await getIdSpecialtyService(id);
   if (!specialtyId) {
      return next(new AppError('No se encontró la especialidad médica', 404));
    }
    sendSuccessResponse(res, specialtyId);
  } catch (error) {
    next(error);
  }
}
export const postSpecialty: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
 try {
   const specialtyData = req.body;
   if(!specialtyData.name || !specialtyData.description) {
     return next(new AppError('Faltan datos', 400));
   };
   if(specialtyData.name) {
    if(specialtyData.name.length < 3) {
       return next(new AppError('El nombre debe tener al menos 3 caracteres', 400));
     };
    if(!/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/.test(specialtyData.name)) {
       return next(new AppError('El nombre solo puede contener letras y espacios', 400));
     };
    };
   if(specialtyData.description) {
     if(specialtyData.description.length < 20) {
       return next(new AppError('La descripción debe tener al menos 20 caracteres', 400));
     };
   }
   const specialty = await postSpecialtyService(specialtyData);
   if(!specialty) {
     return next(new AppError('No se pudo crear la especialidad médica', 400));
   }
   sendSuccessResponse(res, specialty);
 } catch (error) {
   next(error);
 }
}
export const putSpecialty: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
 try {
  const { id } = req.params;
  const isValidId = validateId(id);
  if (!isValidId) {
    return next(new AppError('ID inválido', 400));
  }
  const specialtyData: Partial<ISpecialty> = req.body;
  if(!specialtyData) {
    return next(new AppError('Faltan datos', 400));
  }
  
  const specPutt = await putSpecialtyService(id, specialtyData);
  if(!specPutt) {
    return next(new AppError('No se pudo actualizar la especialidad médica', 400));
  }
  sendSuccessResponse(res, specPutt);
 } catch (error) {
  next(error);
 }
}
export const deleteSpecialty: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
 try {
  const { id } = req.params;
  const isValidId = validateId(id);
  if (!isValidId) {
    return next(new AppError('ID inválido', 400));
  }
  const specialtyDelete = await deleteSpecialtyService(id);
  if(!specialtyDelete) {
    return next(new AppError('No se pudo eliminar la especialidad médica', 400));
  }
  sendSuccessResponse(res, specialtyDelete);
 } catch (error) {
   next(error);
 }
}