
import { Link } from "react-router-dom";

const features = [
  {
    number: "01",
    title: "Organise Tasks",
    description:
      "Keep your study tasks in one place and organise what you need to do.",
    icon: "📝",
  },
  {
    number: "02",
    title: "Manage Deadlines",
    description:
      "Set due dates and priorities so you can focus on important tasks first.",
    icon: "📅",
  },
  {
    number: "03",
    title: "Track Progress",
    description:
      "See completed and pending tasks to understand your study progress.",
    icon: "📊",
  },
];

export default function About() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Page heading */}
      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
          About our project
        </span>

        <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Make studying
          <span className="block text-blue-600">simpler and smarter.</span>
        </h1>

        <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
          LIGHT Study Planner helps students organise study tasks, manage
          deadlines and keep track of their learning progress in one place.
        </p>
      </div>

      {/* Project purpose */}
      <div className="mt-12 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-7 text-white shadow-lg sm:p-10">
        <h2 className="text-2xl font-bold sm:text-3xl">
          Our Purpose
        </h2>

        <p className="mt-4 max-w-3xl leading-7 text-blue-50">
          Managing assignments, revision and deadlines can be challenging.
          This planner provides a simple space to record tasks, check what
          needs attention and build consistent study habits.
        </p>
      </div>

      {/* Features */}
      <div className="mt-14">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            What You Can Do
          </h2>
          <p className="mt-3 text-slate-600">
            Useful tools to help you manage your study routine.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.number}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl">
                {feature.icon}
              </div>

              <p className="mt-5 text-sm font-bold text-blue-600">
                {feature.number}
              </p>

              <h3 className="mt-2 text-xl font-bold text-slate-900">
                {feature.title}
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>

      {/* Call to action */}
      <div className="mt-14 rounded-2xl border border-slate-200 bg-slate-50 p-7 text-center sm:p-10">
        <h2 className="text-2xl font-bold text-slate-900">
          Ready to organise your study tasks?
        </h2>

        <p className="mt-3 text-slate-600">
          Start planning your next study session today.
        </p>

        <Link
          to="/dashboard"
          className="mt-6 inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Go to Dashboard →
        </Link>
      </div>
    </section>
  );
}
