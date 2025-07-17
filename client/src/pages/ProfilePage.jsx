import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { renderResumeText } from "../utils/renderResume.jsx"; // 👈 Import our shared function

const ResultModal = ({ isOpen, onClose, item }) => {
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-xl font-semibold text-slate-800">
            {item.originalFileName}
          </h3>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-800"
          >
            &times;
          </button>
        </div>
        <div className="p-6 overflow-y-auto">
          {item.customizedText && (
            <div className="text-sm leading-relaxed">
              {renderResumeText(item.customizedText)}
            </div>
          )}
          {item.aiFeedback && <FeedbackDisplay feedback={item.aiFeedback} />}
        </div>
        <div className="p-4 border-t bg-slate-50 text-right">
          <button
            onClick={onClose}
            className="bg-slate-200 text-slate-800 px-4 py-2 rounded-lg hover:bg-slate-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const FeedbackDisplay = ({ feedback }) => (
  <div className="space-y-4">
    {feedback.summary && (
      <div>
        <h4 className="font-semibold">Summary</h4>
        <p>{feedback.summary}</p>
      </div>
    )}
    {feedback.score && (
      <div>
        <h4 className="font-semibold">Overall Score</h4>
        <p className="text-2xl font-bold text-blue-600">
          {feedback.score.overall}/10
        </p>
      </div>
    )}
    {feedback.pros?.length > 0 && (
      <div>
        <h4 className="font-semibold">Pros</h4>
        <ul className="list-disc list-inside">
          {feedback.pros.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
      </div>
    )}
    {feedback.cons?.length > 0 && (
      <div>
        <h4 className="font-semibold">Cons</h4>
        <ul className="list-disc list-inside">
          {feedback.cons.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      </div>
    )}
  </div>
);

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (!userInfo || !userInfo.token) {
        navigate("/login");
        return;
      }
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/users/profile`,
          config
        );
        setProfile(data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        localStorage.removeItem("userInfo");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [navigate]);

  const openModalWithItem = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  if (loading)
    return <div className="text-center p-10">Loading profile...</div>;

  return (
    <>
      <div className="bg-slate-50 min-h-screen">
        <div className="w-[80%] max-w-screen-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between mb-8 pb-4 border-b border-slate-200">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">My Profile</h1>
              {profile && (
                <p className="text-slate-600 mt-1">
                  Welcome back, {profile.name}
                </p>
              )}
            </div>
            <button
              onClick={logoutHandler}
              className="bg-white border border-slate-300 text-slate-700 font-semibold px-4 py-2 rounded-lg shadow-sm hover:bg-slate-100 transition-colors"
            >
              Logout
            </button>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-slate-700">
              My Activity History
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {profile && profile.history.length > 0 ? (
                profile.history.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 flex flex-col justify-between"
                  >
                    <div>
                      <span
                        className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                          item.customizedText
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {item.customizedText
                          ? "Customized Resume"
                          : "AI Analysis"}
                      </span>
                      <h3 className="font-semibold text-lg text-slate-800 mt-3 truncate">
                        {item.originalFileName}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={() => openModalWithItem(item)}
                      className="mt-4 w-full bg-slate-100 text-slate-700 font-semibold py-2 rounded-md hover:bg-slate-200 transition-colors"
                    >
                      View Result
                    </button>
                  </div>
                ))
              ) : (
                <div className="col-span-full bg-white p-8 rounded-lg text-center text-slate-500">
                  <h3 className="text-xl font-semibold">No Activity Yet</h3>
                  <p className="mt-2">
                    Your analyzed and customized resumes will appear here.
                  </p>
                  <Link
                    to="/customize"
                    className="mt-4 inline-block bg-[#2563EB] text-white font-semibold px-5 py-2.5 rounded-lg shadow-sm hover:bg-blue-700"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ResultModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={selectedItem}
      />
    </>
  );
};

export default ProfilePage;
