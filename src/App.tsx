import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import Navbar from "@/components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import AddTask from "./pages/AddTask";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import { TaskProvider } from "./context/TaskContent";

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

export default function App() {
  return (
    <BrowserRouter>
      <TaskProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="add-task" element={<AddTask />} />
            <Route path="about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </TaskProvider>
    </BrowserRouter>
  );
}
