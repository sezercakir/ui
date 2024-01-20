// Button.stories.tsx
import React from 'react';
import { Meta, Story } from '@storybook/react';
import {MyProvider} from '../dist/MyContext'; // @mylib/MyContext in real
import MyButton, { MyButtonProps } from '../dist/MyButton'; // @mylib/MyButton in real

export default {
  title: 'Button',
  component: MyButton,
  decorators: [
    (Story) => (
      <MyProvider initContextValue={{theme: 'dark'}}>
        <Story />
      </MyProvider>
    ),
  ],
} as Meta;

const Template: Story<MyButtonProps> = (args) => <MyButton {...args} />;

export const Outlined = Template.bind({});
Outlined.args = {
  variant: 'outlined',
  defaultLabel: 'Click Me'
};
