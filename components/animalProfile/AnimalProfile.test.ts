import { vi, describe, expect, test } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import AnimalProfile from './AnimalProfile.vue';
import Swal from 'sweetalert2';

vi.mock('sweetalert2', () => ({
  fire: vi.fn(),
}));

vi.mock('../../composables/helpers', () => ({
  useAsset: vi.fn(),
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
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(AnimalProfile, {
      global: {
        mocks: {
          useAnimals: () => ({
            value: [mockAnimal],
          }),
        },
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
    wrapper = shallowMount(AnimalProfile, {
      global: {
        mocks: {
          useAnimals: () => ({
            value: [],
          }),
        },
        components: {
          AnimalInfoRender: true,
        },
      },
    });
    expect(wrapper.text()).toContain('No animal data available');
  });

  test('updates the weeklyChecks value when a checkbox is clicked', async () => {
    const checkbox = wrapper.find('input[type="checkbox"]');
    await checkbox.setChecked();
    expect(checkbox.element.checked).toBe(true);
  });

  test('fires the SweetAlert2 when the schedule is saved', async () => {
    const checkbox = wrapper.find('input[type="checkbox"]');
    await checkbox.trigger('change');
    expect(Swal.fire).toHaveBeenCalled();
  });
});
