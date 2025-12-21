import { useState } from 'react';
import { fn } from 'storybook/test';
import { InputPassword } from './input-password';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/InputPassword',
  component: InputPassword,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A specialized password input component with built-in visibility toggle. Click the eye icon to show/hide the password.',
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
    showLockIcon: {
      control: 'boolean',
      description: 'Whether to show the lock icon on the left',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    defaultVisible: {
      control: 'boolean',
      description: 'Initial visibility state',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    isError: {
      control: 'boolean',
      description: 'Whether the input is in an error state',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    isSuccess: {
      control: 'boolean',
      description: 'Whether the input is in a success state',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    onChange: {
      action: 'changed',
      description: 'Change handler',
    },
    onVisibilityChange: {
      action: 'visibilityChanged',
      description: 'Visibility change handler',
    },
  },
  args: {
    onChange: fn(),
    onVisibilityChange: fn(),
    placeholder: 'Enter password',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '320px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof InputPassword>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter password',
  },
};

export const WithValue: Story = {
  args: {
    placeholder: 'Enter password',
    defaultValue: 'mysecretpassword',
  },
};

export const StartVisible: Story = {
  args: {
    placeholder: 'Enter password',
    defaultValue: 'visible',
    defaultVisible: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Password starts in visible state.',
      },
    },
  },
};

export const Controlled: Story = {
  render: function ControlledPassword() {
    const [visible, setVisible] = useState(false);

    return (
      <div className="flex flex-col gap-2">
        <InputPassword placeholder="Enter password" visible={visible} onVisibilityChange={setVisible} />
        <p className="text-muted-foreground-ui text-sm">Password is {visible ? 'visible' : 'hidden'}</p>
      </div>
    );
  },
};

export const WithoutLockIcon: Story = {
  args: {
    placeholder: 'Password without lock',
    showLockIcon: false,
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    placeholder: 'Small password',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    placeholder: 'Large password',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Disabled password',
    defaultValue: 'cannot change',
  },
};

export const ErrorState: Story = {
  args: {
    isError: true,
    placeholder: 'Invalid password',
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows error styling for invalid password.',
      },
    },
  },
};

export const SuccessState: Story = {
  args: {
    isSuccess: true,
    placeholder: 'Valid password',
    defaultValue: 'ValidP@ss123',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <InputPassword size="sm" placeholder="Small" />
      <InputPassword size="default" placeholder="Default" />
      <InputPassword size="lg" placeholder="Large" />
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <InputPassword placeholder="Default state" />
      <InputPassword placeholder="Error state" isError />
      <InputPassword placeholder="Success state" isSuccess />
      <InputPassword placeholder="Disabled state" disabled />
    </div>
  ),
};
