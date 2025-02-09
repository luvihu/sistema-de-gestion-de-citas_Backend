import { User } from '../entities/User';
import { AppDataSource } from '../config/dataSource';
import { AppError } from '../utils/appError';

const tokenRepository = AppDataSource.getRepository(User);

const getTokenService = async (userId: string) => {
  const user = await tokenRepository.findOne({
    where: { id: userId },
    select: [ "id", "name", "email", "role" ]
  });
  if(!user) {
    throw new AppError('Usuario no encontrado', 404);
  }
  return user;
};

export default getTokenService;