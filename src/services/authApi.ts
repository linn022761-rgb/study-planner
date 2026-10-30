
import axios, { AxiosHeaders, type AxiosAdapter } from "axios";

export interface User {
  id: number;
  email: string;
}

const demoUsers = [
  {
    id: 1,
    email: "demo@example.com",
    password: "password123",
  },
];

const mockAdapter: AxiosAdapter = async (config) => {
  const { email, password } = JSON.parse(config.data || "{}");

  const user = demoUsers.find(
    (item) => item.email === email && item.password === password
  );

  return {
    data: user
      ? {
          success: true,
          user: {
            id: user.id,
            email: user.email,
          },
        }
      : {
          success: false,
          message: "Invalid email or password",
        },
    status: 200,
    statusText: "OK",
    headers: new AxiosHeaders(),
    config,
  };
};

const authApi = axios.create({
  baseURL: "/api",
  adapter: mockAdapter,
});

export async function loginUser(
  email: string,
  password: string
): Promise<User> {
  const response = await authApi.post("/login", {
    email,
    password,
  });

  if (!response.data.success) {
    throw new Error(response.data.message);
  }

  return response.data.user;
}
