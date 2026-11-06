import api from './api';

export const loginUser = async (payload: {
  email: string;
  password: string;
}) => {
  const resopnse = await api.post('/auth/login', payload);

  return resopnse.data;
};

export const signupUser = async (payload: {
  email: string;
  password: string;
  name: string;
}) => {
  const resopnse = await api.post('/auth/register', payload);
  return resopnse.data;
};

export interface User {
  id: number;
  name: string;
  email: string;
}
