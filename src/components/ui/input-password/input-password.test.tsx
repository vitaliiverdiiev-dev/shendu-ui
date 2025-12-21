import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { InputPassword } from './input-password';

describe('InputPassword', () => {
  describe('Rendering', () => {
    it('renders password input correctly', () => {
      render(<InputPassword placeholder="Password" />);
      expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    });

    it('renders as password type by default', () => {
      render(<InputPassword placeholder="Password" />);
      expect(screen.getByPlaceholderText('Password')).toHaveAttribute('type', 'password');
    });

    it('renders lock icon by default', () => {
      const { container } = render(<InputPassword placeholder="Password" />);
      expect(container.querySelectorAll('svg').length).toBeGreaterThanOrEqual(2);
    });

    it('hides lock icon when showLockIcon is false', () => {
      const { container } = render(<InputPassword placeholder="Password" showLockIcon={false} />);
      expect(container.querySelectorAll('svg').length).toBe(1);
    });

    it('renders custom lock icon', () => {
      render(<InputPassword placeholder="Password" lockIcon={<span data-testid="custom-lock">🔒</span>} />);
      expect(screen.getByTestId('custom-lock')).toBeInTheDocument();
    });
  });

  describe('Ref forwarding', () => {
    it('forwards ref to input element', () => {
      const ref = createRef<HTMLInputElement>();
      render(<InputPassword ref={ref} placeholder="Password" />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });

    it('allows focus via ref', () => {
      const ref = createRef<HTMLInputElement>();
      render(<InputPassword ref={ref} placeholder="Password" />);
      ref.current?.focus();
      expect(document.activeElement).toBe(ref.current);
    });
  });

  describe('Visibility toggle', () => {
    it('toggles password visibility when button is clicked', async () => {
      const user = userEvent.setup();
      render(<InputPassword placeholder="Password" />);

      const input = screen.getByPlaceholderText('Password');
      const toggleButton = screen.getByRole('button', { name: 'Show password' });

      expect(input).toHaveAttribute('type', 'password');

      await user.click(toggleButton);

      expect(input).toHaveAttribute('type', 'text');
      expect(screen.getByRole('button', { name: 'Hide password' })).toBeInTheDocument();
    });

    it('starts visible when defaultVisible is true', () => {
      render(<InputPassword placeholder="Password" defaultVisible />);
      expect(screen.getByPlaceholderText('Password')).toHaveAttribute('type', 'text');
    });

    it('calls onVisibilityChange when toggled', async () => {
      const user = userEvent.setup();
      const handleVisibilityChange = vi.fn();
      render(<InputPassword placeholder="Password" onVisibilityChange={handleVisibilityChange} />);

      await user.click(screen.getByRole('button', { name: 'Show password' }));

      expect(handleVisibilityChange).toHaveBeenCalledWith(true);
    });

    it('works with controlled visibility', async () => {
      const handleVisibilityChange = vi.fn();
      const { rerender } = render(
        <InputPassword placeholder="Password" visible={false} onVisibilityChange={handleVisibilityChange} />
      );

      expect(screen.getByPlaceholderText('Password')).toHaveAttribute('type', 'password');

      rerender(<InputPassword placeholder="Password" visible={true} onVisibilityChange={handleVisibilityChange} />);

      expect(screen.getByPlaceholderText('Password')).toHaveAttribute('type', 'text');
    });

    it('renders custom show/hide icons', async () => {
      const user = userEvent.setup();
      render(
        <InputPassword
          placeholder="Password"
          showPasswordIcon={<span data-testid="custom-show">👁</span>}
          hidePasswordIcon={<span data-testid="custom-hide">🙈</span>}
        />
      );

      expect(screen.getByTestId('custom-show')).toBeInTheDocument();

      await user.click(screen.getByRole('button'));

      expect(screen.getByTestId('custom-hide')).toBeInTheDocument();
    });

    it('has correct aria-pressed attribute', async () => {
      const user = userEvent.setup();
      render(<InputPassword placeholder="Password" />);

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-pressed', 'false');

      await user.click(button);

      expect(button).toHaveAttribute('aria-pressed', 'true');
    });
  });

  describe('Sizes', () => {
    it('applies default size classes', () => {
      render(<InputPassword size="default" placeholder="Password" />);
      expect(screen.getByPlaceholderText('Password')).toHaveClass('h-9');
    });

    it('applies small size classes', () => {
      render(<InputPassword size="sm" placeholder="Password" />);
      expect(screen.getByPlaceholderText('Password')).toHaveClass('h-8');
    });

    it('applies large size classes', () => {
      render(<InputPassword size="lg" placeholder="Password" />);
      expect(screen.getByPlaceholderText('Password')).toHaveClass('h-10');
    });
  });

  describe('States', () => {
    it('can be disabled', () => {
      render(<InputPassword disabled placeholder="Password" />);
      expect(screen.getByPlaceholderText('Password')).toBeDisabled();
    });

    it('disables toggle button when input is disabled', () => {
      render(<InputPassword disabled placeholder="Password" />);
      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('applies error state classes', () => {
      render(<InputPassword isError placeholder="Password" />);
      const input = screen.getByPlaceholderText('Password');
      expect(input).toHaveClass('border-destructive-ui');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('applies success state classes', () => {
      render(<InputPassword isSuccess placeholder="Password" />);
      expect(screen.getByPlaceholderText('Password')).toHaveClass('border-green-500');
    });
  });

  describe('User interaction', () => {
    it('handles user input', async () => {
      const user = userEvent.setup();
      render(<InputPassword placeholder="Password" />);

      const input = screen.getByPlaceholderText('Password');
      await user.type(input, 'secret123');

      expect(input).toHaveValue('secret123');
    });

    it('does not allow input when disabled', async () => {
      const user = userEvent.setup();
      render(<InputPassword disabled placeholder="Password" />);

      const input = screen.getByPlaceholderText('Password');
      await user.type(input, 'secret');

      expect(input).toHaveValue('');
    });
  });

  describe('Custom className', () => {
    it('applies custom className to input', () => {
      render(<InputPassword className="custom-class" placeholder="Password" />);
      expect(screen.getByPlaceholderText('Password')).toHaveClass('custom-class');
    });

    it('applies wrapperClassName to container', () => {
      const { container } = render(<InputPassword wrapperClassName="wrapper-class" placeholder="Password" />);
      expect(container.querySelector('.wrapper-class')).toBeInTheDocument();
    });
  });
});
