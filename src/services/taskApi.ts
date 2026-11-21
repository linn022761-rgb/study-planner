import type { NewTask } from '@/context/TaskContent';
import api from './api';

export const getAllTasks = async () => {
	const response = await api.get('/tasks');
	return response?.data;
};

export const getByTasksId = async (id: string) => {
	const response = await api.get(`/tasks/${id}`);
	return response?.data;
};

export const updateByTaskId = async (id: string) => {
	const response = await api.patch(`/tasks/${id}`);
	return response?.data;
};

export const deleteByTaskId = async (id: string) => {
	const response = await api.delete(`/tasks/${id}`);
	return response?.data;
};

export const createTask = async (payload: NewTask) => {
	const response = await api.post('/tasks', payload);
	return response?.data;
};
