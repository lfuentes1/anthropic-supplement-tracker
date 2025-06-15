import React, { useState, useEffect } from 'react';
import { Calendar, ChevronUp, ChevronDown, CalendarIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar as CalendarComponent } from './ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import NutrientTable from './NutrientTable';
import { FDA_DAILY_VALUES, FDADailyValue } from '../data/fdaDailyValues';
import { Supplement } from './MySupplements';

interface IntakeTrackerProps {
  activeSupplements?: Supplement[];
}

const IntakeTracker = ({ activeSupplements = [] }: IntakeTrackerProps) => {
  const [activeOpen, setActiveOpen] = useState(true);
  const [missingOpen, setMissingOpen] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isToggleOn, setIsToggleOn] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // Force re-render when activeSupplements or their nutrients change
  useEffect(() => {
    setRefreshKey(prev => prev + 1);
  }, [activeSupplements, activeSupplements.map(s => s.nutrients).flat()]);

  // Calculate active nutrients from checked supplements
  const getActiveNutrients = () => {
    const activeNutrientMap = new Map<string, { amount: number; unit: string; fdaMatch?: FDADailyValue }>();
    
    activeSupplements.forEach(supplement => {
      supplement.nutrients.forEach(nutrient => {
        // Find FDA match for this nutrient with precise matching
        const fdaMatch = FDA_DAILY_VALUES.find(fdaValue => {
          const normalizedFdaName = fdaValue.name.toLowerCase();
          const normalizedNutrientName = nutrient.name.toLowerCase();
          
          // First try exact match
          if (normalizedFdaName === normalizedNutrientName) {
            return true;
          }
          
          // Then try specific vitamin/mineral matches
          if (normalizedNutrientName === 'vitamin c' && normalizedFdaName === 'vitamin c') return true;
          if (normalizedNutrientName === 'vitamin a' && normalizedFdaName === 'vitamin a') return true;
          if (normalizedNutrientName === 'vitamin d' && normalizedFdaName === 'vitamin d') return true;
          if (normalizedNutrientName === 'vitamin e' && normalizedFdaName === 'vitamin e') return true;
          if (normalizedNutrientName === 'vitamin k' && normalizedFdaName === 'vitamin k') return true;
          if (normalizedNutrientName === 'vitamin b6' && normalizedFdaName === 'vitamin b6') return true;
          if (normalizedNutrientName === 'vitamin b12' && normalizedFdaName === 'vitamin b12') return true;
          
          // Handle B-vitamins with alternative names
          if (normalizedNutrientName === 'thiamine' && normalizedFdaName.includes('thiamine')) return true;
          if (normalizedNutrientName === 'riboflavin' && normalizedFdaName.includes('riboflavin')) return true;
          if (normalizedNutrientName === 'niacin' && normalizedFdaName.includes('niacin')) return true;
          if (normalizedNutrientName === 'folate' && normalizedFdaName === 'folate') return true;
          if (normalizedNutrientName === 'biotin' && normalizedFdaName === 'biotin') return true;
          if (normalizedNutrientName === 'pantothenic acid' && normalizedFdaName === 'pantothenic acid') return true;
          
          // Handle common minerals
          if (normalizedNutrientName === 'calcium' && normalizedFdaName === 'calcium') return true;
          if (normalizedNutrientName === 'iron' && normalizedFdaName === 'iron') return true;
          if (normalizedNutrientName === 'magnesium' && normalizedFdaName === 'magnesium') return true;
          if (normalizedNutrientName === 'zinc' && normalizedFdaName === 'zinc') return true;
          if (normalizedNutrientName === 'selenium' && normalizedFdaName === 'selenium') return true;
          
          return false;
        });

        if (fdaMatch) {
          const key = fdaMatch.name; // Use FDA name as the key for consistency
          const existing = activeNutrientMap.get(key);
          
          if (existing) {
            // Sum the amounts for the same nutrient
            activeNutrientMap.set(key, {
              amount: existing.amount + nutrient.amount,
              unit: fdaMatch.unit, // Use FDA unit for consistency
              fdaMatch: fdaMatch
            });
          } else {
            activeNutrientMap.set(key, {
              amount: nutrient.amount,
              unit: fdaMatch.unit,
              fdaMatch: fdaMatch
            });
          }
        }
      });
    });

    return activeNutrientMap;
  };

  // Get missing nutrients (FDA values not in active)
  const getMissingNutrients = () => {
    const activeNutrients = getActiveNutrients();
    return FDA_DAILY_VALUES.filter(fdaValue => {
      return !activeNutrients.has(fdaValue.name);
    });
  };

  // Get active nutrients with FDA values organized by category
  const getActiveNutrientsWithDV = () => {
    const activeNutrients = getActiveNutrients();
    const result: { vitamins: any[], minerals: any[] } = { vitamins: [], minerals: [] };

    activeNutrients.forEach((nutrientData, name) => {
      if (nutrientData.fdaMatch) {
        const nutrientInfo = {
          name: nutrientData.fdaMatch.name,
          dv: nutrientData.fdaMatch.dv,
          unit: nutrientData.fdaMatch.unit,
          intake: nutrientData.amount
        };

        if (nutrientData.fdaMatch.category === 'vitamin') {
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
    <div className="h-full flex flex-col" key={refreshKey}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">
            <Calendar className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Intake Tracker</h2>
        </div>
      </div>

      {/* Daily Tracker Section */}
      <div className="mb-6 space-y-4">
        {/* Date Picker */}
        <div className="flex items-center justify-center">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-64 justify-start text-left font-normal",
                  !selectedDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, "MM/dd/yyyy") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="center">
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
                disabled={(date) => date > new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Toggle On/Off */}
        <div className="flex items-center justify-center space-x-3">
          <span className="text-sm font-medium text-gray-700">Daily Tracker</span>
          <Switch
            checked={isToggleOn}
            onCheckedChange={setIsToggleOn}
            className="data-[state=checked]:bg-green-500"
          />
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
