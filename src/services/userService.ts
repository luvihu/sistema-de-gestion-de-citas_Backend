import jwt from 'jsonwebtoken';
import { User } from '../entities/User';
import { AppDataSource } from '../config/dataSource';
import { IUser }  from "../interfaces/Interfaces"
import { AppError } from '../utils/appError';
import { hashPassword, comparePasswords } from '../utils/passwordUtils';

const userRepository = AppDataSource.getRepository(User);

export const getUserService = async () => {
  const users = await userRepository.find({
      order: { name: 'ASC'},
    relations: { appointments: true }
  });
  return users;
}

export const getUserIdService = async (id: string) => {
  const userDelet = await userRepository.findOne({ 
    where: { id }, 
    relations: { appointments: true } 
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
  console.log('Iniciando registro:', userData);
  const [ existingUser, existingDni ] = await Promise.all([
    userRepository.findOne({ where: { email: userData.email } }),
    userRepository.findOne({ where: { dni: userData.dni } }),
  ]);
  console.log('Usuario existente:', existingUser);
  console.log('DNI existente:', existingDni);
  if (existingUser) throw new AppError('El usuario ya existe', 400);
  if (existingDni) throw new AppError('El DNI ya existe', 400);
  
  const newHashPassword = await hashPassword(userData.password);
   // Creamos el nuevo usuario
  const newUser = userRepository.create({
    ...userData,
    password: newHashPassword,
    role: userData.role === 'ADMIN' ? 'ADMIN' : 'USER',
  });
  await userRepository.save(newUser);
  return newUser;
};

export const loginUserService = async (email: string, password: string) => {
  const userLog = await userRepository.findOne({ where: { email } });
  if (!userLog) {
    throw new AppError('Usuario no encontrado', 401);
  };
  const userPassw = await comparePasswords(password, userLog.password);
 if (!userPassw) {
  throw new AppError('Contraseña incorrecta', 401);
  };
  const token = jwt.sign(
    { userId: userLog.id, role: userLog.role }, 
    'secret_key', 
    { expiresIn: '12h' }
  );
      return { userLog, token };
}


