import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg text-center">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-blue-50 text-5xl">
          🔎
        </div>

        <p className="mt-8 text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
          Error 404
        </p>

        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Page not found
        </h1>

        <p className="mt-5 leading-7 text-slate-600">
          Oops! The page you're looking for doesn't exist or may have been
          moved. Let's help you get back on track.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            ← Back to Home
          </Link>

          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
