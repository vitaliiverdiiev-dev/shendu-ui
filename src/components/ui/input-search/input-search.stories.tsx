import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useState } from 'react';
import { InputSearch } from './input-search';

const meta = {
  title: 'Components/InputSearch',
  component: InputSearch,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A specialized search input component with built-in search icon and clearable functionality. Shows a clear button when text is entered.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg'],
      description: 'The size of the input',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    showClearButton: {
      control: 'boolean',
      description: 'Force show/hide the clear button',
    },
    onChange: {
      action: 'changed',
      description: 'Change handler',
    },
    onClear: {
      action: 'cleared',
      description: 'Clear handler',
    },
  },
  args: {
    onChange: fn(),
    onClear: fn(),
    placeholder: 'Search...',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '320px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof InputSearch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Search...',
  },
};

export const WithDefaultValue: Story = {
  args: {
    placeholder: 'Search...',
    defaultValue: 'Initial search',
  },
};

export const Controlled: Story = {
  render: function ControlledSearch() {
    const [value, setValue] = useState('');

    return (
      <div className="flex flex-col gap-2">
        <InputSearch
          placeholder="Search tags..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onClear={() => setValue('')}
        />
        <p className="text-muted-foreground text-sm">Current value: "{value}"</p>
      </div>
    );
  },
};

export const AllTags: Story = {
  args: {
    placeholder: 'Все теги',
  },
  parameters: {
    docs: {
      description: {
        story: 'Search input matching the design reference.',
      },
    },
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    placeholder: 'Small search',
    defaultValue: 'Clear me',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    placeholder: 'Large search',
    defaultValue: 'Clear me',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Disabled search',
    defaultValue: 'Cannot clear',
  },
};

export const AlwaysShowClear: Story = {
  args: {
    placeholder: 'Always shows clear',
    showClearButton: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Force the clear button to always show, even when empty.',
      },
    },
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <InputSearch size="sm" placeholder="Small" defaultValue="Clearable" />
      <InputSearch size="default" placeholder="Default" defaultValue="Clearable" />
      <InputSearch size="lg" placeholder="Large" defaultValue="Clearable" />
    </div>
  ),
};
