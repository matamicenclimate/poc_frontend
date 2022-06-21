import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useQuery } from 'react-query';

import { DataRenderer } from '@/componentes/DataRenderer/DataRenderer';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/DescriptionList',
  component: DataRenderer,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof DataRenderer>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof DataRenderer> = (args) => {
  const testData = useQuery(['data-renderer-storybook'], () => Promise.resolve('Hola'));
  return <DataRenderer<string> data={testData} render={(data) => <p>{data}</p>} />;
};

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {};
