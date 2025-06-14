
import React, { useState } from 'react';
import { ChevronUp, ChevronDown, X, Sparkles, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import VitaminRow from './VitaminRow';
import { Supplement, Nutrient } from './MySupplements';

interface SupplementCardProps {
  supplement: Supplement;
  onUpdate: (supplement: Supplement) => void;
  onDelete: () => void;
  isChecked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

const SupplementCard = ({ supplement, onUpdate, onDelete, isChecked, onCheckedChange }: SupplementCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleIntelliAdd = () => {
    // Auto-populate common vitamins - in a real app, this would analyze the nutrition label
    const commonVitamins: Nutrient[] = [
      { id: Date.now().toString(), name: 'Vitamin C', amount: 30, unit: 'mg' },
      { id: (Date.now() + 1).toString(), name: 'Vitamin A', amount: 30, unit: 'mg' },
      { id: (Date.now() + 2).toString(), name: 'Vitamin D', amount: 30, unit: 'mg' }
    ];
    
    onUpdate({
      ...supplement,
      nutrients: [...supplement.nutrients, ...commonVitamins],
      servingSize: 1,
      servingUnit: 'capsule'
    });
  };

  const handleServingSizeChange = (value: string) => {
    onUpdate({
      ...supplement,
      servingSize: parseFloat(value) || 1
    });
  };

  const handleServingUnitChange = (value: string) => {
    onUpdate({
      ...supplement,
      servingUnit: value
    });
  };

  const handleNutrientUpdate = (nutrientId: string, updatedNutrient: Nutrient) => {
    onUpdate({
      ...supplement,
      nutrients: supplement.nutrients.map(n => 
        n.id === nutrientId ? updatedNutrient : n
      )
    });
  };

  const handleNutrientDelete = (nutrientId: string) => {
    onUpdate({
      ...supplement,
      nutrients: supplement.nutrients.filter(n => n.id !== nutrientId)
    });
  };

  const handleAddNutrient = () => {
    const newNutrient: Nutrient = {
      id: Date.now().toString(),
      name: 'Vitamin C',
      amount: 0,
      unit: 'mg'
    };
    
    onUpdate({
      ...supplement,
      nutrients: [...supplement.nutrients, newNutrient]
    });
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={isChecked}
              onCheckedChange={onCheckedChange}
            />
            <span className="font-medium">{supplement.name}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleIntelliAdd}
              className="w-8 h-8 text-purple-600 hover:text-purple-700"
            >
              <Sparkles className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onDelete}
              className="w-8 h-8 text-red-600 hover:text-red-700"
            >
              <X className="w-4 h-4" />
            </Button>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="icon" className="w-8 h-8">
                {isOpen ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </Button>
            </CollapsibleTrigger>
          </div>
        </div>
        
        <CollapsibleContent className="space-y-3">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Serving Size</span>
            <div className="flex items-center space-x-2">
              <Input
                type="number"
                value={supplement.servingSize}
                onChange={(e) => handleServingSizeChange(e.target.value)}
                className="w-24 h-8 text-sm"
                min="0.1"
                step="0.1"
              />
              <Select value={supplement.servingUnit} onValueChange={handleServingUnitChange}>
                <SelectTrigger className="w-36 h-8 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="capsule">capsules</SelectItem>
                  <SelectItem value="tablet">tablets</SelectItem>
                  <SelectItem value="ml">ml</SelectItem>
                  <SelectItem value="g">g</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            {supplement.nutrients.map((nutrient) => (
              <VitaminRow
                key={nutrient.id}
                nutrient={nutrient}
                onUpdate={(updatedNutrient) => handleNutrientUpdate(nutrient.id, updatedNutrient)}
                onDelete={() => handleNutrientDelete(nutrient.id)}
              />
            ))}
          </div>
          
          <div className="flex justify-center pt-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handleAddNutrient}
              className="rounded-full w-10 h-10 border-blue-300 hover:border-blue-400 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            >
              <Plus className="w-5 h-5" />
            </Button>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default SupplementCard;
