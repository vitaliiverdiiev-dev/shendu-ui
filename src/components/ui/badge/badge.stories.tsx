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
      options: ['default', 'secondary', 'destructive', 'warning', 'success', 'info', 'outline'],
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

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Warning',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Success',
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    children: 'Info',
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
      <Badge variant="warning">Warning</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="info">Info</Badge>
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
      <Badge variant="info">New</Badge>
      <Badge variant="default">In Progress</Badge>
      <Badge variant="warning">Pending</Badge>
      <Badge variant="success">Completed</Badge>
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

export const StateColors: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        <Badge className="bg-destructive text-destructive-foreground border-destructive">Destructive</Badge>
        <Badge className="bg-warning text-warning-foreground border-warning">Warning</Badge>
        <Badge className="bg-success text-success-foreground border-success">Success</Badge>
        <Badge className="bg-info text-info-foreground border-info">Info</Badge>
      </div>
      <div className="flex flex-wrap gap-2">
        <Badge className="border-destructive text-destructive-foreground bg-transparent">Destructive Outline</Badge>
        <Badge className="border-warning text-warning-foreground bg-transparent">Warning Outline</Badge>
        <Badge className="border-success text-success-foreground bg-transparent">Success Outline</Badge>
        <Badge className="border-info text-info-foreground bg-transparent">Info Outline</Badge>
      </div>
    </div>
  ),
};

export const StateColorsWithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge className="bg-destructive text-destructive-foreground border-destructive">
        <span>✕</span>
        Error
      </Badge>
      <Badge className="bg-warning text-warning-foreground border-warning">
        <span>⚠</span>
        Warning
      </Badge>
      <Badge className="bg-success text-success-foreground border-success">
        <span>✓</span>
        Success
      </Badge>
      <Badge className="bg-info text-info-foreground border-info">
        <span>ℹ</span>
        Info
      </Badge>
    </div>
  ),
};
