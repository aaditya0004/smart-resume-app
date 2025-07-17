import React from "react";
import SmartCustomizeForm from "../components/SmartCustomizeForm";
import { Link } from "react-router-dom";

const HistoryIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 mr-2"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const CustomizePage = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="w-[80%] max-w-screen-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between mb-10 pb-5 border-b border-slate-200">
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">
              Smart Resume Customizer
            </h1>
            <p className="mt-2 text-lg text-slate-500">
              Tailor your resume to any job description in seconds with AI
              assistance.
            </p>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <Link
              to="/profile"
              className="flex items-center bg-white border border-slate-300 text-slate-700 font-semibold px-4 py-2 rounded-lg shadow-sm hover:bg-slate-100 transition-colors"
            >
              <HistoryIcon />
              View History
            </Link>
          </div>
        </div>

        <SmartCustomizeForm />
      </div>
    </div>
  );
};

export default CustomizePage;
