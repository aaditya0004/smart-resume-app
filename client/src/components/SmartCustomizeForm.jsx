import React from "react";
import { useState } from "react";
import axios from "axios";
import { renderResumeText } from '../utils/renderResume.jsx'; 

const SmartCustomizeForm = () => {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [customizedResumeText, setCustomizedResumeText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !jobDescription)
      return alert("Please upload a resume and paste the job description");

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
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

  // const renderResumeText = (text, jobDescription) => {
  //   // ... all of your existing renderResumeText logic remains here ...
  //   const allLines = text
  //     .split("\n")
  //     .filter((line) => line.trim() !== "" && !line.includes("## RESUME ##"));
  //   let elements = [];
  //   let isHeader = true;
  //   const keywords = new Set(
  //     jobDescription
  //       .toLowerCase()
  //       .split(/[^a-zA-Z0-9]+/)
  //       .filter((word) => word.length > 3)
  //   );
  //   const highlightKeywords = (line) => {
  //     if (!jobDescription) return line;
  //     keywords.forEach((keyword) => {
  //       const regex = new RegExp(`\\b(${keyword})\\b`, "gi");
  //       line = line.replace(
  //         regex,
  //         `<span class="bg-yellow-200 font-medium rounded-sm px-1">$1</span>`
  //       );
  //     });
  //     return line;
  //   };
  //   let currentList = [];
  //   const flushList = () => {
  //     if (currentList.length > 0) {
  //       elements.push(
  //         <ul key={`ul-${elements.length}`} className="space-y-1.5 mt-1 pl-1">
  //           {currentList}
  //         </ul>
  //       );
  //       currentList = [];
  //     }
  //   };
  //   for (let i = 0; i < allLines.length; i++) {
  //     const line = allLines[i];
  //     const key = `line-${i}`;
  //     if (line.match(/^## (.*) ##$/)) {
  //       isHeader = false;
  //     }
  //     if (isHeader) {
  //       if (i === 0) {
  //         elements.push(
  //           <h1
  //             key={key}
  //             className="text-center text-3xl font-bold text-gray-800"
  //             dangerouslySetInnerHTML={{ __html: highlightKeywords(line) }}
  //           />
  //         );
  //       } else {
  //         elements.push(
  //           <p
  //             key={key}
  //             className="text-center text-sm text-gray-600 mt-1"
  //             dangerouslySetInnerHTML={{ __html: highlightKeywords(line) }}
  //           />
  //         );
  //       }
  //       continue;
  //     }
  //     if (line.match(/^## (.*) ##$/)) {
  //       flushList();
  //       const headingText = line.match(/^## (.*) ##$/)[1];
  //       elements.push(
  //         <h2
  //           key={key}
  //           className="text-sm font-bold tracking-widest text-gray-700 mt-6 mb-1 border-b-2 border-gray-200 pb-1"
  //         >
  //           {headingText}
  //         </h2>
  //       );
  //       continue;
  //     }
  //     const nextLine = i + 1 < allLines.length ? allLines[i + 1] : "";
  //     const isDateLine =
  //       nextLine.match(/^\d{4}\s*-\s*\d{4}$/) ||
  //       nextLine.match(/^\(?[A-Za-z]+\s\d{4}\)?$/);
  //     if (
  //       (line.includes("Bachelor") ||
  //         line.includes("Class") ||
  //         line.includes("Organizer") ||
  //         line.includes("Member")) &&
  //       isDateLine
  //     ) {
  //       elements.push(
  //         <div key={key} className="flex justify-between items-center mt-2">
  //           <p
  //             className="font-semibold text-gray-800"
  //             dangerouslySetInnerHTML={{
  //               __html: highlightKeywords(line.trim()),
  //             }}
  //           />
  //           <p className="text-sm text-gray-500 font-medium whitespace-nowrap pl-4">
  //             {nextLine.trim()}
  //           </p>
  //         </div>
  //       );
  //       i++;
  //       continue;
  //     }
  //     if (line.trim().startsWith("➤") || line.trim().startsWith("-")) {
  //       const bulletText = line.trim().substring(1).trim();
  //       currentList.push(
  //         <li key={key} className="flex items-start text-gray-700 ml-1 mt-1">
  //           <span className="font-bold text-blue-600 mr-3 mt-1">➤</span>
  //           <span
  //             dangerouslySetInnerHTML={{
  //               __html: highlightKeywords(bulletText),
  //             }}
  //           />
  //         </li>
  //       );
  //       continue;
  //     }
  //     if (line.includes(":") && line.length < 150) {
  //       flushList();
  //       const parts = line.split(/:(.+)/);
  //       elements.push(
  //         <p key={key} className="text-gray-700 mt-1">
  //           <span className="font-semibold">{parts[0].trim()}:</span>
  //           <span
  //             dangerouslySetInnerHTML={{
  //               __html: parts[1] ? highlightKeywords(parts[1].trim()) : "",
  //             }}
  //           />
  //         </p>
  //       );
  //       continue;
  //     }
  //     if (!line.trim().startsWith("- GPA:") && !line.trim().match(/- \d{4}/)) {
  //       flushList();
  //       elements.push(
  //         <p
  //           key={key}
  //           className="font-semibold text-gray-800 mt-3"
  //           dangerouslySetInnerHTML={{ __html: highlightKeywords(line.trim()) }}
  //         />
  //       );
  //     }
  //   }
  //   flushList();
  //   return elements;
  // };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-md p-6 sm:p-8">
      {/* CHANGED: Switched to a 12-column grid for more granular control */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* CHANGED: Form now takes 3 of 12 columns (25%) */}
        <form onSubmit={handleSubmit} className="space-y-4 lg:col-span-3 lg:sticky lg:top-8">
          <div>
            <label htmlFor="resume-upload" className="block text-sm font-medium text-slate-700 mb-1">
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
            <label htmlFor="job-description" className="block text-sm font-medium text-slate-700 mb-1">
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

        {/* CHANGED: Preview now takes 9 of 12 columns (75%) */}
        <div className="lg:col-span-9">
            <label className="block text-sm font-medium text-slate-700 mb-1">
                AI-Generated Preview
            </label>
            <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 h-full min-h-[300px] overflow-auto">
                {loading ? (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-slate-500 animate-pulse">Generating your resume...</p>
                    </div>
                ) : customizedResumeText ? (
                    <div className="text-sm leading-relaxed">
                        {renderResumeText(customizedResumeText, jobDescription)}
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-slate-400">Your customized resume will appear here.</p>
                    </div>
                )}
            </div>
        </div>

      </div>
    </div>
  );
};

export default SmartCustomizeForm;