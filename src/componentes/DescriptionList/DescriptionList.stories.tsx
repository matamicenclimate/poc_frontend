import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Dl, DlItem } from './DescriptionList';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/DescriptionList',
  component: DlItem,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof DlItem>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof DlItem> = (args) => {
  return (
    <Dl>
      <DlItem fullWidth {...args}></DlItem>
      <hr className="col-span-2" />
      <DlItem fullWidth {...args}></DlItem>
      <DlItem {...args}></DlItem>
      <DlItem {...args}></DlItem>
    </Dl>
  );
};

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  dt: 'Description title',
  dd: 'Description details',
};

export const Multi = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Multi.args = {
  dt: 'Description title',
  dd: ['Description details', 'Description details', 'Description details'],
};
