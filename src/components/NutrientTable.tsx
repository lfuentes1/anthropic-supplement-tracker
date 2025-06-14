
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

interface NutrientData {
  name: string;
  dv: number;
  unit: string;
  intake: number;
}

interface NutrientTableProps {
  title: string;
  nutrients: NutrientData[];
  category: 'vitamin' | 'mineral';
}

const NutrientTable = ({ title, nutrients, category }: NutrientTableProps) => {
  const getIntakeColor = (intake: number, dv: number) => {
    return intake >= dv ? 'text-green-600' : 'text-red-600';
  };

  const formatPercentage = (intake: number, dv: number) => {
    const percentage = Math.round((intake / dv) * 100);
    return `${intake} ${nutrients[0]?.unit || 'mg'} (${percentage}%)`;
  };

  if (nutrients.length === 0) return null;

  return (
    <div className="mb-4">
      <h4 className="font-medium text-gray-700 mb-2 capitalize">{title}</h4>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-xs font-medium">{category === 'vitamin' ? 'Vitamin' : 'Mineral'}</TableHead>
            <TableHead className="text-xs font-medium">DV</TableHead>
            <TableHead className="text-xs font-medium">Your Intake</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {nutrients.map((nutrient) => (
            <TableRow key={nutrient.name}>
              <TableCell className="text-sm py-2">{nutrient.name}</TableCell>
              <TableCell className="text-sm py-2">{nutrient.dv} {nutrient.unit}</TableCell>
              <TableCell className={`text-sm py-2 font-medium ${getIntakeColor(nutrient.intake, nutrient.dv)}`}>
                {formatPercentage(nutrient.intake, nutrient.dv)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default NutrientTable;
