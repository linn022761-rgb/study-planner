import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { signupUser } from '@/services/authApi';
import { useAuth } from '@/context/AuthContext';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const signupSchema = z
  .object({
    name: z.string().trim().min(2, 'Name must contain at least 2 characters'),
    email: z.string().trim().email('Invalid email address'),
    password: z.string().min(8, 'Password must contain at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type SignupData = z.infer<typeof signupSchema>;

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: SignupData) =>
      signupUser(data.name, data.email, data.password),

    onSuccess: (user) => {
      signup(user);
      navigate('/dashboard');
    },
  });

  return (
    <div className="mx-auto mt-12 max-w-md rounded-xl border p-8">
      <h1 className="mb-6 text-2xl font-bold">Create Account</h1>

      <form
        onSubmit={handleSubmit((data) => mutation.mutate(data))}
        className="space-y-4"
      >
        <div className="space-y-2">
          <Label>Name</Label>
          <Input {...register('name')} placeholder="Your name" />
          <p className="text-sm text-destructive">{errors.name?.message}</p>
        </div>

        <div className="space-y-2">
          <Label>Email</Label>
          <Input {...register('email')} type="email" placeholder="Email" />
          <p className="text-sm text-destructive">{errors.email?.message}</p>
        </div>

        <div className="space-y-2">
          <Label>Password</Label>
          <Input
            {...register('password')}
            type="password"
            placeholder="Password"
          />
          <p className="text-sm text-destructive">{errors.password?.message}</p>
        </div>

        <div className="space-y-2">
          <Label>Confirm Password</Label>
          <Input
            {...register('confirmPassword')}
            type="password"
            placeholder="Confirm password"
          />
          <p className="text-sm text-destructive">
            {errors.confirmPassword?.message}
          </p>
        </div>

        {mutation.isError && (
          <p className="text-sm text-destructive">{mutation.error.message}</p>
        )}

        <Button type="submit" className="w-full" disabled={mutation.isPending}>
          {mutation.isPending ? 'Creating Account...' : 'Sign Up'}
        </Button>
      </form>

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
