import { Badge } from './badge';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A badge component for displaying status, labels, or counts. Supports multiple variants including default, secondary, destructive, and outline styles.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline'],
      description: 'The visual style variant of the badge',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    asChild: {
      control: 'boolean',
      description: 'Render as child component using Radix Slot',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    children: {
      control: 'text',
      description: 'Badge content',
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Badge',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Destructive',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">
        <span>✓</span>
        Active
      </Badge>
      <Badge variant="secondary">
        <span>⚠</span>
        Warning
      </Badge>
      <Badge variant="destructive">
        <span>✕</span>
        Error
      </Badge>
      <Badge variant="outline">
        <span>ℹ</span>
        Info
      </Badge>
    </div>
  ),
};

export const StatusBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="secondary">New</Badge>
      <Badge variant="default">In Progress</Badge>
      <Badge variant="outline">Pending</Badge>
      <Badge variant="destructive">Closed</Badge>
    </div>
  ),
};

export const CountBadges: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <span>Notifications</span>
        <Badge variant="destructive">5</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span>Messages</span>
        <Badge variant="default">12</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span>Tasks</span>
        <Badge variant="secondary">3</Badge>
      </div>
    </div>
  ),
};

export const AsLink: Story = {
  render: () => (
    <Badge asChild variant="secondary">
      <a href="#" className="cursor-pointer">
        Clickable Badge
      </a>
    </Badge>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge className="rounded-sm">Square Corners</Badge>
      <Badge className="uppercase">Uppercase</Badge>
      <Badge className="font-bold">Bold</Badge>
      <Badge className="px-4 py-1">Large Padding</Badge>
    </div>
  ),
};
