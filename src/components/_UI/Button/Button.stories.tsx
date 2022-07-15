import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Button from './Button';

export default {
  title: 'Components/ScrollUpButton',
  component: Button,
  argTypes: {
    text: {
      type: 'string',
      description: 'Текст внутри кнопки',
      // defaultValue: 'Моя кнопка',
      // options: ['dwedwe', 'efwef'],
      // control: {
      //   type: 'radio',
      // },
    },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const ActiveButton = Template.bind({});
ActiveButton.args = {
  text: 'Button',
  isDisabled: false,
};

export const DisabledButton = Template.bind({});
DisabledButton.args = {
  text: 'Disabled ScrollUpButton',
  isDisabled: true,
};
