
import React, { useState, useEffect } from 'react';
import { Search, ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import SupplementCard from './SupplementCard';

export interface Nutrient {
  id: string;
  name: string;
  amount: number;
  unit: string;
}

export interface Supplement {
  id: string;
  name: string;
  servingSize: number;
  servingUnit: string;
  nutrients: Nutrient[];
}

interface MySupplementsProps {
  supplements: Supplement[];
  onAddSupplement: (supplement: Supplement) => void;
  onUpdateSupplement: (id: string, supplement: Supplement) => void;
  onDeleteSupplement: (id: string) => void;
  checkedSupplements: string[];
  onCheckedSupplementsChange: (checkedIds: string[]) => void;
  shouldExpand?: boolean;
  onExpansionComplete?: () => void;
}

const MySupplements = ({ 
  supplements, 
  onAddSupplement, 
  onUpdateSupplement, 
  onDeleteSupplement,
  checkedSupplements,
  onCheckedSupplementsChange,
  shouldExpand = false,
  onExpansionComplete
}: MySupplementsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (shouldExpand && !isOpen) {
      setIsOpen(true);
      onExpansionComplete?.();
    }
  }, [shouldExpand, isOpen, onExpansionComplete]);

  const filteredSupplements = supplements.filter(supplement => {
    const query = searchQuery.toLowerCase();
    return supplement.name.toLowerCase().includes(query) ||
           supplement.nutrients.some(nutrient => 
             nutrient.name.toLowerCase().includes(query)
           );
  });

  const handleCheckedChange = (supplementId: string, checked: boolean) => {
    if (checked) {
      onCheckedSupplementsChange([...checkedSupplements, supplementId]);
    } else {
      onCheckedSupplementsChange(checkedSupplements.filter(id => id !== supplementId));
    }
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between border-gray-300 hover:border-gray-400"
        >
          <span className="font-medium">My Supplements</span>
          {isOpen ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </Button>
      </CollapsibleTrigger>
      
      <CollapsibleContent className="mt-4 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-full"
          />
        </div>
        
        <div className="space-y-3">
          {filteredSupplements.map((supplement) => (
            <SupplementCard
              key={supplement.id}
              supplement={supplement}
              onUpdate={(updatedSupplement) => onUpdateSupplement(supplement.id, updatedSupplement)}
              onDelete={() => onDeleteSupplement(supplement.id)}
              isChecked={checkedSupplements.includes(supplement.id)}
              onCheckedChange={(checked) => handleCheckedChange(supplement.id, checked)}
            />
          ))}
          
          {filteredSupplements.length === 0 && supplements.length > 0 && (
            <div className="text-center py-4 text-gray-500">
              No supplements found matching "{searchQuery}"
            </div>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default MySupplements;
