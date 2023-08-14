import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import CalendarCard from './CalendarCard.vue';

describe('CalendarCard.vue', () => {
  
  test('renders day prop correctly', () => {
    const day = 5;
    const wrapper = mount(CalendarCard, {
      props: { day }
    });
    expect(wrapper.text()).toContain(day);
  });

  test('renders entry details if present', () => {
    const entry = { name: 'Elephant', height: 300 };
    const wrapper = mount(CalendarCard, {
      props: {
        day: 5,
        entry
      }
    });
    expect(wrapper.text()).toContain('Name: Elephant');
    expect(wrapper.text()).toContain('Height: 300 cm');
  });

  test('displays "No Entry" when no entry is provided', () => {
    const wrapper = mount(CalendarCard, {
      props: {
        day: 5,
        entry: null
      }
    });
    expect(wrapper.text()).toContain('No Entry');
  });

  test('computed property returns one of the predefined colors', () => {
    const wrapper = mount(CalendarCard, {
      props: {
        day: 5
      }
    });

    const possibleColors = ['red', 'yellow', 'blue', 'green', 'purple', 'pink', 'indigo'];
    const cardClass = wrapper.vm.cardClass;
    const color = cardClass.split('-')[2];  
    expect(possibleColors).toContain(color);
  });
});
