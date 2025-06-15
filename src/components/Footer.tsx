
import React from 'react';

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 px-4 py-3 sm:px-6 z-10">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500 gap-2 sm:gap-0">
        <p className="text-center sm:text-left">© 2025 IntelliDose. All rights reserved.</p>
        <p className="text-center sm:text-right">This app is under construction, do not enter any information you consider private.</p>
      </div>
    </footer>
  );
};

export default Footer;
