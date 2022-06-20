import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useForm } from 'react-hook-form';

import { CurrencyInput } from '../CurrencyInput';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Forms/Currency',
  component: CurrencyInput,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: { onChange: { action: 'changed' } },
} as ComponentMeta<typeof CurrencyInput>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof CurrencyInput> = (args) => {
  const methods = useForm<{ select: string }>();
  return <CurrencyInput<any> {...methods} {...args} name="select"></CurrencyInput>;
};

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  name: 'test',
};
