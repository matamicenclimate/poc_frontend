import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useForm } from 'react-hook-form';

import { Select } from '../Select';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Forms/Select',
  component: Select,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: { onChange: { action: 'changed' } },
} as ComponentMeta<typeof Select>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Select> = (args) => {
  const methods = useForm<{ select: string }>();
  return <Select<any> {...methods} {...args} name="select"></Select>;
};

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  options: [
    { label: 'test1', value: 'test1' },
    { label: 'test2', value: 'test2' },
    { label: 'test3', value: 'test3' },
  ],
};

export const Multi = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Multi.args = {
  options: [
    { label: 'test1', value: 'test1' },
    { label: 'test2', value: 'test2' },
    { label: 'test3', value: 'test3' },
  ],
  isMulti: true,
};
