import { describe, expect, test } from 'vitest';

import { mount } from '@vue/test-utils';
import Footer from './Footer.vue'; 

describe('Footer component', () => {

  test('renders without crashing', () => {
    const wrapper = mount(Footer);
    const logo = wrapper.find('img[alt="Logo"]');
    expect(logo.exists()).toBe(true);
  });

  test('displays the correct current year', () => {
    const currentYear = new Date().getFullYear();
    const wrapper = mount(Footer);
    const yearText = `© ${currentYear} Cologne Zoo. All Rights Reserved.`;
    expect(wrapper.text()).toContain(yearText);
  });

  test('displays the logo and site name correctly', () => {
    const wrapper = mount(Footer);
    const logo = wrapper.find('img[alt="Logo"]');
    const siteName = wrapper.find('span.text-xl.font-semibold');
    expect(logo.exists()).toBe(true);
    expect(siteName.text()).toBe('Cologne Zoo');
  });

});
