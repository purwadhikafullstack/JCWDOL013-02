export type User = {
  id?: string;
  name?: string;
  email?: string;
  image?: string;
  phone?: string;
  gender?: string;
  birthDate?: string;
  isVerified?: boolean;
  role?: string;
};

declare global {
  namespace Express {
    export interface Request {
      user?: User;
    }
  }
}
