import { ComponentMeta,ComponentStory } from '@storybook/react';

import { Button } from './Button';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Button',
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => <Button {...args}>Click me!</Button>;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  variant: 'primary',
};

export const Light = Template.bind({});
Light.args = {
  variant: 'light',
};

export const Dark = Template.bind({});
Dark.args = {
  variant: 'dark',
};

export const Grey = Template.bind({});
Grey.args = {
  variant: 'grey',
};

export const Danger = Template.bind({});
Danger.args = {
  variant: 'danger',
};
