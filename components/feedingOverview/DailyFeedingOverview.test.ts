import { vi, describe, expect, test } from 'vitest';

import { mount } from '@vue/test-utils';
import AnimalFeedingComponent from './DailyFeedingOverview.vue';
import animalsGet from '../../server/api/animals.get';
import { log } from 'console';

vi.mock('../../composables/helpers', () => ({
  calculateFoodRequirement: vi.fn().mockReturnValue(5),
}));

vi.mock('../../composables/helpers', () => ({
  useAnimals: vi.fn(() => ({
    animals: ref([animalsGet()]),
  })),
}));

describe.skip('AnimalFeedingComponent', () => {
  test('renders without crashing', () => {
    const wrapper = mount(AnimalFeedingComponent);

    console.log(wrapper);

    expect(wrapper.exists()).toBe(true);
  });

  test('displays the correct number of animals to feed today', async () => {
    const wrapper = mount(AnimalFeedingComponent);
    await wrapper.setData({
      animals: [{ id: 1, weeklyChecks: { Monday: true }, name: 'Lion', favouriteFruit: 'Meat' }],
    }); // Example for Monday
    expect(wrapper.text()).toContain('Monday: 1 Animals to Feed'); // Adjust for the current day
  });

  test('shows only 8 animals if there are more than 8 and showAllAnimals is false', async () => {
    const wrapper = mount(AnimalFeedingComponent);
    const mockAnimals = Array(10)
      .fill({})
      .map((_, idx) => ({
        id: idx,
        weeklyChecks: { Monday: true },
        name: `Animal ${idx}`,
        favouriteFruit: 'Fruit',
      }));
    await wrapper.setData({ animals: mockAnimals });
    const displayedAnimals = wrapper.findAll('.card');
    expect(displayedAnimals.length).toBe(8);
  });

  test('show all animals when the "Show More Animals" button is clicked', async () => {
    const wrapper = mount(AnimalFeedingComponent);
    const mockAnimals = Array(10)
      .fill({})
      .map((_, idx) => ({
        id: idx,
        weeklyChecks: { Monday: true },
        name: `Animal ${idx}`,
        favouriteFruit: 'Fruit',
      }));
    await wrapper.setData({ animals: mockAnimals });
    const showMoreButton = wrapper.find('button.bg-blue-500');
    await showMoreButton.trigger('click');
    const displayedAnimals = wrapper.findAll('.card');
    expect(displayedAnimals.length).toBe(10);
  });

  test('show less animals when the "Show Less" button is clicked after showing all', async () => {
    const wrapper = mount(AnimalFeedingComponent);
    const mockAnimals = Array(10)
      .fill({})
      .map((_, idx) => ({
        id: idx,
        weeklyChecks: { Monday: true },
        name: `Animal ${idx}`,
        favouriteFruit: 'Fruit',
      }));
    await wrapper.setData({ animals: mockAnimals, showAllAnimals: true });
    const showLessButton = wrapper.find('button.bg-gray-400');
    await showLessButton.trigger('click');
    const displayedAnimals = wrapper.findAll('.card');
    expect(displayedAnimals.length).toBe(8);
  });
});
