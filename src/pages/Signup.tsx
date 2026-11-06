import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { signupUser } from '@/services/authApi';
import { useAuth } from '@/context/AuthContext';

import { Button } from '@/components/ui/button';
import TextInput from '@/components/forms/TextInput';
import { toast } from '@/components/ui/toast';


// 1. Validation Schema
const signupSchema = z
  .object({
    name: z.string().trim().min(2, 'Name must contain at least 2 characters'),

    email: z.string().trim().email('Please enter a valid email address'),

    password: z.string().min(12, 'Password must be at least 12 characters'),

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

  // 2. React Hook Form
  const form = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  // 3. React Query Mutation
  const mutation = useMutation({
    mutationFn: (data: SignupData) =>
      signupUser({
        name: data.name,
        email: data.email,
        password: data.password,
      }),
      

    // Signup Success
    onSuccess: (user) => {
      signup(user);

      toast.add({
        type: 'success',
        title: 'Signup Successful',
        description: 'Your account has been created successfully.',
        timeout: 3000,
      });

      navigate('/dashboard');
    },

    // Signup Error

    onError: (error: unknown) => {
      let message = 'Something went wrong. Please try again.';

      if (axios.isAxiosError(error)) {
        const status = error.response?.status;

        if (!error.response) {
          message = 'Please check your internet connection.';
        } else if (status === 409) {
          message = 'This email is already registered.';

          // Email Box ကို အနီရောင်ပြမယ်
          form.setError('email', {
            type: 'server',
            message,
          });
        } else if (status === 400 || status === 422) {
          message = 'Please check your information and try again.';
        } else if (status === 429) {
          message = 'Too many attempts. Please try again later.';
        } else if (status && status >= 500) {
          message = 'Server error. Please try again later.';
        }
      }

      toast.add({
        type: 'error',
        title: 'Signup Failed',
        description: message,
        timeout: 4000,
      });
    },
  });

  // 4. Submit
  const onSubmit = (data: SignupData) => {
    mutation.mutate(data);
  };

  // 5. UI
  return (
    <div className="mx-auto mt-12 max-w-md rounded-xl border bg-white p-8">
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

          <Button
            type="submit"
            className="w-full"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? 'Creating Account...' : 'Sign Up'}
          </Button>
        </form>
      </FormProvider>

      {/* Login Link */}
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
