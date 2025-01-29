import { User } from '../entities/User';
import { AppDataSource } from '../config/dataSource';
import { AppError } from '../utils/appError';

const tokenRepository = AppDataSource.getRepository(User);

const getTokenService = async (userId: string) => {
  const userToken = await tokenRepository.findOne({
    where: { id: userId }
  });
  if(!userToken) {
    throw new AppError('Usuario no encontrado', 404);
  }
  return userToken;
};

export default getTokenService;