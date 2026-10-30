import { Link } from "react-router-dom";

const focusItems = [
  "Review lecture notes",
  "Practise React",
  "Prepare for exams",
];

export default function Home() {
  return (
    <section className="mx-auto grid min-h-[75vh] max-w-6xl items-center gap-10 py-8 md:grid-cols-2 md:gap-12">
      {/* Left: Welcome section */}
      <div>
        <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
          Your personal study space
        </span>

        <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
          Plan your study.
          <span className="mt-2 block text-blue-600">Reach your goals.</span>
        </h1>

        <p className="mt-5 max-w-lg text-base leading-7 text-slate-600 sm:text-lg">
          Organise your tasks, manage deadlines and track your learning progress
          in one simple place. Make every study session count.
        </p>

        {/* Navigation buttons */}
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-blue-700"
          >
            Get Started
            <span className="ml-2" aria-hidden="true">
              →
            </span>
          </Link>

          <Link
            to="/about"
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
          >
            Learn More
          </Link>
        </div>

        <p className="mt-6 text-sm text-slate-500">
          Start small. Stay consistent. Keep improving.
        </p>
      </div>

      {/* Right: Study preview card */}
      <div className="rounded-3xl bg-gradient-to-br from-blue-100 via-indigo-100 to-violet-100 p-5 sm:p-8">
        <div className="rounded-2xl border border-white/80 bg-white p-6 shadow-xl sm:p-8">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold tracking-[0.18em] text-blue-600">
                TODAY'S FOCUS
              </p>
              <h2 className="mt-2 text-2xl font-bold text-slate-900">
                Study plan
              </h2>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-2xl">
              📚
            </div>
          </div>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            A little progress every day adds up.
          </p>

          <div className="mt-6 space-y-3">
            {focusItems.map((item, index) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3 transition hover:border-blue-200 hover:bg-blue-50"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                  {index + 1}
                </span>

                <span className="text-sm font-medium text-slate-700">
                  {item}
                </span>
              </div>
            ))}
          </div>

          <Link
            to="/add-task"
            className="mt-6 flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            + Create a study task
          </Link>
        </div>
      </div>
    </section>
  );
}
