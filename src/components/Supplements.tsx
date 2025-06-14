
import React from 'react';
import { Pill, Plus } from 'lucide-react';

const Supplements = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-lg">
            <Pill className="w-5 h-5 text-green-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Supplements</h2>
        </div>
        <button className="flex items-center space-x-2 px-3 py-2 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors">
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">Add</span>
        </button>
      </div>
      
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center py-12">
          <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4">
            <Pill className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No supplements added yet</h3>
          <p className="text-gray-500 mb-4">Start by adding your first supplement to track your intake.</p>
          <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
            Add Your First Supplement
          </button>
        </div>
      </div>
    </div>
  );
};

export default Supplements;
