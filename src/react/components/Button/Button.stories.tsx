import React from 'react';
import {
  Story,
  Meta 
} from '@storybook/react/types-6-0';

import {
  Button,
  ButtonProps 
} from './Button';
import { Icon } from '../Icon';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    color: {
      control: 'color' 
    }
  }
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args}>{args.children}</Button>;

export const Primary = Template.bind({});
Primary.args = {
  children: 'Primary Button',
  color: 'primary'
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Secondary Button',
  color: 'secondary'
};

export const CustomColor = Template.bind({});
CustomColor.args = {
  children: 'Custom Button',
  color: '#f00'
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large Button',
  color: 'primary',
  size: 'lg'
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small Button',
  color: 'primary',
  size: 'sm'
};

export const StartIcon = Template.bind({});
StartIcon.args = {
  children: 'Start Icon Button',
  color: 'primary',
  startIcon: <Icon icon='circle' />
};

export const EndIcon = Template.bind({});
EndIcon.args = {
  children: 'End Icon Button',
  color: 'primary',
  endIcon: <Icon icon='circle' />
};
