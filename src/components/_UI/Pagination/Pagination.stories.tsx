import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Pagination from './Pagination';

export default {
  title: 'Components/Pagination',
  component: Pagination,
} as ComponentMeta<typeof Pagination>;

const Template: ComponentStory<typeof Pagination> = (args) => <Pagination {...args} />;

export const DefaultPagination = Template.bind({});
DefaultPagination.args = {
  currentPage: 1,
  pageSize: 5,
  totalCount: 100,
  siblingCount: 1,
};
