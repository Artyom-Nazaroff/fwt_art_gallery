import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import ButtonEditDelete, { EditOrDeleteButton } from './ButtonEditDelete';

export default {
  title: 'Components/EditDeleteButton',
  component: ButtonEditDelete,
} as ComponentMeta<typeof ButtonEditDelete>;

const Template: ComponentStory<typeof ButtonEditDelete> = (args) => <ButtonEditDelete {...args} />;

export const EditButton = Template.bind({});
EditButton.args = {
  variant: EditOrDeleteButton.edit,
};

export const DeleteButton = Template.bind({});
DeleteButton.args = {
  variant: EditOrDeleteButton.delete,
};
