import React from "react";
import SmartAnalyzeForm from "../components/SmartAnalyzeForm";

const AnalyzePage = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">
            Smart Resume Analyzer
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-slate-500">
            Get instant, data-driven feedback on your resume's strengths and weaknesses.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
           <SmartAnalyzeForm />
        </div>

      </div>
    </div>
  );
};

export default AnalyzePage;