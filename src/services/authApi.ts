import api from './api';

// Login API
export const loginUser = async (payload: {
	email: string;
	password: string;
}) => {
	const response = await api.post('/auth/login', payload, {
		withCredentials: true,
	});

	return response;
	// User Data ကိုပဲ ပြန်ယူမယ်
	// return response.data.data.user;
};

// Signup API
export const signupUser = async (payload: {
	name: string;
	email: string;
	password: string;
}) => {
	const response = await api.post('/auth/register', payload, {
		withCredentials: true,
	});

	//return response.data;
	return response.data.user;
};

// Get User Info API
export const getUserInfo = async () => {
	const response = await api.get('/auth/me');
	return response.data;
};

export const refreshToken = async () => {
	const response = await api.post(
		'/auth/refresh',
		{},
		{ withCredentials: true },
	);
	return response.data;
};
