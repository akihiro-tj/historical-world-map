import { Map } from '@/components/map';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Map> = {
  component: Map,
};

export default meta;
type Story = StoryObj<typeof Map>;

export const Default: Story = {};

export const Focused: Story = {
  args: {
    focusedMapFeature: {
      id: 'spain',
      year: '1815',
    },
  },
};
