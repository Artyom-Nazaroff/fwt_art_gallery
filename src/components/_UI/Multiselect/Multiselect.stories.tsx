import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Multiselect from './Multiselect';

export default {
  title: 'Components/Multiselect',
  component: Multiselect,
} as ComponentMeta<typeof Multiselect>;

const Template: ComponentStory<typeof Multiselect> = (args) => <Multiselect {...args} />;

export const DefaultMultiselect = Template.bind({});
DefaultMultiselect.args = {
  label: 'Multiselect',
  artistsGenres: [
    {
      _id: '62a32e08269fa5c416c53d7c',
      name: 'Post-Impressionism',
    },
    {
      _id: '62a32e08269fa5c416c53d81',
      name: 'Avant-garde',
    },
    {
      _id: '62a32e08269fa5c416c53d82',
      name: 'Baroque',
    },
    {
      _id: '62a32e08269fa5c416c53d83',
      name: 'Classicism',
    },
    {
      _id: '62a32e08269fa5c416c53d84',
      name: 'Constructivism',
    },
  ],
  genresList: [
    {
      _id: '62a32e08269fa5c416c53d7c',
      name: 'Post-Impressionism',
    },
    {
      _id: '62a32e08269fa5c416c53d81',
      name: 'Avant-garde',
    },
    {
      _id: '62a32e08269fa5c416c53d82',
      name: 'Baroque',
    },
    {
      _id: '62a32e08269fa5c416c53d83',
      name: 'Classicism',
    },
    {
      _id: '62a32e08269fa5c416c53d84',
      name: 'Constructivism',
    },
  ],
};
DefaultMultiselect.decorators = [
  (Story) => (
    <div style={{ width: '400px' }}>
      <Story />
    </div>
  ),
];
