import { LogOut, Settings, User, HelpCircle } from 'lucide-react';
import { UserMenu } from './user-menu';
import type { UserMenuItem } from '@/components/user-info';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/UserMenu',
  component: UserMenu,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A dropdown menu component with user information trigger. Supports configurable menu items, version display, and multiple sizes.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'Size variant of the user info trigger',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    showRole: {
      control: 'boolean',
      description: 'Whether to show the role badge in the trigger',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: 'Alignment of the dropdown menu',
      table: {
        defaultValue: { summary: 'end' },
      },
    },
    version: {
      control: 'text',
      description: 'Version string to display at the bottom of the menu',
    },
    user: {
      description: 'User data object containing name, email, avatarUrl, and role',
    },
    menuItems: {
      description: 'Array of menu items to display in the dropdown',
    },
  },
} satisfies Meta<typeof UserMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultUser = {
  name: 'Vitalii Verdiiev',
  email: 'vivitaliiverdiiev.dev@gmail.com',
  role: 'QA',
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vitalii',
};

const defaultMenuItems: UserMenuItem[] = [
  {
    id: 'logout',
    label: 'Logout',
    icon: <LogOut className="h-4 w-4" />,
    onClick: () => console.log('Logout clicked'),
    variant: 'destructive',
  },
];

const fullMenuItems: UserMenuItem[] = [
  {
    id: 'profile',
    label: 'Profile',
    icon: <User className="h-4 w-4" />,
    onClick: () => console.log('Profile clicked'),
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <Settings className="h-4 w-4" />,
    onClick: () => console.log('Settings clicked'),
  },
  {
    id: 'help',
    label: 'Help & Support',
    icon: <HelpCircle className="h-4 w-4" />,
    onClick: () => console.log('Help clicked'),
  },
  {
    id: 'logout',
    label: 'Logout',
    icon: <LogOut className="h-4 w-4" />,
    onClick: () => console.log('Logout clicked'),
    variant: 'destructive',
  },
];

export const Default: Story = {
  args: {
    user: defaultUser,
    menuItems: defaultMenuItems,
    version: '1.2.0',
  },
};

export const WithMultipleItems: Story = {
  args: {
    user: defaultUser,
    menuItems: fullMenuItems,
    version: '1.2.0',
  },
};

export const WithoutVersion: Story = {
  args: {
    user: defaultUser,
    menuItems: defaultMenuItems,
  },
};

export const WithoutRole: Story = {
  args: {
    user: defaultUser,
    menuItems: defaultMenuItems,
    version: '1.2.0',
    showRole: false,
  },
};

export const Small: Story = {
  args: {
    user: defaultUser,
    menuItems: defaultMenuItems,
    version: '1.2.0',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    user: defaultUser,
    menuItems: defaultMenuItems,
    version: '1.2.0',
    size: 'lg',
  },
};

export const AlignStart: Story = {
  args: {
    user: defaultUser,
    menuItems: defaultMenuItems,
    version: '1.2.0',
    align: 'start',
  },
  decorators: [
    (Story) => (
      <div className="flex w-[400px] justify-end">
        <Story />
      </div>
    ),
  ],
};

export const AlignCenter: Story = {
  args: {
    user: defaultUser,
    menuItems: defaultMenuItems,
    version: '1.2.0',
    align: 'center',
  },
};

export const WithDisabledItem: Story = {
  args: {
    user: defaultUser,
    menuItems: [
      {
        id: 'profile',
        label: 'Profile',
        icon: <User className="h-4 w-4" />,
        onClick: () => console.log('Profile clicked'),
      },
      {
        id: 'settings',
        label: 'Settings (Disabled)',
        icon: <Settings className="h-4 w-4" />,
        onClick: () => console.log('Settings clicked'),
        disabled: true,
      },
      {
        id: 'logout',
        label: 'Logout',
        icon: <LogOut className="h-4 w-4" />,
        onClick: () => console.log('Logout clicked'),
        variant: 'destructive',
      },
    ],
    version: '1.2.0',
  },
};

export const WithoutAvatar: Story = {
  args: {
    user: {
      name: 'Vitalii Verdiiev',
      email: 'vitaliiverdiiev.dev@gmail.com',
      role: 'Developer',
    },
    menuItems: defaultMenuItems,
    version: '1.2.0',
  },
};

export const AdminUser: Story = {
  args: {
    user: {
      ...defaultUser,
      role: 'Admin',
    },
    menuItems: fullMenuItems,
    version: '2.0.0',
  },
};
