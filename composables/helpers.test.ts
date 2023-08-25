import { faker } from '@faker-js/faker';
import { describe, expect, test } from 'vitest';

import { Animal } from '../types';
import { calculateAgeInYears, calculateFoodRequirement } from './helpers';

describe('The calculateAgeInYears helper', () => {
  test('handles over 100 years correctly', () => {
    const date = faker.date.between('1800-01-01T00:00:00.000Z', '1900-01-01T00:00:00.000Z');
    expect(calculateAgeInYears(date)).toBeGreaterThanOrEqual(100);
  });

  test('returns 1 for a birthdate within the past year but not today', () => {
    const lessThanAYearAgo = new Date();
    // Let's subtract 6 months for this test
    lessThanAYearAgo.setMonth(lessThanAYearAgo.getMonth() - 6);
    expect(calculateAgeInYears(lessThanAYearAgo)).toBe(1);
  });

  test('returns accurate age in full years for a birthdate more than a year ago', () => {
    const threeYearsAgo = new Date();
    threeYearsAgo.setFullYear(threeYearsAgo.getFullYear() - 3);
    expect(calculateAgeInYears(threeYearsAgo)).toBe(3);
  });

  // For the zookeepers its easier to conservatively assume that an animal is older rather than younger
  test('always rounds up and returns 0 for a birthdate that is today', () => {
    const today = new Date();
    expect(calculateAgeInYears(today)).toBe(0);
  });
});

describe('calculateFoodRequirement function', () => {
  test('should return 0 for a fish regardless of other properties', () => {
    const fish: Animal = {
      name: faker.name.firstName(),
      id: faker.datatype.uuid(),
      height: 100,
      weight: 25,
      birthdate: new Date('2010-01-01'),
      favouriteFruit: 'cherry',
      gender: 'male',
      species: 'fish',
    };

    expect(calculateFoodRequirement(fish)).toBe(0);
  });

  test('should calculate basic food requirement based on height and weight', () => {
    const animal: Animal = {
      name: faker.name.firstName(),
      id: faker.datatype.uuid(),
      height: 200,
      weight: 100,
      birthdate: new Date('2010-01-01'),
      favouriteFruit: 'banana',
      gender: 'female',
      species: 'elephant',
    };

    const expected = (animal.height + animal.weight) / 250;
    expect(calculateFoodRequirement(animal)).toBeCloseTo(expected, 2);
  });
});
