import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Textarea from './Textarea';

export default {
  title: 'Components/Textarea',
  component: Textarea,
} as ComponentMeta<typeof Textarea>;

const Template: ComponentStory<typeof Textarea> = (args) => <Textarea {...args} />;

export const DefaultTextarea = Template.bind({});
DefaultTextarea.args = {
  label: 'Textarea Label',
  value: 'Placeholder',
  id: 'textarea',
  name: 'textarea',
};
