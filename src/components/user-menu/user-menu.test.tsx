import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { UserMenu } from './user-menu';
import type { UserData, UserMenuItem } from '@/components/user-info';

const mockUser: UserData = {
  name: 'John Doe',
  email: 'john@example.com',
  role: 'Admin',
  avatarUrl: 'https://example.com/avatar.jpg',
};

const mockMenuItems: UserMenuItem[] = [
  {
    id: 'profile',
    label: 'Profile',
    onClick: vi.fn(),
  },
  {
    id: 'logout',
    label: 'Logout',
    onClick: vi.fn(),
    variant: 'destructive',
  },
];

describe('UserMenu', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders trigger with user info', () => {
      render(<UserMenu user={mockUser} menuItems={mockMenuItems} />);
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('john@example.com')).toBeInTheDocument();
    });

    it('renders role badge in trigger when showRole is true', () => {
      render(<UserMenu user={mockUser} menuItems={mockMenuItems} showRole />);
      expect(screen.getByText('Admin')).toBeInTheDocument();
    });

    it('hides role badge when showRole is false', () => {
      render(<UserMenu user={mockUser} menuItems={mockMenuItems} showRole={false} />);
      expect(screen.queryByText('Admin')).not.toBeInTheDocument();
    });

    it('shows version when provided', async () => {
      const user = userEvent.setup();
      render(<UserMenu user={mockUser} menuItems={mockMenuItems} version="1.2.0" />);

      await user.click(screen.getByRole('button'));

      await waitFor(() => {
        expect(screen.getByText('Version 1.2.0')).toBeInTheDocument();
      });
    });

    it('does not show version section when version is not provided', async () => {
      const user = userEvent.setup();
      render(<UserMenu user={mockUser} menuItems={mockMenuItems} />);

      await user.click(screen.getByRole('button'));

      await waitFor(() => {
        expect(screen.queryByText(/Version/)).not.toBeInTheDocument();
      });
    });
  });

  describe('Dropdown Behavior', () => {
    it('opens dropdown when trigger is clicked', async () => {
      const user = userEvent.setup();
      render(<UserMenu user={mockUser} menuItems={mockMenuItems} />);

      await user.click(screen.getByRole('button'));

      await waitFor(() => {
        expect(screen.getByRole('menu')).toBeInTheDocument();
      });
    });

    it('renders all menu items when open', async () => {
      const user = userEvent.setup();
      render(<UserMenu user={mockUser} menuItems={mockMenuItems} />);

      await user.click(screen.getByRole('button'));

      await waitFor(() => {
        expect(screen.getByRole('menuitem', { name: 'Profile' })).toBeInTheDocument();
        expect(screen.getByRole('menuitem', { name: 'Logout' })).toBeInTheDocument();
      });
    });

    it('calls onClick handler when menu item is clicked', async () => {
      const user = userEvent.setup();
      const onProfileClick = vi.fn();
      const menuItems: UserMenuItem[] = [{ id: 'profile', label: 'Profile', onClick: onProfileClick }];

      render(<UserMenu user={mockUser} menuItems={menuItems} />);

      await user.click(screen.getByRole('button'));

      await waitFor(async () => {
        const profileItem = screen.getByRole('menuitem', { name: 'Profile' });
        await user.click(profileItem);
      });

      expect(onProfileClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Sizes', () => {
    it('passes size prop to UserInfo trigger', () => {
      const { container } = render(<UserMenu user={mockUser} menuItems={mockMenuItems} size="sm" />);
      const userInfo = container.querySelector('.gap-1\\.5');
      expect(userInfo).toBeInTheDocument();
    });

    it('applies large size to trigger', () => {
      const { container } = render(<UserMenu user={mockUser} menuItems={mockMenuItems} size="lg" />);
      const userInfo = container.querySelector('.gap-3');
      expect(userInfo).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has aria-expanded attribute on trigger', async () => {
      const user = userEvent.setup();
      render(<UserMenu user={mockUser} menuItems={mockMenuItems} />);

      const trigger = screen.getByRole('button');
      expect(trigger).toHaveAttribute('aria-expanded', 'false');

      await user.click(trigger);

      await waitFor(() => {
        expect(trigger).toHaveAttribute('aria-expanded', 'true');
      });
    });

    it('has aria-haspopup attribute on trigger', () => {
      render(<UserMenu user={mockUser} menuItems={mockMenuItems} />);
      expect(screen.getByRole('button')).toHaveAttribute('aria-haspopup', 'menu');
    });
  });
});
