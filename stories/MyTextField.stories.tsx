// Button.stories.tsx
import React from 'react';
import { Meta, Story } from '@storybook/react';
import {MyProvider} from '../dist/MyContext'; // @mylib/MyContext in real
import MyTextField from '../dist/MyTextField'; // @mylib/MyButton in real

export default {
  title: 'TextField',
  component: MyTextField,
  decorators: [
    (Story) => (
      <MyProvider initContextValue={{theme: 'dark'}}>
        <Story />
      </MyProvider>
    ),
  ],
} as Meta;

const Template: Story = (args) => <MyTextField {...args} />;

export const Outlined = Template.bind({});
Outlined.args = {
  variant: 'outlined',
  defaultLabel: 'Click Me'
};
