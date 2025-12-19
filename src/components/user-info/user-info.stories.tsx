import { UserInfo } from './user-info';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/UserInfo',
  component: UserInfo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A user information display component showing avatar, name, email, and optional role badge. Can be used standalone or as a trigger for dropdown menus.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'Size variant of the user info display',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    showRole: {
      control: 'boolean',
      description: 'Whether to show the role badge',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    showChevron: {
      control: 'boolean',
      description: 'Whether to show the chevron icon (for dropdown triggers)',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    asButton: {
      control: 'boolean',
      description: 'Render as interactive button instead of static div. Only when true, onClick can be used.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    user: {
      description: 'User data object containing name, email, avatarUrl, and role',
    },
  },
} satisfies Meta<typeof UserInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultUser = {
  name: 'Vitalii Verdiiev',
  email: 'vitaliiverdiiev.dev@gmail.com',
  role: 'QA',
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vitalii',
};

export const Default: Story = {
  args: {
    user: defaultUser,
  },
};

export const WithoutAvatar: Story = {
  args: {
    user: {
      name: 'Vitalii Verdiiev',
      email: 'vitaliiverdiiev.dev@gmail.com',
      role: 'Developer',
    },
  },
};

export const WithoutRole: Story = {
  args: {
    user: defaultUser,
    showRole: false,
  },
};

export const WithChevron: Story = {
  args: {
    user: defaultUser,
    showChevron: true,
  },
};

export const Small: Story = {
  args: {
    user: defaultUser,
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    user: defaultUser,
    size: 'lg',
  },
};

export const Interactive: Story = {
  args: {
    user: defaultUser,
    showChevron: true,
    asButton: true,
  },
  render: () => <UserInfo user={defaultUser} showChevron asButton onClick={() => alert('Clicked!')} />,
};

export const AsButton: Story = {
  args: {
    user: defaultUser,
    showChevron: true,
    asButton: true,
  },
};

export const AdminRole: Story = {
  args: {
    user: {
      ...defaultUser,
      role: 'Admin',
    },
  },
};

export const LongEmail: Story = {
  args: {
    user: {
      name: 'Alexander Verylongname',
      email: 'alexander.verylongname@verylongcompanyname.com',
      role: 'Senior Developer',
    },
  },
};

export const AllSizes: Story = {
  args: {
    user: defaultUser,
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-muted-foreground mb-2 text-sm">Small</p>
        <UserInfo user={defaultUser} size="sm" showChevron />
      </div>
      <div>
        <p className="text-muted-foreground mb-2 text-sm">Default</p>
        <UserInfo user={defaultUser} size="default" showChevron />
      </div>
      <div>
        <p className="text-muted-foreground mb-2 text-sm">Large</p>
        <UserInfo user={defaultUser} size="lg" showChevron />
      </div>
    </div>
  ),
};
