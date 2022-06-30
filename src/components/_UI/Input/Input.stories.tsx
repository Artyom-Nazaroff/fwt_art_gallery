import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Input from './Input';

export default {
  title: 'Components/Input',
  component: Input,
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const DefaultInput = Template.bind({});
DefaultInput.args = {
  value: 'Input placeholder',
  label: 'Label',
};
