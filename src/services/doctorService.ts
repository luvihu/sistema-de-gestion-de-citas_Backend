import { AppDataSource } from "../config/dataSource";
import { Specialty } from "../entities/Specialty";
import { Doctor } from "../entities/Doctor";
import { IDoctor } from "../interfaces/Interfaces";
import { AppError } from "../utils/appError";

const doctorRepository = AppDataSource.getRepository(Doctor);
const specialtyRepository = AppDataSource.getRepository(Specialty);

export const getDoctorServices = async (): Promise<Doctor[]> => {
 const doctorRepo = await doctorRepository.find({
  relations: { 
    specialty: true, 
    appointments: true,
  },
 });
 return doctorRepo;

};
export const getIdDoctorServices = async (id: string) => {
 const getIdRepo= await doctorRepository.findOne({ 
  where: { id }, 
  relations: { specialty: true, appointments: true },
  select: { 
  specialty: { name: true }, 
  appointments: { status: true, date: true, hour: true }
  }
});
 return getIdRepo;
};
export const postDoctorServices = async (doctorData: IDoctor) => {
  const doctorExist = await doctorRepository.findOneBy({ email: doctorData.email });
 if (doctorExist) {
  throw new AppError('El correo electrónico ya está registrado', 400);
}

  const specialtId = await specialtyRepository.findOne({
   where: { id: doctorData.id_specialty },
  });
  if (!specialtId) {
   throw new AppError('Especialidad no encontrada', 404);
  }
  
 const newDoctorServices = doctorRepository.create({
  name: doctorData.name,
  lastname: doctorData.lastname,
  days_atention: doctorData.days_atention,
  hours_attention: doctorData.hours_attention,
  telephone: doctorData.telephone,
  email: doctorData.email,
  active: doctorData.active,
  });
  //asociar la especialidad al doctor
  newDoctorServices.specialty = specialtId;
  
// grabar el doctor en la base de datos
 const saveData = await doctorRepository.save(newDoctorServices);
 
 const doctorRelations = await doctorRepository.findOne({
  where: { id: saveData.id },
  relations: { specialty: true, appointments: true
  },
  
 });
 return doctorRelations;
};
export const putDoctorServices = async (id: string, doctorData: Partial<IDoctor>) => {
  const doctorExist = await doctorRepository.findOneBy({ id });
  if (!doctorExist) {
   throw new AppError('Doctor no encontrado', 404);
  };
  const specialtObjet = await specialtyRepository.findOne({
   where: { id: doctorData.id_specialty }
  });
   if (!specialtObjet) {
   throw new AppError('Especialidad no encontrada', 404);
  };
  const updateDoctor = doctorRepository.merge(doctorExist, {
   name: doctorData.name,
   lastname: doctorData.lastname,
   days_atention: doctorData.days_atention,
   hours_attention: doctorData.hours_attention,
   telephone: doctorData.telephone,
   email: doctorData.email,
   active: doctorData.active,
   });
    updateDoctor.specialty = specialtObjet;
    const saveData = await doctorRepository.save(updateDoctor);
    const doctorRelations = await doctorRepository.findOne({
     where: { id: saveData.id },
     relations: { specialty: true, appointments: true },
     });
    return doctorRelations

};
export const deleteDoctorServices = async (id: string) => {
  const doctorExist = await doctorRepository.findOneBy({ id });
  if (!doctorExist) {
   throw new AppError('Doctor no encontrado', 404);
  };
  const deleteDoct = await doctorRepository.remove(doctorExist);
  return {
    message: 'Doctor eliminado correctamente',
    deleteDoctor: deleteDoct
  }
 
};