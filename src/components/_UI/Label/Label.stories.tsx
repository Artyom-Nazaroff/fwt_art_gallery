import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Label from './Label';

export default {
  title: 'Components/Label',
  component: Label,
} as ComponentMeta<typeof Label>;

const Template: ComponentStory<typeof Label> = (args) => <Label {...args} />;

export const DefaultLabel = Template.bind({});
DefaultLabel.args = {
  name: 'Label',
  isRemove: false,
};

export const EditableLabel = Template.bind({});
EditableLabel.args = {
  name: 'Editable Label',
  isRemove: true,
};
