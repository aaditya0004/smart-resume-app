import { Link } from "react-router-dom";

const AnalyzeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-10 w-10 text-blue-600"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
);

const CustomizeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-10 w-10 text-blue-600"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.472-2.472a3.375 3.375 0 00-4.773-4.773L4.5 15.75l9.077-4.436z"
    />
  </svg>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-4xl mx-auto">
        {/* Header Text Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-800 tracking-tight">
            Elevate Your Resume with AI
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Get instant, data-driven feedback or tailor your resume to any job
            description in seconds.
          </p>
        </div>

        {/* Action Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Analyze Resume Card */}
          <Link
            to="/analyze"
            className="group bg-white p-8 rounded-xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-500 transition-all duration-300 ease-in-out"
          >
            <div className="flex items-start">
              <div className="bg-blue-100 p-3 rounded-lg">
                <AnalyzeIcon />
              </div>
              <div className="ml-6">
                <h2 className="text-xl font-semibold text-slate-800">
                  Analyze Resume
                </h2>
                <p className="mt-2 text-slate-500">
                  Upload your resume to get an instant AI-powered review and
                  score.
                </p>
              </div>
            </div>
          </Link>

          {/* Customize Resume Card */}
          <Link
            to="/customize"
            className="group bg-white p-8 rounded-xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-500 transition-all duration-300 ease-in-out"
          >
            <div className="flex items-start">
              <div className="bg-blue-100 p-3 rounded-lg">
                <CustomizeIcon />
              </div>
              <div className="ml-6">
                <h2 className="text-xl font-semibold text-slate-800">
                  Tailor to Job
                </h2>
                <p className="mt-2 text-slate-500">
                  Paste a job description to customize your resume for the
                  perfect fit.
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
