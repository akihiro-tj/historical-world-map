import { Map } from '@/components/map';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Map> = {
  component: Map,
};

export default meta;
type Story = StoryObj<typeof Map>;

const tileSourceURL = '/data/1815.pmtiles';
const initialViewState = {
  longitude: -3.7492,
  latitude: 40.4637,
  zoom: 3,
};

export const Default: Story = {
  args: {
    tileSourceURL,
    initialViewState,
  },
};

export const Focused: Story = {
  args: {
    tileSourceURL,
    focusedFeatureId: 'spain',
    initialViewState,
  },
};
