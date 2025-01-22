import { AppDataSource } from "../config/dataSource";
import { Specialty } from "../entities/Specialty"; 
import { ISpecialty } from "../interfaces/Interfaces";
import { AppError } from "../utils/appError";

const specialtyRepository = AppDataSource.getRepository(Specialty);

export const getSpecialtyService = async () => {
  const specialty = await specialtyRepository.find({ relations: { doctors: true } });
    return specialty;
};

export const getIdSpecialtyService = async (id: string) => {
  const specialtyS = await specialtyRepository.findOne({
    where: { id },
    relations: { doctors: true },
  });
  return specialtyS;
};

export const postSpecialtyService = async (specialtyData: ISpecialty) => {
 const specialtyName = await specialtyRepository.findOne({ where: { name: specialtyData.name } });
 if (specialtyName) {
    throw new AppError('Especialidad ya registrada', 400);
  }
  const specialtyCreate = specialtyRepository.create(specialtyData);
  const specialty = await specialtyRepository.save(specialtyCreate);
  const specialtyRelation = await specialtyRepository.findOne({
    where: { id: specialty.id },
    relations: { doctors: true },
  });
  return specialtyRelation;

};
export const putSpecialtyService = async (id: string, specialtyData: Partial<ISpecialty>) => {
  const specialtyPut = await getIdSpecialtyService(id);
  if (!specialtyPut) {
    throw new AppError('Especialidad no encontrada', 404);
  }
  const upDate = specialtyRepository.merge(specialtyPut, specialtyData);
  const specialt = await specialtyRepository.save(upDate);
  return specialt;
};
export const deleteSpecialtyService = async (id: string) => {
  const specialtyDelete = await getIdSpecialtyService(id);
  if (!specialtyDelete) {
    throw new AppError('Especialidad no encontrada', 404);
  }
  const specialtyy = await specialtyRepository.remove(specialtyDelete);
  // return `Especialidad eliminada: ${JSON.stringify(specialtyy)}`;
  return {
    message: 'Especialidad eliminada',
    deletedSpecialty: specialtyy
  };

};