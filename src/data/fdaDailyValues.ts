
export interface FDADailyValue {
  name: string;
  dv: number;
  unit: string;
  category: 'vitamin' | 'mineral';
}

export const FDA_DAILY_VALUES: FDADailyValue[] = [
  // Vitamins
  { name: 'Vitamin A', dv: 900, unit: 'mcg', category: 'vitamin' },
  { name: 'Vitamin C', dv: 90, unit: 'mg', category: 'vitamin' },
  { name: 'Vitamin D', dv: 20, unit: 'mcg', category: 'vitamin' },
  { name: 'Vitamin E', dv: 15, unit: 'mg', category: 'vitamin' },
  { name: 'Vitamin K', dv: 120, unit: 'mcg', category: 'vitamin' },
  { name: 'Vitamin B1 (Thiamine)', dv: 1.2, unit: 'mg', category: 'vitamin' },
  { name: 'Vitamin B2 (Riboflavin)', dv: 1.3, unit: 'mg', category: 'vitamin' },
  { name: 'Vitamin B3 (Niacin)', dv: 16, unit: 'mg', category: 'vitamin' },
  { name: 'Vitamin B6', dv: 1.7, unit: 'mg', category: 'vitamin' },
  { name: 'Vitamin B12', dv: 2.4, unit: 'mcg', category: 'vitamin' },
  { name: 'Folate', dv: 400, unit: 'mcg', category: 'vitamin' },
  { name: 'Biotin', dv: 30, unit: 'mcg', category: 'vitamin' },
  { name: 'Pantothenic Acid', dv: 5, unit: 'mg', category: 'vitamin' },
  
  // Minerals
  { name: 'Calcium', dv: 1300, unit: 'mg', category: 'mineral' },
  { name: 'Iron', dv: 18, unit: 'mg', category: 'mineral' },
  { name: 'Magnesium', dv: 420, unit: 'mg', category: 'mineral' },
  { name: 'Phosphorus', dv: 1250, unit: 'mg', category: 'mineral' },
  { name: 'Potassium', dv: 4700, unit: 'mg', category: 'mineral' },
  { name: 'Sodium', dv: 2300, unit: 'mg', category: 'mineral' },
  { name: 'Zinc', dv: 11, unit: 'mg', category: 'mineral' },
  { name: 'Copper', dv: 0.9, unit: 'mg', category: 'mineral' },
  { name: 'Manganese', dv: 2.3, unit: 'mg', category: 'mineral' },
  { name: 'Selenium', dv: 55, unit: 'mcg', category: 'mineral' },
  { name: 'Chromium', dv: 35, unit: 'mcg', category: 'mineral' },
  { name: 'Molybdenum', dv: 45, unit: 'mcg', category: 'mineral' },
  { name: 'Chloride', dv: 2300, unit: 'mg', category: 'mineral' }
];
