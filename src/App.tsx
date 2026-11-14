import { lazy, Suspense, useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
  useLocation,
} from 'react-router-dom';

import Navbar from './components/Navbar';
import { TaskProvider } from './context/TaskContent';
import { AuthProvider, useAuth } from './context/AuthContext';
import { getUserInfo } from './services/authApi';
import { useQuery } from '@tanstack/react-query';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Tasks = lazy(() => import('./pages/Tasks'));
const AddTask = lazy(() => import('./pages/AddTask'));
const NotFound = lazy(() => import('./pages/NotFound'));

function ProtectedRoute() {
  const { user } = useAuth();
  console.log('user: ', user);
  const token = localStorage.getItem('accessToken');
  const location = useLocation();

  if (!user || !token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

function PublicRoute() {
  const { user } = useAuth();
  const location = useLocation();

  if (user) {
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }
  return <Outlet />;
}

function Layout() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<p className="p-10 text-center">Loading...</p>}>
        <Outlet />
      </Suspense>
    </>
  );
}

export default function App() {
  const { setUser, user } = useAuth();
  const data = useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
  });

  useEffect(() => {
    if (data.data) {
      setUser(data.data);
    }
  }, [data.data, user]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/add-task" element={<AddTask />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
