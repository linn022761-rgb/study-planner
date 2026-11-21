import axios, { type InternalAxiosRequestConfig } from 'axios';
import { refreshToken } from './authApi';

const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
	// Token ကို localStorage မှာ သိမ်းထားတာကို ရယူမယ်
	const token = localStorage.getItem('accessToken');

	if (token && config.headers) {
		config.headers['Authorization'] = `Bearer ${token}`;
	}
	return config;
});

api.interceptors.response.use(
	(response) => {
		console.log(response);
		return response.data;
	},
	async (error) => {
		console.error('API Error:', error?.response);
		if (
			error?.response?.status === 401 &&
			error?.response?.data?.status_message === 'JWT_EXPIRED'
		) {
			try {
				const data = await refreshToken();
				const newToken = data.accessToken;
				localStorage.setItem('accessToken', newToken);
				// Retry the original request with the new token
				const originalRequest = error.config;
				originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
				return api(originalRequest);
			} catch (error) {
				console.error(error);
			}
		}
		return error?.response?.data;
	},
);

export default api;
