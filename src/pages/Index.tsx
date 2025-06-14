
import React, { useState } from 'react';
import Header from '../components/Header';
import Supplements from '../components/Supplements';
import IntakeTracker from '../components/IntakeTracker';
import Insights from '../components/Insights';
import { Supplement } from '../components/MySupplements';

const Index = () => {
  const [activeSupplements, setActiveSupplements] = useState<Supplement[]>([]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-120px)]">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <Supplements onActiveSupplementsChange={setActiveSupplements} />
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <IntakeTracker activeSupplements={activeSupplements} />
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <Insights />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
