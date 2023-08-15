type Kilogram = number;
type Meter = number;

// For simplification in the animal kingdom, let's assume that only 2 genders exist
export type Gender = 'male' | 'female';
export type Fruit = 'banana' | 'apple' | 'cherry';

export interface Animal {
  id: string;
  name: string;
  species: string;
  gender: Gender;
  birthdate: Date;
  weight: Kilogram;
  height: Meter;
  favouriteFruit: Fruit;
  image?: string;
  weeklyChecks?: WeeklyChecks;
}

export type FeedingTask = {
  animalId: string;
  day: Date;
  fruit: string;
};

type Days = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

interface WeeklyChecks {
  [key in Days]: boolean;
}

interface FoodRequirement {
  [fruit: string]: number;
}

interface CalendarEntry {
  day: number;
  animalsToFeed: number;
  totalFood: FoodRequirement;
}
