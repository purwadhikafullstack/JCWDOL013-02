import { HttpException } from '@/exceptions/httpException';
import { IFilterUser, IResultUser } from '@/interfaces/user.interface';
import { getUserByIDQuery, getUsersQuery } from '@/queries/user.query';
import { User } from '@prisma/client';

const getUsersAction = async (filters: IFilterUser): Promise<IResultUser> => {
  try {
    const users = await getUsersQuery(filters);
    return users;
  } catch (err) {
    throw err;
  }
};

const getUserByIDAction = async (id: string): Promise<User | null> => {
  try {
    const user = await getUserByIDQuery(id);

    if (!user) throw new HttpException(404, 'Data not found');

    return user;
  } catch (err) {
    throw err;
  }
};

export { getUserByIDAction, getUsersAction };
