import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import MenuItem from './MenuItem';

export default {
  title: 'Components/MenuItem',
  component: MenuItem,
} as ComponentMeta<typeof MenuItem>;

const Template: ComponentStory<typeof MenuItem> = (args) => <MenuItem {...args} />;

export const HeaderItem = Template.bind({});
HeaderItem.args = {
  text: 'Menu Item',
};

export const BurgerItem = Template.bind({});
BurgerItem.args = {
  text: 'Menu Item',
  isBurger: true,
};

export const FilterMenuItem = Template.bind({});
FilterMenuItem.args = {
  text: 'Menu Item',
  isFilterMenu: true,
};
