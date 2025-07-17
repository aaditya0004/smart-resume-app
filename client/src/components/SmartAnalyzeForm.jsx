import React from "react";
import { useState } from "react";
import axios from "axios";

// --- Helper Icons ---
const CheckIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 flex-shrink-0 text-green-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg> );
const CrossIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 flex-shrink-0 text-red-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg> );
const InfoIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 flex-shrink-0 text-blue-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>);


const SuggestionItem = ({ suggestion }) => {
  // Check for the "Replace 'A' with 'B'" format
  const replaceWithMatch = suggestion.match(/Replace '(.+?)' with '(.+?)'/i);
  if (replaceWithMatch) {
    const before = replaceWithMatch[1];
    const after = replaceWithMatch[2];
    return (
      <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
        <div className="flex items-start text-sm text-red-600">
          <span className="font-mono bg-red-100 p-1 rounded mr-2">-</span>
          <span className="line-through">{`'${before}'`}</span>
        </div>
        <div className="flex items-start text-sm text-green-700 mt-2">
          <span className="font-mono bg-green-100 p-1 rounded mr-2">+</span>
          <span>{`'${after}'`}</span>
        </div>
      </div>
    );
  }

  // Fallback for the "A → B" format
  if (suggestion.includes("→")) {
    const parts = suggestion.split("→");
    const before = parts[0].replace("Replace", "").trim();
    const after = parts[1].trim();

    return (
      <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
        <div className="flex items-center text-sm text-red-600">
          <span className="font-mono bg-red-100 p-1 rounded mr-2">-</span>
          <span className="line-through">{before}</span>
        </div>
        <div className="flex items-center text-sm text-green-700 mt-2">
          <span className="font-mono bg-green-100 p-1 rounded mr-2">+</span>
          <span>{after}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start text-slate-600">
      <InfoIcon />
      <span>{suggestion}</span>
    </div>
  );
};


const SmartAnalyzeForm = () => {
  const [file, setFile] = useState(null);
  const [aiFeedback, setAiFeedback] = useState(null);
  const [resumeText, setResumeText] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [showParsed, setShowParsed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please upload a PDF resume");
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if(!userInfo) return alert("Please log in to analyze a resume");

    const formData = new FormData();
    formData.append("resume", file);
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/resume/upload`,
        formData,
        config
      );
      setResumeText(data.resumeText);
      setAiFeedback(data.aiFeedback);
      setResumeUrl(data.resumeUrl);
    } catch (err) {
      console.error(err);
      alert("Something went wrong during analysis.");
    }
    setLoading(false);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-md p-6 sm:p-8">
      {/* Form Section */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
            <label htmlFor="resume-upload" className="block text-sm font-medium text-slate-700 mb-1">
                Upload your resume
            </label>
            <input
                id="resume-upload"
                type="file"
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files[0])}
                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                required
            />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#2563EB] text-white font-semibold px-5 py-2.5 rounded-lg shadow-sm hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>
      </form>

      {aiFeedback && (
        <div className="mt-8 pt-8 border-t border-slate-200">
            {aiFeedback.score && (
                <div className="mb-8">
                    <h3 className="text-xl font-semibold text-slate-800 mb-4">Score Breakdown</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
                        <div className="bg-slate-50 p-4 rounded-lg">
                            <div className="text-3xl font-bold text-blue-600">{aiFeedback.score.overall}/10</div>
                            <div className="text-sm font-medium text-slate-500 mt-1">Overall</div>
                        </div>
                        {Object.entries(aiFeedback.score).filter(([key]) => key !== 'overall').map(([key, value]) => (
                            <div key={key} className="bg-slate-50 p-4 rounded-lg">
                                <div className="text-2xl font-semibold text-slate-700">{value}/10</div>
                                <div className="text-sm text-slate-500 mt-1 capitalize">{key}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                    {aiFeedback.summary && <div className="mb-6">
                        <h3 className="text-lg font-semibold text-slate-700 mb-2">Summary</h3>
                        <p className="text-slate-600">{aiFeedback.summary}</p>
                    </div>}
                    
                    {aiFeedback.pros?.length > 0 && <div>
                        <h3 className="text-lg font-semibold text-slate-700 mb-2">What's Working Well (Pros)</h3>
                        <ul className="space-y-2">
                            {aiFeedback.pros.map((item, idx) => <li key={idx} className="flex"><CheckIcon /> <span className="text-slate-600">{item}</span></li>)}
                        </ul>
                    </div>}
                </div>

                <div>
                    {aiFeedback.cons?.length > 0 && <div className="mb-6">
                        <h3 className="text-lg font-semibold text-slate-700 mb-2">Areas for Improvement (Cons)</h3>
                        <ul className="space-y-2">
                            {aiFeedback.cons.map((item, idx) => <li key={idx} className="flex"><CrossIcon /> <span className="text-slate-600">{item}</span></li>)}
                        </ul>
                    </div>}

                    {aiFeedback.suggestions?.length > 0 && (
                        <div>
                            <h3 className="text-lg font-semibold text-slate-700 mb-3">
                                Actionable Suggestions
                            </h3>
                            <div className="space-y-3">
                                {aiFeedback.suggestions.map((item, idx) => (
                                    <SuggestionItem key={idx} suggestion={item} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
          
            <div className="text-center mt-10">
                <button
                    onClick={() => setShowParsed(!showParsed)}
                    className="bg-transparent text-[#2563EB] font-semibold py-2 px-4 rounded-lg border-2 border-[#2563EB] hover:bg-[#2563EB] hover:text-white transition-all duration-200"
                >
                    {showParsed ? "Hide Uploaded Resume" : "Show Uploaded Resume"}
                </button>
            </div>
        </div>
      )}

      {showParsed && (
        <div className="mt-8">
            <h3 className="font-semibold text-lg mb-2 text-slate-800">Uploaded Resume Preview</h3>
            {resumeUrl ? (
                <iframe src={resumeUrl} title="Uploaded Resume" allowFullScreen className="w-full h-[700px] border border-slate-200 rounded-lg shadow-md" />
            ) : (
                <div className="whitespace-pre-wrap bg-slate-50 font-mono text-sm text-slate-800 border border-slate-200 p-4 rounded-md overflow-auto max-h-[700px]">
                    {resumeText}
                </div>
            )}
        </div>
      )}
    </div>
  );
};

export default SmartAnalyzeForm;