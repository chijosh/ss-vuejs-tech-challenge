import type { Animal } from '@/types'

export const useAnimals = () => useState<Animal[]>('my-animals', () => [] )
