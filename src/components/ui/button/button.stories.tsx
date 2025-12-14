import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Button } from './button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A versatile button component with multiple variants (default, destructive, outline, secondary, ghost, link) and sizes (default, sm, lg, icon).',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
      description: 'The visual style variant of the button',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
      description: 'The size of the button',
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
    isLoading: {
      control: 'boolean',
      description: 'Shows a loading spinner and disables the button',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    children: {
      control: 'text',
      description: 'Button content',
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler',
    },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Default: Story = {
  args: {
    children: 'Button',
  },
};


export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Delete',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
};


export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost',
  },
};


export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Link Button',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large Button',
  },
};

export const Icon: Story = {
  args: {
    size: 'icon',
    children: '🔍',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled',
  },
};


export const Loading: Story = {
  args: {
    isLoading: true,
    children: 'Submit',
  },
};


export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">⚙️</Button>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button>
        <span>📧</span>
        Login with Email
      </Button>
      <Button variant="outline">
        <span>⬇️</span>
        Download
      </Button>
    </div>
  ),
};
