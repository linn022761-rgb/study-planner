import axios, { AxiosHeaders, type AxiosAdapter } from 'axios';

export interface User {
  id: number;
  name: string;
  email: string;
}

interface DemoUser extends User {
  password: string;
}

const demoUsers: DemoUser[] = [
  {
    id: 1,
    name: 'Demo User',
    email: 'demo@example.com',
    password: 'password123',
  },
];

const mockAdapter: AxiosAdapter = async (config) => {
  const data = JSON.parse(config.data || '{}');

  let result;

  if (config.url === '/login') {
    const user = demoUsers.find(
      (item) => item.email === data.email && item.password === data.password,
    );

    result = user
      ? {
          success: true,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
        }
      : {
          success: false,
          message: 'Invalid email or password',
        };
  } else if (config.url === '/signup') {
    const exists = demoUsers.some((item) => item.email === data.email);

    if (exists) {
      result = {
        success: false,
        message: 'Email already exists',
      };
    } else {
      const newUser: DemoUser = {
        id: Date.now(),
        name: data.name,
        email: data.email,
        password: data.password,
      };

      demoUsers.push(newUser);

      result = {
        success: true,
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        },
      };
    }
  }

  return {
    data: result,
    status: 200,
    statusText: 'OK',
    headers: new AxiosHeaders(),
    config,
  };
};

const authApi = axios.create({
  baseURL: '/api',
  adapter: mockAdapter,
});

export async function loginUser(
  email: string,
  password: string,
): Promise<User> {
  const response = await authApi.post('/login', {
    email,
    password,
  });

  if (!response.data.success) {
    throw new Error(response.data.message);
  }

  return response.data.user;
}

export async function signupUser(
  name: string,
  email: string,
  password: string,
): Promise<User> {
  const response = await authApi.post('/signup', {
    name,
    email,
    password,
  });

  if (!response.data.success) {
    throw new Error(response.data.message);
  }

  return response.data.user;
}
