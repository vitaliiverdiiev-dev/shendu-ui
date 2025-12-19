import { Search, Mail, EyeOff, User, Lock, AlertCircle, CheckCircle } from 'lucide-react';
import { fn } from 'storybook/test';
import { Input } from './input';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A versatile input component with support for left/right icons, multiple sizes, and various states (error, success, disabled).',
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
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'search', 'tel', 'url'],
      description: 'The type of input',
      table: {
        defaultValue: { summary: 'text' },
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
  },
  args: {
    onChange: fn(),
    placeholder: 'Enter text...',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '320px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithLeftIcon: Story = {
  args: {
    placeholder: 'Search...',
    leftIcon: <Search />,
  },
};

export const WithRightIcon: Story = {
  args: {
    placeholder: 'Enter email',
    rightIcon: <Mail />,
  },
};

export const WithBothIcons: Story = {
  args: {
    placeholder: 'Search tags',
    leftIcon: <Search />,
    rightIcon: <AlertCircle />,
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    placeholder: 'Small input',
    leftIcon: <Search />,
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    placeholder: 'Large input',
    leftIcon: <Search />,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Disabled input',
    leftIcon: <Lock />,
  },
};

export const ErrorState: Story = {
  args: {
    isError: true,
    placeholder: 'Invalid input',
    rightIcon: <AlertCircle className="text-destructive" />,
  },
};

export const SuccessState: Story = {
  args: {
    isSuccess: true,
    placeholder: 'Valid input',
    rightIcon: <CheckCircle className="text-green-500" />,
  },
};

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter password',
    leftIcon: <Lock />,
    rightIcon: <EyeOff />,
  },
};

export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'Enter email',
    leftIcon: <Mail />,
  },
};

export const Username: Story = {
  args: {
    placeholder: 'Enter username',
    leftIcon: <User />,
  },
};

export const SearchInput: Story = {
  args: {
    type: 'search',
    placeholder: 'Все теги',
    leftIcon: <Search />,
  },
  parameters: {
    docs: {
      description: {
        story: 'Search input matching the design reference with search icon on the left.',
      },
    },
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Input size="sm" placeholder="Small" leftIcon={<Search />} />
      <Input size="default" placeholder="Default" leftIcon={<Search />} />
      <Input size="lg" placeholder="Large" leftIcon={<Search />} />
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Input placeholder="Default state" leftIcon={<User />} />
      <Input
        placeholder="Error state"
        leftIcon={<User />}
        isError
        rightIcon={<AlertCircle className="text-destructive" />}
      />
      <Input
        placeholder="Success state"
        leftIcon={<User />}
        isSuccess
        rightIcon={<CheckCircle className="text-green-500" />}
      />
      <Input placeholder="Disabled state" leftIcon={<User />} disabled />
    </div>
  ),
};
