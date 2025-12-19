import { RoleBadge } from './role-badge';
import type { UserRole } from './role-badge.types';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/RoleBadge',
  component: RoleBadge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A specialized badge component for displaying user roles with predefined color schemes. Each role has a unique color combination for easy visual identification.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    role: {
      control: 'select',
      options: ['admin', 'teamlead', 'tech', 'qa', 'buyer', 'trainee'],
      description: 'The user role to display',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
} satisfies Meta<typeof RoleBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Admin: Story = {
  args: {
    role: 'admin',
  },
};

export const Teamlead: Story = {
  args: {
    role: 'teamlead',
  },
};

export const Tech: Story = {
  args: {
    role: 'tech',
  },
};

export const QA: Story = {
  args: {
    role: 'qa',
  },
};

export const Buyer: Story = {
  args: {
    role: 'buyer',
  },
};

export const Trainee: Story = {
  args: {
    role: 'trainee',
  },
};

export const AllRoles: Story = {
  args: { role: 'admin' },
  render: () => {
    const roles: UserRole[] = ['admin', 'teamlead', 'tech', 'qa', 'buyer', 'trainee'];

    return (
      <div className="flex flex-wrap gap-2">
        {roles.map((role) => (
          <RoleBadge key={role} role={role} />
        ))}
      </div>
    );
  },
};

export const WithCustomStyling: Story = {
  args: { role: 'admin' },
  render: () => (
    <div className="flex flex-wrap gap-2">
      <RoleBadge role="admin" className="uppercase" />
      <RoleBadge role="teamlead" className="rounded-full" />
      <RoleBadge role="tech" className="font-bold" />
      <RoleBadge role="qa" className="px-4 py-1" />
    </div>
  ),
};

export const InUserCard: Story = {
  args: { role: 'admin' },
  render: () => (
    <div className="w-64 space-y-4">
      <div className="flex items-center justify-between rounded-lg border p-4">
        <div>
          <div className="font-semibold">John Doe</div>
          <div className="text-sm text-gray-500">john.doe@example.com</div>
        </div>
        <RoleBadge role="admin" />
      </div>

      <div className="flex items-center justify-between rounded-lg border p-4">
        <div>
          <div className="font-semibold">Jane Smith</div>
          <div className="text-sm text-gray-500">jane.smith@example.com</div>
        </div>
        <RoleBadge role="teamlead" />
      </div>

      <div className="flex items-center justify-between rounded-lg border p-4">
        <div>
          <div className="font-semibold">Bob Johnson</div>
          <div className="text-sm text-gray-500">bob.johnson@example.com</div>
        </div>
        <RoleBadge role="buyer" />
      </div>
    </div>
  ),
};

export const InTable: Story = {
  args: { role: 'admin' },
  render: () => (
    <div className="overflow-hidden rounded-lg border">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold">Name</th>
            <th className="px-4 py-2 text-left text-sm font-semibold">Email</th>
            <th className="px-4 py-2 text-left text-sm font-semibold">Role</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          <tr>
            <td className="px-4 py-2">John Doe</td>
            <td className="px-4 py-2 text-sm text-gray-600">john@example.com</td>
            <td className="px-4 py-2">
              <RoleBadge role="admin" />
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2">Jane Smith</td>
            <td className="px-4 py-2 text-sm text-gray-600">jane@example.com</td>
            <td className="px-4 py-2">
              <RoleBadge role="teamlead" />
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2">Bob Johnson</td>
            <td className="px-4 py-2 text-sm text-gray-600">bob@example.com</td>
            <td className="px-4 py-2">
              <RoleBadge role="tech" />
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2">Alice Williams</td>
            <td className="px-4 py-2 text-sm text-gray-600">alice@example.com</td>
            <td className="px-4 py-2">
              <RoleBadge role="qa" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  ),
};

export const ColorPalette: Story = {
  args: { role: 'admin' },
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="mb-2 text-sm font-semibold">Role Color Scheme</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <RoleBadge role="admin" />
            <span className="text-sm text-gray-600">Admin - Red (High authority)</span>
          </div>
          <div className="flex items-center gap-4">
            <RoleBadge role="teamlead" />
            <span className="text-sm text-gray-600">Team Lead - Blue (Leadership)</span>
          </div>
          <div className="flex items-center gap-4">
            <RoleBadge role="buyer" />
            <span className="text-sm text-gray-600">Buyer - Green (Commerce)</span>
          </div>
          <div className="flex items-center gap-4">
            <RoleBadge role="trainee" />
            <span className="text-sm text-gray-600">Trainee - Cyan (Learning)</span>
          </div>
          <div className="flex items-center gap-4">
            <RoleBadge role="tech" />
            <span className="text-sm text-gray-600">Tech - Purple (Technical)</span>
          </div>
          <div className="flex items-center gap-4">
            <RoleBadge role="qa" />
            <span className="text-sm text-gray-600">QA - Yellow (Quality)</span>
          </div>
        </div>
      </div>
    </div>
  ),
};
