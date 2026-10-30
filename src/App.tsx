import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import Navbar from "@/components/Navbar";
import { TaskProvider } from "./context/TaskContent";
import { lazy, Suspense } from "react";

const DashboardLazy = lazy(() => import("./pages/Dashboard"));
const HomeLazy = lazy(() => import("./pages/Home"));
const TasksLazy = lazy(() => import("./pages/Tasks"));
const AddTaskLazy = lazy(() => import("./pages/AddTask"));
const AboutLazy = lazy(() => import("./pages/About"));
const NotFoundLazy = lazy(() => import("./pages/NotFound"));

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

export default function App() {
  return (
    <BrowserRouter>
      <TaskProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomeLazy />} />
            <Route path="dashboard" element={<DashboardLazy />} />
            <Route path="tasks" element={<TasksLazy />} />
            <Route path="add-task" element={<AddTaskLazy />} />
            <Route path="about" element={<AboutLazy />} />
            <Route path="*" element={<NotFoundLazy />} />
          </Route>
        </Routes>
      </TaskProvider>
    </BrowserRouter>
  );
}
