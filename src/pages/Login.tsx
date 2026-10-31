import { useMutation } from '@tanstack/react-query';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { loginUser } from '@/services/authApi';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

// 1. Zod Validation Schema
const loginSchema = z.object({
  email: z.string().trim().email('Please enter a valid email address'),

  password: z.string().min(1, 'Password is required'),
});

// 2. TypeScript Type
type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  // Remember the page user wanted to visit
  const from =
    (location.state as { from?: { pathname?: string } } | null)?.from
      ?.pathname || '/dashboard';

  // 3. React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // 4. React Query Mutation
  const loginMutation = useMutation({
    mutationFn: (values: LoginFormValues) =>
      loginUser(values.email, values.password),

    onSuccess: (user) => {
      localStorage.setItem('demoUser', JSON.stringify(user));

      navigate(from, { replace: true });
    },
  });

  // 5. Form Submit
  const onSubmit = (values: LoginFormValues) => {
    loginMutation.mutate(values);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>

          <p className="mt-2 text-gray-500">
            Login to your Study Planner account
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>

            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register('email')}
            />

            {errors.email && (
              <p className="text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>

            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              {...register('password')}
            />

            {errors.password && (
              <p className="text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          {/* API Error */}
          {loginMutation.isError && (
            <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {loginMutation.error.message}
            </p>
          )}

          {/* Login Button */}
          <Button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full"
          >
            {loginMutation.isPending ? 'Logging in...' : 'Login'}
          </Button>
        </form>

        {/* Signup Link */}
        <p className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <Link
            to="/signup"
            className="font-semibold text-blue-600 hover:underline"
          >
            Sign up
          </Link>
        </p>

        {/* Demo Account */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">Study Planner</p>

          <p className="mt-2 text-xs text-gray-400">
            Demo Account: demo@example.com
          </p>
        </div>
      </div>
    </div>
  );
}
