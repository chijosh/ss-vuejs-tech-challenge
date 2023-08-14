import type { GenderType } from '@faker-js/faker';
import { faker } from '@faker-js/faker';

import type { Animal, Fruit, Gender, WeeklyChecks } from '../types';

export const fakeAnimal = (): Animal => {
  const gender = faker.helpers.arrayElement(['male', 'female']) as Gender;
  const favouriteFruit = faker.helpers.arrayElement(['banana', 'apple', 'cherry']) as Fruit;
  const animalSpecie = faker.animal.type();

  const weeklyChecks: WeeklyChecks = {
    Monday: faker.datatype.boolean(),
    Tuesday: faker.datatype.boolean(),
    Wednesday: faker.datatype.boolean(),
    Thursday: faker.datatype.boolean(),
    Friday: faker.datatype.boolean(),
    Saturday: faker.datatype.boolean(),
    Sunday: faker.datatype.boolean(),
  };

  return {
    id: faker.datatype.uuid(),
    name: faker.name.firstName(gender as GenderType),
    species: animalSpecie,
    birthdate: faker.date.past(25),
    weight: faker.datatype.float({
      min: 20,
      max: 250,
      precision: 0.1,
    }),
    height: faker.datatype.float({
      min: 0.25,
      max: 4,
      precision: 0.01,
    }),
    gender,
    favouriteFruit,
    image: `/${animalSpecie}.jpg`,
    weeklyChecks,
  };
};
