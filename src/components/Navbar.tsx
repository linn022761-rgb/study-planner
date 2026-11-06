import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const links: {
  to: string;
  label: string;
  end?: boolean;
  requiresAuth?: boolean;
}[] = [
  { to: '/', label: 'Home', end: true },
  { to: '/dashboard', label: 'Dashboard', requiresAuth: true },
  { to: '/tasks', label: 'My Tasks', requiresAuth: true },
  { to: '/add-task', label: 'Add Task', requiresAuth: true },
  { to: '/about', label: 'About' },
 
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/', { replace: true });
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
      <nav className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="w-fit text-xl font-extrabold tracking-tight text-blue-700"
        >
          LIGHT
          <span className="ml-1 font-semibold text-slate-800">
            Study Planner
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex flex-wrap items-center gap-2">
          {links
            .filter((link) => !link.requiresAuth || user)
            .map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  [
                    'rounded-lg px-3 py-2 text-sm font-semibold transition-colors',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-blue-50 hover:text-blue-700',
                  ].join(' ')
                }
              >
                {link.label}
              </NavLink>
            ))}

          {/* Login / Logout */}
          {user ? (
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
