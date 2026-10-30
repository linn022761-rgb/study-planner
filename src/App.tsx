import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
  useLocation,
} from "react-router-dom";

import Navbar from "@/components/Navbar";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import AddTask from "./pages/AddTask";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";

import { TaskProvider } from "./context/TaskContent";

// Shared Layout
function Layout() {
  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Outlet />
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
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />

            {/* Login ဝင်ပြီးမှ ဝင်ခွင့်ရှိတဲ့ Pages */}
            <Route element={<RequireAuth />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/add-task" element={<AddTask />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </TaskProvider>
    </BrowserRouter>
  );
}
