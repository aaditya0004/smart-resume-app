import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto">
      <div className="w-[90%] max-w-screen-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center text-slate-500">
        

        {/* Copyright Notice */}
        <p className="text-sm mb-2">
          &copy; {new Date().getFullYear()} SmartResume. All Rights Reserved.
        </p>

        {/* AI Disclaimer */}
        <p className="text-xs text-slate-400">
          Disclaimer: SmartResume is an AI-powered tool and can make mistakes. Please review and verify all generated content.
        </p>
        
      </div>
    </footer>
  );
};

export default Footer;