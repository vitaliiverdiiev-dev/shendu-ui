import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserInfo } from './user-info';
import type { UserData } from './user-info.types';

const mockUser: UserData = {
  name: 'John Doe',
  email: 'john@example.com',
  role: 'Admin',
  avatarUrl: 'https://example.com/avatar.jpg',
};

describe('UserInfo', () => {
  describe('Rendering', () => {
    it('renders user name correctly', () => {
      render(<UserInfo user={mockUser} />);
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    it('renders user email correctly', () => {
      render(<UserInfo user={mockUser} />);
      expect(screen.getByText('john@example.com')).toBeInTheDocument();
    });

    it('renders role badge when showRole is true', () => {
      render(<UserInfo user={mockUser} showRole />);
      expect(screen.getByText('Admin')).toBeInTheDocument();
    });

    it('hides role badge when showRole is false', () => {
      render(<UserInfo user={mockUser} showRole={false} />);
      expect(screen.queryByText('Admin')).not.toBeInTheDocument();
    });

    it('renders avatar image when avatarUrl is provided', () => {
      const { container } = render(<UserInfo user={mockUser} />);
      const avatar = container.querySelector('[data-slot="avatar"]');
      expect(avatar).toBeInTheDocument();
      expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('renders initials when avatarUrl is not provided', () => {
      const userWithoutAvatar = { ...mockUser, avatarUrl: undefined };
      render(<UserInfo user={userWithoutAvatar} />);
      expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('renders chevron icon when showChevron is true', () => {
      const { container } = render(<UserInfo user={mockUser} showChevron />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('does not render chevron icon when showChevron is false', () => {
      const { container } = render(<UserInfo user={mockUser} showChevron={false} />);
      expect(container.querySelector('svg')).not.toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    it('applies small size classes', () => {
      const { container } = render(<UserInfo user={mockUser} size="sm" />);
      expect(container.firstChild).toHaveClass('gap-1.5');
    });

    it('applies default size classes', () => {
      const { container } = render(<UserInfo user={mockUser} size="default" />);
      expect(container.firstChild).toHaveClass('gap-2');
    });

    it('applies large size classes', () => {
      const { container } = render(<UserInfo user={mockUser} size="lg" />);
      expect(container.firstChild).toHaveClass('gap-3');
    });
  });

  describe('Interactivity', () => {
    it('calls onClick when clicked and asButton is true', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<UserInfo user={mockUser} asButton onClick={handleClick} />);

      await user.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('renders as button when asButton is true', () => {
      render(<UserInfo user={mockUser} asButton />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('renders as div when asButton is false', () => {
      render(<UserInfo user={mockUser} />);
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('responds to Enter key when asButton is true', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<UserInfo user={mockUser} asButton onClick={handleClick} />);

      const button = screen.getByRole('button');
      button.focus();
      await user.keyboard('{Enter}');

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('responds to Space key when asButton is true', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<UserInfo user={mockUser} asButton onClick={handleClick} />);

      const button = screen.getByRole('button');
      button.focus();
      await user.keyboard(' ');

      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Accessibility', () => {
    it('is focusable when asButton is true', () => {
      render(<UserInfo user={mockUser} asButton />);
      const button = screen.getByRole('button');
      button.focus();
      expect(button).toHaveFocus();
    });

    it('is not focusable when asButton is false', () => {
      const { container } = render(<UserInfo user={mockUser} />);
      expect(container.firstChild).not.toHaveAttribute('tabIndex');
    });
  });

  describe('Initials Generation', () => {
    it('generates correct initials from two-word name', () => {
      const userWithTwoWords = { ...mockUser, name: 'John Doe', avatarUrl: undefined };
      render(<UserInfo user={userWithTwoWords} />);
      expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('generates correct initials from single-word name', () => {
      const userWithSingleWord = { ...mockUser, name: 'John', avatarUrl: undefined };
      render(<UserInfo user={userWithSingleWord} />);
      expect(screen.getByText('J')).toBeInTheDocument();
    });

    it('generates correct initials from three-word name (takes first two)', () => {
      const userWithThreeWords = { ...mockUser, name: 'John Michael Doe', avatarUrl: undefined };
      render(<UserInfo user={userWithThreeWords} />);
      expect(screen.getByText('JM')).toBeInTheDocument();
    });
  });
});
