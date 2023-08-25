import { fakeAnimal } from '../../helpers/fakeAnimal';
import type { Animal } from '../../types';

// This would be a database query in real life, prisma is great for that!
const animals: Array<Animal> = Array.from({ length: 50 }, () => fakeAnimal());

export default () => animals;
