
import React from 'react';
import { Activity } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
              <Activity className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-gray-900">IntelliDose</h1>
              <p className="text-sm text-gray-600">Your intelligent supplement companion</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <a 
              href="https://productunicorn.substack.com/p/intellidose-supplement-tracker" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
            >
              Help & Feedback
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
