import React from 'react';
import {
  Story,
  Meta 
} from '@storybook/react/types-6-0';
import {
  Badge,
  BadgeProps 
} from './Badge';
import { Icon } from '../Icon';

const IconBadgeChildren = () => (
  <>
    <Icon icon='circle' />
    Icon
  </>
);

export default {
  title: 'Components/Badge',
  component: Badge,
  argTypes: {
    color: {
      control: 'color' 
    }
  }
} as Meta;

const Template: Story<BadgeProps> = (args) => <Badge {...args}>{args.children}</Badge>;

export const Primary = Template.bind({});
Primary.args = {
  children: 'Primary Badge',
  color: 'primary'
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Secondary Badge',
  color: 'secondary'
};

export const CustomColor = Template.bind({});
CustomColor.args = {
  children: 'Custom Badge',
  color: '#f00'
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large Badge',
  color: 'primary',
  size: 'lg'
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small Badge',
  color: 'primary',
  size: 'sm'
};

export const IconBadge = Template.bind({});
IconBadge.args = {
  children: <IconBadgeChildren />,
  color: 'primary'
};
