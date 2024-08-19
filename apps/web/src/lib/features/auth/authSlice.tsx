import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { IUserProfile, IUsers } from '@/interfaces/user.interface';
import parseJWT from '@/utils/parseJwt';
import instance from '@/utils/axiosInstance';

type User = {
  id?: string;
  name?: string;
  email?: string;
  image?: string;
  phone?: string;
  gender?: string;
  birthDate?: string;
};

type Status = {
  isLogin: boolean;
  error?: string;
};

interface Auth {
  user: User;
  status: Status;
}

const initialState: Auth = {
  user: {
    id: '',
    name: '',
    email: '',
    image: '',
    phone: '',
    gender: '',
    birthDate: '',
  },
  status: {
    isLogin: false,
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginState: (state: Auth, action: PayloadAction<User>) => {
      const user = action.payload;
      state.user = user;
      state.status.isLogin = true;
    },
    logoutState: (state: Auth) => {
      state.user = initialState.user;
      state.status = initialState.status;
    },
    tokenValidState: (state: Auth, action: PayloadAction<User>) => {
      const user = action.payload;
      state.user = user;
      state.status.isLogin = true;
    },
    updateProfileState: (state: Auth, action: PayloadAction<IUserProfile>) => {
      if (action.payload.name) state.user.name = action.payload.name;
      if (action.payload.email) state.user.email = action.payload.email;
      if (action.payload.phone) state.user.phone = action.payload.phone;
      if (action.payload.gender) state.user.gender = action.payload.gender;
      if (action.payload.birthDate)
        state.user.birthDate = action.payload.birthDate;
    },
    updateAvatarState: (state: Auth, action: PayloadAction<string>) => {
      state.user.image = action.payload;
    },
  },
});

export const signIn = (params: IUsers) => async (dispatch: Dispatch) => {
  try {
    const { email, password } = params;
    const { data } = await instance.post('/auth/login', {
      email,
      password,
    });
    const user = data?.data.user;
    dispatch(
      loginState({
        id: user?.id,
        name: user?.name,
        email: user?.email,
        image: user?.image,
        phone: user?.phone,
        gender: user?.gender,
        birthDate: user?.birthDate,
      }),
    );

    localStorage.setItem('token', data?.data.token);
    localStorage.setItem('user', JSON.stringify(user));

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const signOut = () => async (dispatch: Dispatch) => {
  try {
    dispatch(logoutState());
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  } catch (err) {
    console.error(err);
  }
};

export const checkToken = (token: string) => async (dispatch: Dispatch) => {
  try {
    if (!token) throw new Error('Token not found');

    const { data } = await instance.get('/auth', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const payload = await parseJWT(data?.data);
    const user = data?.data.user;

    if (!user?.id) throw new Error('User not found');

    dispatch(
      tokenValidState({
        id: user?.id,
        name: user?.name,
        email: user?.email,
        image: user?.image,
        phone: user?.phone,
        gender: user?.gender,
        birthDate: user?.birthDate,
      }),
    );

    localStorage.setItem('token', data?.data.token);
    localStorage.setItem('user', JSON.stringify(user));

    return user;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const {
  loginState,
  logoutState,
  tokenValidState,
  updateProfileState,
  updateAvatarState,
} = authSlice.actions;

export default authSlice.reducer;
