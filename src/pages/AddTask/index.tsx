import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

import { taskSchema, type TaskFormData } from './taskSchema';
import { useTaskContext } from '../../context/TaskContent';
import { getTodayDateString } from './utils/getTodayDateString';
import TaskFields from './components/TaskFields';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { useMutation } from '@tanstack/react-query';
import { createTask } from '@/services/taskApi';
import { toast } from '@/components/ui/toast';

export default function AddTask() {
	const navigate = useNavigate();
	const minDueDate = getTodayDateString();

	const method = useForm<TaskFormData>({
		resolver: zodResolver(taskSchema),
		defaultValues: {
			title: '',
			subject: '',
			dueDate: '',
			priority: 'Medium',
		},
	});

	const addTaskMutation = useMutation({
		mutationKey: ['tasks'],
		mutationFn: createTask,
		onSuccess: () => {
			toast.add({
				type: 'success',
				title: 'Tasks Created',
				description: 'success',
				timeout: 3000,
			});
			method.reset();
			navigate('/tasks');
		},
		onError: (error) => {
			console.log(error);
			toast.add({
				type: 'error',
				title: 'Errors',
				description: error?.message,
				timeout: 3000,
			});
		},
	});

	function onSubmit(data: TaskFormData) {
		addTaskMutation.mutate(data);
	}

	return (
		<section className="mx-auto max-w-2xl">
			<div className="mb-6">
				<p className="text-sm font-medium text-primary">PLAN YOUR LEARNING</p>
				<h1 className="mt-2 text-3xl font-bold tracking-tight">Add New Task</h1>
				<p className="mt-2 text-muted-foreground">
					Organise your study tasks and keep track of deadlines.
				</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Task Details</CardTitle>
					<CardDescription>
						Fill in the information for your new study task.
					</CardDescription>
				</CardHeader>

				<CardContent>
					<FormProvider {...method}>
						<form
							onSubmit={method.handleSubmit(onSubmit)}
							className="space-y-5"
						>
							<TaskFields minDueDate={minDueDate} />

							<div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
								<Button
									type="button"
									variant="outline"
									onClick={() => navigate('/tasks')}
								>
									Cancel
								</Button>
								<Button type="submit">
									{addTaskMutation.isPending ? 'Submitting...' : 'Create Task'}
								</Button>
							</div>
						</form>
					</FormProvider>
				</CardContent>
			</Card>
		</section>
	);
}
