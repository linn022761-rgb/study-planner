import api from './api';

// Login API
export const loginUser = async (payload: {
  email: string;
  password: string;
}) => {
  const response = await api.post('/auth/login', payload);

  return response.data;
  // User Data ကိုပဲ ပြန်ယူမယ်
  // return response.data.data.user;
};

// Signup API
export const signupUser = async (payload: {
  name: string;
  email: string;
  password: string;
}) => {
  const response = await api.post('/auth/register', payload);

  //return response.data;
  return response.data.data.user;
};
