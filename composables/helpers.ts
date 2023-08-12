import { Animal } from "~~/types";

export const calculateAgeInYears = (birthdate: Date): Number => {
  const today = new Date()
  // Reset the time part to ensure we are only comparing the date part
  today.setHours(0, 0, 0, 0);

  // Ensure birthdate is a Date object
  if (typeof birthdate === 'string') {
    birthdate = new Date(birthdate);
  }

  birthdate.setHours(0, 0, 0, 0);
  
  const differenceInDays = (today.getTime() - birthdate.getTime()) / (1000 * 60 * 60 * 24);

  if (differenceInDays < 0) {
    throw new Error('Birthdate cannot be in the future.');
  }

  if (differenceInDays === 0) {
    return 0;
  }

  if (differenceInDays < 365) {
    return 1;
  }

  // Using floor as we're only interested in complete years
  return Math.floor(differenceInDays / 365);
}

export const calculateFoodRequirement = (animal: Animal): number => {
  // If the animal is a fish, return 0
  if (animal.species.toLowerCase() === 'fish') return 0;

  let foodRequirement = (animal.height + animal.weight) / 250;

  // Age-based adjustment
  const age = calculateAgeInYears(animal.birthdate); 
  const ageNumber = Number(age);
  if (ageNumber > 20) {
    foodRequirement /= 2;
  } else if (ageNumber < 2) {
    foodRequirement *= 2;
  }

  // If favorite fruit is cherries, add 28kg
  if (animal.favouriteFruit?.toLowerCase() === 'cherry') {
    foodRequirement += 28;
  }

  // If the animal is male, add 20%
  if (animal.gender === 'male') {
    foodRequirement *= 1.20;
  }

  return parseFloat(foodRequirement.toFixed(2));
};
