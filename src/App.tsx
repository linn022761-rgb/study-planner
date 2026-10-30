import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
  useLocation,
} from "react-router-dom";

import Navbar from "@/components/Navbar";
import { lazy, Suspense } from "react";

const DashboardLazy = lazy(() => import("./pages/Dashboard"));
const HomeLazy = lazy(() => import("./pages/Home"));
const TasksLazy = lazy(() => import("./pages/Tasks"));
const AddTaskLazy = lazy(() => import("./pages/AddTask"));
const AboutLazy = lazy(() => import("./pages/About"));
const NotFoundLazy = lazy(() => import("./pages/NotFound"));
import Login from "./pages/Login";

import { TaskProvider } from "./context/TaskContent";
import { lazy, Suspense } from "react";
import Home from "./pages/Home";


function Layout() {
  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Suspense fallback={<div>loading page...</div>}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
}

// Login မဝင်ရသေးရင် Login Page ကို ပို့မယ်
function RequireAuth() {
  const location = useLocation();
  const user = localStorage.getItem("demoUser");

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

export default function App() {
  return (
    <BrowserRouter>
      <TaskProvider>
        <Routes>
          <Route element={<Layout />}>
            {/* Login မလိုတဲ့ Pages */}
            <Route path="/" element={<HomeLazy />} />
            <Route path="/about" element={<AboutLazy />} />
            <Route path="/login" element={<Login />} />

            {/* Login ဝင်ပြီးမှ ဝင်ခွင့်ရှိတဲ့ Pages */}
            <Route element={<RequireAuth />}>
              <Route path="/dashboard" element={<DashboardLazy />} />
              <Route path="/tasks" element={<TasksLazy />} />
              <Route path="/add-task" element={<AddTaskLazy />} />
            </Route>

            <Route path="*" element={<NotFoundLazy />} />
          </Route>
        </Routes>
      </TaskProvider>
    </BrowserRouter>
  );
}
