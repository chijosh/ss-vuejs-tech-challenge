import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import CalendarCard from './CalendarCard.vue';

describe('CalendarCard.vue', () => {
  test('renders day prop correctly', () => {
    const day = 5;
    const wrapper = mount(CalendarCard, {
      props: { day },
    });
    expect(wrapper.text()).toContain(day);
  });

  test('renders entry details if present', () => {
    const entry = { 
      name: 'Elephant', 
      height: 300, 
      animalsToFeed: 10, 
      totalFood: { banana: 20.5, grass: 100.3 } 
  };
    const wrapper = mount(CalendarCard, {
      props: {
        day: 5,
        entry,
      },
    });
    expect(wrapper.text()).toContain('Feed: 10 animals');
    expect(wrapper.text()).toContain('banana: 20.50 kg');
    expect(wrapper.text()).toContain('grass: 100.30 kg');
  });

  test('displays "No Entry" when no entry is provided', () => {
    const wrapper = mount(CalendarCard, {
      props: {
        day: 5,
        entry: null,
      },
    });
    expect(wrapper.text()).toContain('No Entry');
  });

  test('computed property returns one of the predefined colors', () => {
    const wrapper = mount(CalendarCard, {
      props: {
        day: 5,
      },
    });

    const possibleColors = ['red', 'yellow', 'blue', 'green', 'purple', 'pink', 'indigo'];
    const cardClass = wrapper.vm.cardClass;
    const colorMatch = cardClass.match(/bg-(\w+)-\d{3}/);
    if (colorMatch && colorMatch[1]) {
      expect(possibleColors).toContain(colorMatch[1]);
    } else {
      throw new Error('No color found in cardClass.');
    }
  });
});
