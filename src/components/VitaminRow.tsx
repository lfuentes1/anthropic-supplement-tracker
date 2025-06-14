
import React, { useState, useRef, useEffect } from 'react';
import { X, ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Nutrient } from './MySupplements';
import { FDA_DAILY_VALUES } from '../data/fdaDailyValues';

interface VitaminRowProps {
  nutrient: Nutrient;
  onUpdate: (nutrient: Nutrient) => void;
  onDelete: () => void;
}

const VitaminRow = ({ nutrient, onUpdate, onDelete }: VitaminRowProps) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState(FDA_DAILY_VALUES);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionRef = useRef<HTMLDivElement>(null);

  const handleNameChange = (value: string) => {
    onUpdate({ ...nutrient, name: value });
    
    // Filter FDA suggestions based on input
    const filtered = FDA_DAILY_VALUES.filter(item => 
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSuggestions(filtered);
    setShowSuggestions(value.length > 0 && filtered.length > 0);
  };

  const handleSuggestionClick = (suggestion: typeof FDA_DAILY_VALUES[0]) => {
    onUpdate({ 
      ...nutrient, 
      name: suggestion.name,
      unit: suggestion.unit
    });
    setShowSuggestions(false);
  };

  const handleAmountChange = (value: string) => {
    onUpdate({ ...nutrient, amount: parseFloat(value) || 0 });
  };

  const handleUnitChange = (value: string) => {
    onUpdate({ ...nutrient, unit: value });
  };

  const handleAmountIncrement = () => {
    onUpdate({ ...nutrient, amount: parseFloat((nutrient.amount + 0.05).toFixed(2)) });
  };

  const handleAmountDecrement = () => {
    onUpdate({ ...nutrient, amount: Math.max(0, parseFloat((nutrient.amount - 0.05).toFixed(2))) });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target as Node) &&
          inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex items-center space-x-2">
      <div className="relative flex-1">
        <Input
          ref={inputRef}
          type="text"
          value={nutrient.name}
          onChange={(e) => handleNameChange(e.target.value)}
          onFocus={() => {
            if (nutrient.name && filteredSuggestions.length > 0) {
              setShowSuggestions(true);
            }
          }}
          className="h-8 text-sm"
          placeholder="Vitamin name"
        />
        
        {showSuggestions && (
          <div 
            ref={suggestionRef}
            className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto"
          >
            {filteredSuggestions.slice(0, 10).map((suggestion, index) => (
              <div
                key={index}
                className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion.name}
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="flex items-center space-x-1">
        <Input
          type="number"
          value={nutrient.amount}
          onChange={(e) => handleAmountChange(e.target.value)}
          className="w-16 h-8 text-sm"
          min="0"
          step="0.05"
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
