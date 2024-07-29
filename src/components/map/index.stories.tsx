import { Map } from '@/components/map';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Map> = {
  component: Map,
};

export default meta;
type Story = StoryObj<typeof Map>;

const initialViewState = {
  longitude: -3.7492,
  latitude: 40.4637,
  zoom: 3,
};

export const Default: Story = {
  args: {
    year: 1815,
    initialViewState,
  },
};

export const Focused: Story = {
  args: {
    year: 1815,
    countryId: 'Spain',
    initialViewState,
  },
};
