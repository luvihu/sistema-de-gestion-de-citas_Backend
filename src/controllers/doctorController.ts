import { Request, Response, NextFunction, RequestHandler } from "express";
import { getDoctorServices, getIdDoctorServices, postDoctorServices, putDoctorServices, deleteDoctorServices } from "../services/doctorService";
import { AppError } from "../utils/appError";
import { IDoctor } from "../interfaces/Interfaces";
import { sendSuccessResponse, validateId } from '../helpers/functionsHelpers';

export const getDoctor: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doctors = await getDoctorServices();
    if (!doctors) {
      return next(new AppError('No se encontraron doctores', 404));
    }
    sendSuccessResponse(res, doctors);
  } catch (error) {
    next(error)
  }
}
export const getIdDoctor: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const validId = validateId(id);
    if(!validId) {
      return next(new AppError('El ID proporcionado no es válido', 400));
    }
    const getDoc = await getIdDoctorServices(id);
    if (!getDoc) {
      return next(new AppError('No se encontró el doctor', 404));
    };
    sendSuccessResponse(res, getDoc);
  } catch (error) {
    next(error);
  }
}
export const postDoctor: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
 try {
  const doctorData = req.body;
  console.log(doctorData);
  if(!doctorData.name || !doctorData.lastname || !doctorData.telephone || !doctorData.email ) {
    return next(new AppError('Faltan datos obligatorios', 400));
  };
  const newDoctor = await postDoctorServices(doctorData);
  if(!newDoctor) {
    return next(new AppError('No se pudo crear el doctor', 500));
  }
  sendSuccessResponse(res, newDoctor);
 } catch (error) {
   next(error);
 }
}
export const putDoctor: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
 try {
  const { id } = req.params;
  const validId = validateId(id);
  if(!validId) {
    return next(new AppError('El ID proporcionado no es válido', 400));
  };
  const doctorDataP: Partial<IDoctor> = req.body;
  if(!doctorDataP) {
    return next(new AppError('No se recibieron datos para actualizar', 400));
  }
  const doctorUpdate = await putDoctorServices(id, doctorDataP);
  if(!doctorUpdate) {
    return next(new AppError('No se pudo actualizar el doctor', 500));
  };
  sendSuccessResponse(res, doctorUpdate);
  
 } catch (error) {
   next(error);
 }
}
export const deleteDoctor: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
 try {
  const { id } = req.params;
  const validId = validateId(id);
  if(!validId) {
    return next(new AppError('El ID proporcionado no es válido', 400));
  };
  const doctorDelete = await deleteDoctorServices(id);
  if(!doctorDelete) {
    return next(new AppError('No se pudo eliminar el doctor', 500));
  };
  sendSuccessResponse(res, doctorDelete);
 } catch (error) {
   next(error);
  
 }
}