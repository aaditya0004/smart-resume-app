import React from "react";
import { useState } from "react";
import axios from "axios";
import { renderResumeText } from "../utils/renderResume.jsx";

const SmartCustomizeForm = () => {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [customizedResumeText, setCustomizedResumeText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !jobDescription)
      return alert("Please upload a resume and paste the job description");

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo) return alert("Please log in to customize a resume.");

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobDesc", jobDescription);

    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/customize-resume`,
        formData,
        config
      );

      setCustomizedResumeText(data.customizedText);
    } catch (error) {
      alert("Something went wrong while customizing the resume");
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-md p-6 sm:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <form
          onSubmit={handleSubmit}
          className="space-y-4 lg:col-span-3 lg:sticky lg:top-8"
        >
          <div>
            <label
              htmlFor="resume-upload"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Upload Your Resume
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
          <div>
            <label
              htmlFor="job-description"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Paste Job Description
            </label>
            <textarea
              id="job-description"
              rows={12}
              placeholder="Paste the full job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition px-3 py-2"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#2563EB] text-white font-semibold px-5 py-2.5 rounded-lg shadow-sm hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Customizing..." : "✨ Customize with AI"}
          </button>
        </form>

        <div className="lg:col-span-9">
          <label className="block text-sm font-medium text-slate-700 mb-1">
            AI-Generated Preview
          </label>
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 h-full min-h-[300px] overflow-auto">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-slate-500 animate-pulse">
                  Generating your resume...
                </p>
              </div>
            ) : customizedResumeText ? (
              <div className="text-sm leading-relaxed">
                {renderResumeText(customizedResumeText, jobDescription)}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-slate-400">
                  Your customized resume will appear here.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartCustomizeForm;
