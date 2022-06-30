import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import TextLink from './TextLink';

export default {
  title: 'Components/TextLink',
  component: TextLink,
} as ComponentMeta<typeof TextLink>;

const Template: ComponentStory<typeof TextLink> = (args) => <TextLink {...args} />;

export const DefaultTextLink = Template.bind({});
DefaultTextLink.args = {
  text: 'Textlink',
  onClick: () => console.log('click'),
};
