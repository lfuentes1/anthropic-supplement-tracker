
import React, { useState } from 'react';
import { Calendar, ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import NutrientTable from './NutrientTable';
import { FDA_DAILY_VALUES, FDADailyValue } from '../data/fdaDailyValues';
import { Supplement } from './MySupplements';

interface IntakeTrackerProps {
  activeSupplements?: Supplement[];
}

const IntakeTracker = ({ activeSupplements = [] }: IntakeTrackerProps) => {
  const [activeOpen, setActiveOpen] = useState(true);
  const [missingOpen, setMissingOpen] = useState(true);

  // Calculate active nutrients from checked supplements
  const getActiveNutrients = () => {
    const activeNutrientMap = new Map<string, { amount: number; unit: string }>();
    
    activeSupplements.forEach(supplement => {
      supplement.nutrients.forEach(nutrient => {
        const existing = activeNutrientMap.get(nutrient.name);
        if (existing) {
          // Convert units if needed and sum amounts
          activeNutrientMap.set(nutrient.name, {
            amount: existing.amount + nutrient.amount,
            unit: nutrient.unit
          });
        } else {
          activeNutrientMap.set(nutrient.name, {
            amount: nutrient.amount,
            unit: nutrient.unit
          });
        }
      });
    });

    return activeNutrientMap;
  };

  // Get missing nutrients (FDA values not in active)
  const getMissingNutrients = () => {
    const activeNutrients = getActiveNutrients();
    return FDA_DAILY_VALUES.filter(fdaValue => {
      const normalizedName = fdaValue.name.toLowerCase();
      const hasMatch = Array.from(activeNutrients.keys()).some(activeName => 
        activeName.toLowerCase().includes(normalizedName.split(' ')[0]) ||
        normalizedName.includes(activeName.toLowerCase())
      );
      return !hasMatch;
    });
  };

  // Get active nutrients with FDA values
  const getActiveNutrientsWithDV = () => {
    const activeNutrients = getActiveNutrients();
    const result: { vitamins: any[], minerals: any[] } = { vitamins: [], minerals: [] };

    activeNutrients.forEach((nutrientData, name) => {
      const fdaMatch = FDA_DAILY_VALUES.find(fdaValue => {
        const normalizedFdaName = fdaValue.name.toLowerCase();
        const normalizedNutrientName = name.toLowerCase();
        return normalizedNutrientName.includes(normalizedFdaName.split(' ')[0]) ||
               normalizedFdaName.includes(normalizedNutrientName);
      });

      if (fdaMatch) {
        const nutrientInfo = {
          name: fdaMatch.name,
          dv: fdaMatch.dv,
          unit: fdaMatch.unit,
          intake: nutrientData.amount
        };

        if (fdaMatch.category === 'vitamin') {
          result.vitamins.push(nutrientInfo);
        } else {
          result.minerals.push(nutrientInfo);
        }
      }
    });

    return result;
  };

  const activeNutrients = getActiveNutrientsWithDV();
  const missingNutrients = getMissingNutrients();
  const activeCount = activeNutrients.vitamins.length + activeNutrients.minerals.length;
  const missingCount = missingNutrients.length;

  const missingVitamins = missingNutrients
    .filter(n => n.category === 'vitamin')
    .map(n => ({ ...n, intake: 0 }));
  
  const missingMinerals = missingNutrients
    .filter(n => n.category === 'mineral')
    .map(n => ({ ...n, intake: 0 }));

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">
            <Calendar className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Intake Tracker</h2>
        </div>
        <div className="text-sm text-gray-500">
          Today, {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </div>
      </div>
      
      <div className="space-y-4">
        {/* Active Vitamins & Minerals */}
        <Collapsible open={activeOpen} onOpenChange={setActiveOpen}>
          <CollapsibleTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between border-green-300 hover:border-green-400 text-green-700"
            >
              <span className="font-medium">Active Vitamins & Minerals ({activeCount})</span>
              {activeOpen ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </Button>
          </CollapsibleTrigger>
          
          <CollapsibleContent className="mt-4">
            {activeCount > 0 ? (
              <div className="space-y-4">
                <NutrientTable
                  title="Vitamins"
                  nutrients={activeNutrients.vitamins}
                  category="vitamin"
                />
                <NutrientTable
                  title="Minerals"
                  nutrients={activeNutrients.minerals}
                  category="mineral"
                />
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No active supplements selected</p>
                <p className="text-sm mt-1">Check supplements in the left panel to see active nutrients</p>
              </div>
            )}
          </CollapsibleContent>
        </Collapsible>

        {/* Missing Vitamins & Minerals */}
        <Collapsible open={missingOpen} onOpenChange={setMissingOpen}>
          <CollapsibleTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between border-red-300 hover:border-red-400 text-red-700"
            >
              <span className="font-medium">Missing Vitamins & Minerals ({missingCount})</span>
              {missingOpen ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </Button>
          </CollapsibleTrigger>
          
          <CollapsibleContent className="mt-4">
            <div className="space-y-4">
              <NutrientTable
                title="Vitamins"
                nutrients={missingVitamins}
                category="vitamin"
              />
              <NutrientTable
                title="Minerals"
                nutrients={missingMinerals}
                category="mineral"
              />
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};

export default IntakeTracker;
