import { AppDataSource } from "../config/dataSource";
import { Appointment } from "../entities/Appointment";
import { User } from "../entities/User";
import { Doctor } from "../entities/Doctor";
import { AppError } from "../utils/appError";
import { IAppointment } from "../interfaces/Interfaces";

const appointmentsRepository = AppDataSource.getRepository(Appointment);
const usersRepository = AppDataSource.getRepository(User);
const doctorsRepository = AppDataSource.getRepository(Doctor);

export const getAppointmService = async () =>  {
 const appointService = await appointmentsRepository.find({
   relations: {
     user: true,
     doctor: true
   },
    select: {
     user: {
       name: true,
       lastname: true,
       email: true,
       telephone: true,
     },
     doctor: {
       name: true,
       lastname: true,
       active: true,
       specialty: {
        name: true
       },
     },
    }
 });
 return appointService;
};
export const getAppointmOnlyService = async (id:string) =>  {
  const appointServiceOnly = await getAppointmService();
  const appointServiceOnlyId = appointServiceOnly.find(appoint => appoint.id === id);
  if(!appointServiceOnlyId) throw new AppError("No se encontró ningún turno",404);
  return appointServiceOnlyId;
  
}
export const postAppointmService = async (appointData: IAppointment) =>  {
  const userExist = await usersRepository.findOneBy({ id: appointData.id_user });
  if(!userExist) throw new AppError("El usuario no existe",404);
  const doctorExist = await doctorsRepository.findOneBy({ id: appointData.id_doctor });
  if(!doctorExist) throw new AppError("El doctor no existe",404);
  
  const appoint: Appointment = appointmentsRepository.create({
    status: appointData.status,
    date: appointData.date,
    hour: appointData.hour,
  });
  appoint.user = userExist;
  appoint.doctor = doctorExist;
  const appointSave = await appointmentsRepository.save(appoint);

  const appointRelation = await appointmentsRepository.findOne({
    where: {
      id: appointSave.id
    },
    relations: {
      user: true,
      doctor: true
    },
    select: {
      user: {
        name: true,
        lastname: true,
        email: true,
        telephone: true,
      },
      doctor: {
        name: true,
        lastname: true,
        active: true,
        specialty: {
         name: true
        },
      }
    }
  });
  return appointRelation;
}
export const putAppointmService = async (change: Partial<IAppointment>) =>  {
  const appoint = await appointmentsRepository.findOneBy({ id: change.id_user });
  if(!appoint) throw new AppError("El turno de cita médica no existe",404);
  const appointUpdate = appointmentsRepository.merge(appoint, change);
  await appointmentsRepository.save(appointUpdate);
  return appointUpdate;
  
}
export const deleteAppointmService = async (id:string) =>  {
  const appoint = await appointmentsRepository.findOneBy({ id, });
  if(!appoint) throw new AppError("El turno de cita médica no existe",404);
  await appointmentsRepository.delete(appoint);
  return appoint;
  
}