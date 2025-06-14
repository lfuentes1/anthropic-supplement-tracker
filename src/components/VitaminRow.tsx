
import React from 'react';
import { X, ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Nutrient } from './MySupplements';

interface VitaminRowProps {
  nutrient: Nutrient;
  onUpdate: (nutrient: Nutrient) => void;
  onDelete: () => void;
}

const VitaminRow = ({ nutrient, onUpdate, onDelete }: VitaminRowProps) => {
  const handleNameChange = (value: string) => {
    onUpdate({ ...nutrient, name: value });
  };

  const handleAmountChange = (value: string) => {
    onUpdate({ ...nutrient, amount: parseFloat(value) || 0 });
  };

  const handleUnitChange = (value: string) => {
    onUpdate({ ...nutrient, unit: value });
  };

  const handleAmountIncrement = () => {
    onUpdate({ ...nutrient, amount: nutrient.amount + 1 });
  };

  const handleAmountDecrement = () => {
    onUpdate({ ...nutrient, amount: Math.max(0, nutrient.amount - 1) });
  };

  return (
    <div className="flex items-center space-x-2">
      <Input
        type="text"
        value={nutrient.name}
        onChange={(e) => handleNameChange(e.target.value)}
        className="flex-1 h-8 text-sm"
        placeholder="Vitamin name"
      />
      
      <div className="flex items-center space-x-1">
        <Input
          type="number"
          value={nutrient.amount}
          onChange={(e) => handleAmountChange(e.target.value)}
          className="w-16 h-8 text-sm"
          min="0"
          step="0.1"
        />
        <div className="flex flex-col">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleAmountIncrement}
            className="w-4 h-4 p-0"
          >
            <ChevronUp className="w-3 h-3" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleAmountDecrement}
            className="w-4 h-4 p-0"
          >
            <ChevronDown className="w-3 h-3" />
          </Button>
        </div>
      </div>
      
      <Select value={nutrient.unit} onValueChange={handleUnitChange}>
        <SelectTrigger className="w-16 h-8 text-sm">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="mg">mg</SelectItem>
          <SelectItem value="g">g</SelectItem>
          <SelectItem value="mcg">mcg</SelectItem>
          <SelectItem value="IU">IU</SelectItem>
        </SelectContent>
      </Select>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={onDelete}
        className="w-8 h-8 text-red-600 hover:text-red-700"
      >
        <X className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default VitaminRow;
