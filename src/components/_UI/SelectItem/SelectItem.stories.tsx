import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import SelectItem from './SelectItem';

export default {
  title: 'Components/SelectItem',
  component: SelectItem,
} as ComponentMeta<typeof SelectItem>;

const Template: ComponentStory<typeof SelectItem> = (args) => <SelectItem {...args} />;

export const DefaultSelectItem = Template.bind({});
DefaultSelectItem.args = {
  title: 'Title',
  id: 'select',
  name: 'select',
  addGenre: () => console.log('add'),
  removeGenre: () => console.log('remove'),
};
