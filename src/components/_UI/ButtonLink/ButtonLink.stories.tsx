import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import ButtonLink from './ButtonLink';

export default {
  title: 'Components/ButtonLink',
  component: ButtonLink,
} as ComponentMeta<typeof ButtonLink>;

const Template: ComponentStory<typeof ButtonLink> = (args) => <ButtonLink {...args} />;

export const Button = Template.bind({});
Button.args = {
  text: 'ScrollUpButton Link',
};

// export const DeleteButton = Template.bind({});
// DeleteButton.args = {
//
// };
