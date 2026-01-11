import { AxiosResponse } from 'axios';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  department?: string;
  age: number;
  city: string;
  state: string;
  postCode: string;
}

export const userApi: {
  getAll: () => Promise<AxiosResponse<User[]>>;
  getById: (id: number) => Promise<AxiosResponse<User>>;
  create: (user: Omit<User, 'id'>) => Promise<AxiosResponse<User>>;
  update: (id: number, user: Partial<User>) => Promise<AxiosResponse<User>>;
  delete: (id: number) => Promise<AxiosResponse<void>>;
};

declare const api: any;
export default api;
