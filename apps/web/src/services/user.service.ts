import instance from '@/utils/axiosInstance';

export const getUserByID = async (id: string) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await instance.get(`/users/${id}`, config);
    const user = data?.data;
    return user;
  } catch (err) {
    console.error(err);
  }
};

export const updateUser = async (id: string, formData: any) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await instance.patch(`/users/${id}`, formData, config);
    const user = data?.data;
    return user;
  } catch (err) {
    console.error(err);
  }
};
