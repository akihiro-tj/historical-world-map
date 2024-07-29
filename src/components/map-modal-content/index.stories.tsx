import { MapModalContent } from '@/components/map-modal-content';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof MapModalContent> = {
  component: MapModalContent,
};

export default meta;
type Story = StoryObj<typeof MapModalContent>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    mapProps: {
      year: 1815,
      focusedFeatureId: 'Spain',
      initialViewState: {
        longitude: -3.7492,
        latitude: 40.4637,
        zoom: 3,
      },
    },
  },
};
