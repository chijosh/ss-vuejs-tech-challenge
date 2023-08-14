import { describe, expect, test } from 'vitest';

import { mount } from '@vue/test-utils';
import Header from './Header.vue'; // Adjust the path accordingly

describe('Header component', () => {

  test('renders without crashing', () => {
    const wrapper = mount(Header);
    const logo = wrapper.find('img[alt="Logo"]');
    expect(logo.exists()).toBe(true);
  });

  test('displays desktop navigation links correctly', () => {
    const wrapper = mount(Header);

    const homeLink = wrapper.find('nav ul li a[to="/"]');
    const calendarLink = wrapper.find('nav ul li a[to="/calendar"]');
    const aboutLink = wrapper.find('nav ul li a[to="/about"]');
    expect(homeLink.text()).toBe('Home');
    expect(calendarLink.text()).toBe('Calendar');
    expect(aboutLink.text()).toBe('About');
  });

  test('mobile hamburger icon toggles the mobile menu', async () => {
    const wrapper = mount(Header);
    const hamburgerButton = wrapper.find('button');

    expect(wrapper.vm.isMenuOpen).toBe(false);
    
    await hamburgerButton.trigger('click');
    expect(wrapper.vm.isMenuOpen).toBe(true);

    await hamburgerButton.trigger('click');
    expect(wrapper.vm.isMenuOpen).toBe(false);
  });

  test('displays mobile navigation links correctly when menu is open', async () => {
    const wrapper = mount(Header);
    await wrapper.setData({ isMenuOpen: true });

    const homeLink = wrapper.find('div.fixed a[to="/"]');
    const calendarLink = wrapper.find('div.fixed a[to="/calendar"]');
    const aboutLink = wrapper.find('div.fixed a[to="/about"]');
    expect(homeLink.text()).toBe('Home');
    expect(calendarLink.text()).toBe('Calendar');
    expect(aboutLink.text()).toBe('About');
  });

});

