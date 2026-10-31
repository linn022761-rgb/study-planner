import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { signupUser } from '@/services/authApi';
import { useAuth } from '@/context/AuthContext';

import { Button } from '@/components/ui/button';
import TextInput from '@/components/forms/TextInput';

const signupSchema = z
  .object({
    name: z.string().trim().min(2, 'Name must contain at least 2 characters'),
    email: z.string().trim().email('Invalid email address'),
    password: z.string().min(8, 'Password must contain at least 8 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type SignupData = z.infer<typeof signupSchema>;

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const form = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const mutation = useMutation({
    mutationFn: (data: SignupData) =>
      signupUser(data.name, data.email, data.password),

    onSuccess: (user) => {
      signup(user);
      navigate('/dashboard');
    },
  });

  const onSubmit = (data: SignupData) => {
    mutation.mutate(data);
  };

  return (
    <div className="mx-auto mt-12 max-w-md rounded-xl border p-8">
      <h1 className="mb-6 text-2xl font-bold">Create Account</h1>

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <TextInput label="Name" name="name" placeholder="Your name" />

          <TextInput
            label="Email"
            name="email"
            type="email"
            placeholder="Email"
          />

          <TextInput
            label="Password"
            name="password"
            type="password"
            placeholder="Password"
          />

          <TextInput
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="Confirm password"
          />

          {mutation.isError && (
            <p className="text-sm text-destructive">{mutation.error.message}</p>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? 'Creating Account...' : 'Sign Up'}
          </Button>
        </form>
      </FormProvider>

      <p className="mt-5 text-center text-sm">
        Already have an account?{' '}
        <button
          type="button"
          onClick={() => navigate('/login')}
          className="font-semibold text-primary hover:underline"
        >
          Login
        </button>
      </p>
    </div>
  );
}
