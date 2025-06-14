
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
            <h1 className="text-2xl font-bold text-gray-900">IntelliDose</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">Smart Supplement Tracking</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
