
import React from 'react';
import { Pill, Plus } from 'lucide-react';
import AddSupplementForm from './AddSupplementForm';

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
      </div>
      
      <div className="mb-6">
        <AddSupplementForm />
      </div>
      
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center py-12">
          <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4">
            <Pill className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No supplements added yet</h3>
          <p className="text-gray-500 mb-4">Start by adding your first supplement to track your intake.</p>
          <p className="text-sm text-gray-400">
            Use the "Add Supplement" form above to get started
          </p>
        </div>
      </div>
    </div>
  );
};

export default Supplements;
