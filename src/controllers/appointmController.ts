import { Request, Response, NextFunction, RequestHandler } from "express";
import { getAppointmService, getAppointmOnlyService, postAppointmService, putAppointmService, deleteAppointmService } from "../services/appointmService";
import { AppError } from "../utils/appError";
import { IAppointment } from "../interfaces/Interfaces";
import { sendSuccessResponse, validateId } from '../helpers/functionsHelpers';

export const getAppointm: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
 try {
   const appoint = await getAppointmService();
   if(!appoint) return next(new AppError("No se encontró ningún turno de cita médica",404));
   sendSuccessResponse(res, appoint);
 } catch (error) {
   next(error);
 }
}
export const getAppointmOnly: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const validateIdApp =  validateId(id);
    if(!validateIdApp) return next(new AppError("El ID ingresado no es válido",404));
    const appointOnly = await getAppointmOnlyService(id);
    if(!appointOnly) return next(new AppError("No se encontró ningún turno de cita médica",404));
    sendSuccessResponse(res, appointOnly);
  } catch (error) {
    next(error);
    
  }
}
export const postAppointm: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
 try {
  const appointData: IAppointment = req.body;
  if(!appointData.date || !appointData.hour) return next(new AppError("Faltan datos para crear el turno de cita médica",404));

  const currentDate = new Date();
  const appointmentDate = new Date(appointData.date);
  if(appointmentDate < currentDate) throw new AppError("La fecha ingresada es menor a la fecha actual",404);
  
  const appoint = await postAppointmService(appointData);
  if(!appoint) return next(new AppError("No se pudo crear el turno de cita médica",404));
  sendSuccessResponse(res, appoint);
 } catch (error) {
  next(error);
 }
}
export const putAppointm: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
 try {
  const change = req.body;
  if(!change.status || !change.date || !change.hour) return next(new AppError("Faltan datos para cambiar el estado del turno de cita médica",404));
  const appointCh = await putAppointmService(change);
  if(!appointCh) return next(new AppError("No se pudo cambiar el estado del turno de cita médica",404));
  sendSuccessResponse(res, appointCh);
 } catch (error) {
  next(error);
 }
}
export const deleteAppointm: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
 try {
    const { id } = req.params;
    const validateIdApp =  validateId(id);
    if(!validateIdApp) return next(new AppError("El id ingresado no es válido",404));
    const appoint = await deleteAppointmService(id);
    if(!appoint) return next(new AppError("No se pudo eliminar el turno de cita médica",404));
    sendSuccessResponse(res, appoint);
  } catch (error) {
    next(error);
  }
}