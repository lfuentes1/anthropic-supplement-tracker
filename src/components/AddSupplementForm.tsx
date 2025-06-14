
import React, { useState } from 'react';
import { Upload, ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

interface AddSupplementFormProps {
  onAddSupplement: (supplementName: string) => void;
}

const AddSupplementForm = ({ onAddSupplement }: AddSupplementFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [supplementName, setSupplementName] = useState('');
  const [frontImage, setFrontImage] = useState<File | null>(null);
  const [nutritionImage, setNutritionImage] = useState<File | null>(null);

  const handleFrontImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFrontImage(file);
      // Auto-populate supplement name - for now, use filename as placeholder
      // In a real app, this would use OCR or image recognition
      const fileName = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, ' ');
      setSupplementName(fileName);
    }
  };

  const handleNutritionImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setNutritionImage(file);
    }
  };

  const handleAddSupplement = () => {
    if (supplementName.trim()) {
      onAddSupplement(supplementName.trim());
      // Reset form
      setSupplementName('');
      setFrontImage(null);
      setNutritionImage(null);
      setIsOpen(false);
    }
  };

  const ImageUploadArea = ({ 
    label, 
    onChange, 
    file 
  }: { 
    label: string; 
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    file: File | null;
  }) => (
    <div className="flex flex-col items-center">
      <Label className="text-sm font-medium text-gray-700 mb-2">{label}</Label>
      <div className="relative w-full h-24 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors cursor-pointer">
        <input
          type="file"
          accept="image/*"
          onChange={onChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="flex flex-col items-center justify-center h-full text-gray-500">
          <Upload className="w-6 h-6 mb-1" />
          <span className="text-xs">or drag & drop</span>
        </div>
        {file && (
          <div className="absolute inset-0 bg-green-50 border-green-300 border-2 rounded-lg flex items-center justify-center">
            <span className="text-xs text-green-700 px-2 text-center">{file.name}</span>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between border-gray-300 hover:border-gray-400"
        >
          <span className="font-medium">Add Supplement</span>
          {isOpen ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </Button>
      </CollapsibleTrigger>
      
      <CollapsibleContent className="mt-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <ImageUploadArea
            label="Front of Container"
            onChange={handleFrontImageUpload}
            file={frontImage}
          />
          <ImageUploadArea
            label="Nutrition Label"
            onChange={handleNutritionImageUpload}
            file={nutritionImage}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="supplement-name" className="text-sm font-medium text-gray-700">
            Supplement Name
          </Label>
          <Input
            id="supplement-name"
            type="text"
            placeholder="e.g., multivitamin"
            value={supplementName}
            onChange={(e) => setSupplementName(e.target.value)}
            className="w-full"
          />
        </div>
        
        <Button
          onClick={handleAddSupplement}
          disabled={!supplementName.trim()}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Add Supplement
        </Button>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default AddSupplementForm;
