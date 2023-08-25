import { VueWrapper, shallowMount } from '@vue/test-utils';
import Swal from 'sweetalert2';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import AnimalProfile from './AnimalProfile.vue';

vi.mock('sweetalert2', () => ({
  fire: vi.fn(),
}));

vi.mock('../../composables/handleImage', () => ({
  useAsset: vi.fn(),
}));

vi.mock('@/path-to-your-composables-directory/useAnimals', () => ({
  useAnimals: () => ({
    value: [mockAnimal],
  }),
}));

vi.mock('vue-router', () => ({
  useRoute: () => ({
    params: {
      _animalsId: '1',
    },
  }),
}));

const mockAnimal = {
  id: '1',
  name: 'Tiger',
  image: 'tiger.jpg',
  species: 'Tiger',
  gender: 'Male',
  height: 120,
  birthdate: new Date('2015-05-14T07:00:00Z'),
  favouriteFruit: 'Meat',
  weight: 220,
  weeklyChecks: {
    Monday: false,
    Tuesday: true,
    Wednesday: false,
    Thursday: true,
    Friday: false,
    Saturday: false,
    Sunday: false,
  },
};

describe.skip('AnimalProfile.vue', () => {
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    wrapper = shallowMount(AnimalProfile, {
      global: {
        components: {
          AnimalInfoRender: true,
        },
      },
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('renders animal data correctly when provided with valid animal data', () => {
    const header = wrapper.find('h1');
    expect(header.text()).toBe('Tiger');
  });

  test('displays the "No animal data available" message when no animal data is provided', () => {
    vi.mock('@/path-to-your-composables-directory/useAnimals', () => ({
      useAnimals: () => ({
        value: [],
      }),
    }));

    wrapper = shallowMount(AnimalProfile);

    expect(wrapper.text()).toContain('No animal data available');
  });

  test('updates the weeklyChecks value when a checkbox is clicked', async () => {
    const checkbox = wrapper.find('input[type="checkbox"]');
    await checkbox.trigger('click');
    expect((checkbox.element as HTMLInputElement).checked).toBe(true);
  });

  test('fires the SweetAlert2 when the schedule is saved', async () => {
    const checkbox = wrapper.find('input[type="checkbox"]');
    await checkbox.trigger('change');
    expect(Swal.fire).toHaveBeenCalled();
  });
});
