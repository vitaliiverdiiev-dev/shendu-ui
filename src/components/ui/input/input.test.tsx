import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Input } from './input';

describe('Input', () => {
  describe('Rendering', () => {
    it('renders input correctly', () => {
      render(<Input placeholder="Enter text" />);
      expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
    });

    it('renders as an input element', () => {
      render(<Input placeholder="Test" />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('applies data-slot attribute', () => {
      render(<Input placeholder="Test" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('data-slot', 'input');
    });
  });

  describe('Ref forwarding', () => {
    it('forwards ref to input element', () => {
      const ref = createRef<HTMLInputElement>();
      render(<Input ref={ref} placeholder="Test" />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });

    it('allows focus via ref', () => {
      const ref = createRef<HTMLInputElement>();
      render(<Input ref={ref} placeholder="Test" />);
      ref.current?.focus();
      expect(document.activeElement).toBe(ref.current);
    });

    it('forwards ref when icons are present', () => {
      const ref = createRef<HTMLInputElement>();
      render(<Input ref={ref} placeholder="Test" leftIcon={<span>🔍</span>} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });
  });

  describe('Icons', () => {
    it('renders left icon', () => {
      render(<Input leftIcon={<span data-testid="left-icon">🔍</span>} />);
      expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    });

    it('renders right icon', () => {
      render(<Input rightIcon={<span data-testid="right-icon">✓</span>} />);
      expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    });

    it('renders both icons', () => {
      render(
        <Input leftIcon={<span data-testid="left-icon">🔍</span>} rightIcon={<span data-testid="right-icon">✓</span>} />
      );
      expect(screen.getByTestId('left-icon')).toBeInTheDocument();
      expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    });

    it('wraps input in container when icons present', () => {
      const { container } = render(<Input leftIcon={<span>🔍</span>} />);
      expect(container.querySelector('div')).toBeInTheDocument();
    });

    it('does not wrap input when no icons', () => {
      const { container } = render(<Input placeholder="Test" />);
      expect(container.firstChild?.nodeName).toBe('INPUT');
    });
  });

  describe('Sizes', () => {
    it('applies default size classes', () => {
      render(<Input size="default" placeholder="Default" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('h-9');
    });

    it('applies small size classes', () => {
      render(<Input size="sm" placeholder="Small" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('h-8');
    });

    it('applies large size classes', () => {
      render(<Input size="lg" placeholder="Large" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('h-10');
    });
  });

  describe('States', () => {
    it('can be disabled', () => {
      render(<Input disabled placeholder="Disabled" />);
      expect(screen.getByRole('textbox')).toBeDisabled();
    });

    it('applies error state classes', () => {
      render(<Input isError placeholder="Error" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('border-destructive-ui');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('applies success state classes', () => {
      render(<Input isSuccess placeholder="Success" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('border-green-500');
    });

    it('sets aria-invalid when isError is true', () => {
      render(<Input isError placeholder="Error" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
    });

    it('respects explicit aria-invalid', () => {
      render(<Input aria-invalid="grammar" placeholder="Test" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'grammar');
    });
  });

  describe('Input types', () => {
    it('renders text input by default', () => {
      render(<Input placeholder="Text" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text');
    });

    it('renders email input', () => {
      render(<Input type="email" placeholder="Email" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email');
    });

    it('renders password input', () => {
      render(<Input type="password" placeholder="Password" />);
      expect(screen.getByPlaceholderText('Password')).toHaveAttribute('type', 'password');
    });

    it('renders search input', () => {
      render(<Input type="search" placeholder="Search" />);
      expect(screen.getByRole('searchbox')).toHaveAttribute('type', 'search');
    });
  });

  describe('User Interaction', () => {
    it('handles user input', async () => {
      const user = userEvent.setup();
      render(<Input placeholder="Type here" />);

      const input = screen.getByRole('textbox');
      await user.type(input, 'Hello World');

      expect(input).toHaveValue('Hello World');
    });

    it('calls onChange handler', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Input placeholder="Type here" onChange={handleChange} />);

      const input = screen.getByRole('textbox');
      await user.type(input, 'a');

      expect(handleChange).toHaveBeenCalled();
    });

    it('does not allow input when disabled', async () => {
      const user = userEvent.setup();
      render(<Input disabled placeholder="Disabled" />);

      const input = screen.getByRole('textbox');
      await user.type(input, 'Hello');

      expect(input).toHaveValue('');
    });
  });

  describe('Custom className', () => {
    it('applies custom className to input', () => {
      render(<Input className="custom-class" placeholder="Custom" />);
      expect(screen.getByRole('textbox')).toHaveClass('custom-class');
    });

    it('applies wrapperClassName when icons present', () => {
      const { container } = render(
        <Input wrapperClassName="wrapper-class" leftIcon={<span>🔍</span>} placeholder="With wrapper" />
      );
      expect(container.querySelector('.wrapper-class')).toBeInTheDocument();
    });
  });
});
