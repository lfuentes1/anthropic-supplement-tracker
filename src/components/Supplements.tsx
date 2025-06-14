import React, { useState } from 'react';
import { Pill } from 'lucide-react';
import AddSupplementForm from './AddSupplementForm';
import MySupplements, { Supplement } from './MySupplements';

interface SupplementsProps {
  onActiveSupplementsChange?: (activeSupplements: Supplement[]) => void;
}

const Supplements = ({ onActiveSupplementsChange }: SupplementsProps) => {
  const [supplements, setSupplements] = useState<Supplement[]>([]);
  const [checkedSupplements, setCheckedSupplements] = useState<string[]>([]);
  const [shouldExpandMySupplements, setShouldExpandMySupplements] = useState(false);

  const handleAddSupplementFromForm = (supplementName: string) => {
    const newSupplement: Supplement = {
      id: Date.now().toString(),
      name: supplementName,
      servingSize: 1,
      servingUnit: 'capsule',
      nutrients: []
    };
    
    setSupplements(prev => [...prev, newSupplement]);
    setShouldExpandMySupplements(true);
    console.log('Added supplement:', supplementName);
  };

  const handleAddSupplement = (supplement: Supplement) => {
    setSupplements(prev => [...prev, supplement]);
  };

  const handleUpdateSupplement = (id: string, updatedSupplement: Supplement) => {
    setSupplements(prev => prev.map(s => s.id === id ? updatedSupplement : s));
  };

  const handleDeleteSupplement = (id: string) => {
    setSupplements(prev => prev.filter(s => s.id !== id));
    setCheckedSupplements(prev => prev.filter(checkedId => checkedId !== id));
  };

  const handleCheckedSupplementsChange = (checkedIds: string[]) => {
    setCheckedSupplements(checkedIds);
    
    // Get active supplements and pass to parent
    const activeSupplements = supplements.filter(s => checkedIds.includes(s.id));
    onActiveSupplementsChange?.(activeSupplements);
  };

  const handleExpansionComplete = () => {
    setShouldExpandMySupplements(false);
  };

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
      
      <div className="space-y-4">
        <AddSupplementForm onAddSupplement={handleAddSupplementFromForm} />
        
        <MySupplements
          supplements={supplements}
          onAddSupplement={handleAddSupplement}
          onUpdateSupplement={handleUpdateSupplement}
          onDeleteSupplement={handleDeleteSupplement}
          checkedSupplements={checkedSupplements}
          onCheckedSupplementsChange={handleCheckedSupplementsChange}
          shouldExpand={shouldExpandMySupplements}
          onExpansionComplete={handleExpansionComplete}
        />
      </div>
      
      {supplements.length === 0 && (
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
      )}
    </div>
  );
};

export default Supplements;
