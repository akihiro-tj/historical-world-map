import { Tooltip } from '@/components/tooltip';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Tooltip> = {
  component: Tooltip,
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    x: 100,
    y: 100,
    content: 'Tooltip content',
  },
};
