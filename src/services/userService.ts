import jwt from 'jsonwebtoken';
import { User } from '../entities/User';
import { Doctor } from '../entities/Doctor';
import { AppDataSource } from '../config/dataSource';
import { IUser }  from "../interfaces/Interfaces"
import { AppError } from '../utils/appError';
import { hashPassword, comparePasswords } from '../utils/passwordUtils';

const userRepository = AppDataSource.getRepository(User);
const doctorRepository = AppDataSource.getRepository(Doctor);

export const getUserService = async () => {
  const users = await userRepository.find({
      order: { name: 'ASC'},
    relations: { appointments: { doctor: { specialty: true } } },
    });
  return users;
}

export const getUserIdService = async (id: string) => {
  const userDelet = await userRepository.findOne({ 
    where: { id }, 
    relations: { 
      appointments: { doctor: { specialty: true } }
    },
    
  });
  if (!userDelet) {
    throw new AppError('Usuario no ubicado',404);
  };
  return userDelet;
 }

export const deleteUserService = async (id: string) => {
 const userDelet = await getUserIdService(id);
 if (!userDelet) {
  throw new AppError('Usuario no encontrado',404);
 }
 const deleteUser = await userRepository.remove(userDelet);
  return {
    message: 'Usuario eliminado',
    userDelete: deleteUser
  }
}

export const putUserService = async (id: string, userData: Partial<IUser>) => {
 const userP = await getUserIdService(id);
 const updateUs = userRepository.merge(userP, userData);
 const userUpdate = await userRepository.save(updateUs);
 return userUpdate;
};

export const registerUserService = async (userData: IUser) => {
  // Limpieza y normalización de datos
  const normalizedData = {
    name: userData.name.trim(),
    lastname: userData.lastname.trim(),
    dni: userData.dni.trim(),
    telephone: userData.telephone.trim(),
    photo_profile: userData.photo_profile?.trim(),
    email: userData.email.trim().toLowerCase(),
  };

  // Validaciones en paralelo
  const [existingUser, existingDni ] = await Promise.all([
    userRepository.findOne({ where: { email: normalizedData.email } }),
    userRepository.findOne({ where: { dni: normalizedData.dni } }),
      ]);

  // Validaciones de negocio
  if (existingUser) throw new AppError('El usuario ya existe', 400);
  if (existingDni) throw new AppError('El DNI ya existe', 409);
   
  const hashedPassword = await hashPassword(userData.password);

  const newUser = userRepository.create({
    ...normalizedData,
    password: hashedPassword,
    role: userData.role === 'ADMIN' ? 'ADMIN' : 'USER',
  });

   // Guardado y retorno con relaciones
  const savedUser = await userRepository.save(newUser);

 const newUserRepo = await userRepository.findOne({
    where: { id: savedUser.id },
    relations: { 
       appointments: { doctor: { specialty: true } }
    }
  });
  return newUserRepo;
};


export const loginUserService = async (cleanEmail: string, password: string) => {
  const user = await userRepository.findOne({ where: { email: cleanEmail } });
  if (!user) {
    throw new AppError('Usuario no encontrado', 404);
  };
  const userPassw = await comparePasswords(password, user.password);
 if (!userPassw) {
  throw new AppError('Contraseña incorrecta', 401);
  };
  const token = jwt.sign(
    { userId: user.id, role: user.role }, 
    process.env.JWT_SECRET as string, 
    { expiresIn: '24h' }
  );
    return { user, token, role: user.role };
}

