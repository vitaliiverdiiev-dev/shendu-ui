import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { InputSearch } from './input-search';

describe('InputSearch', () => {
  describe('Rendering', () => {
    it('renders search input correctly', () => {
      render(<InputSearch placeholder="Search..." />);
      expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    });

    it('renders as a search input type', () => {
      render(<InputSearch placeholder="Search" />);
      expect(screen.getByRole('searchbox')).toHaveAttribute('type', 'search');
    });

    it('renders search icon by default', () => {
      const { container } = render(<InputSearch placeholder="Search" />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('renders custom search icon', () => {
      render(<InputSearch placeholder="Search" searchIcon={<span data-testid="custom-search">🔍</span>} />);
      expect(screen.getByTestId('custom-search')).toBeInTheDocument();
    });
  });

  describe('Ref forwarding', () => {
    it('forwards ref to input element', () => {
      const ref = createRef<HTMLInputElement>();
      render(<InputSearch ref={ref} placeholder="Search" />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });

    it('allows focus via ref', () => {
      const ref = createRef<HTMLInputElement>();
      render(<InputSearch ref={ref} placeholder="Search" />);
      ref.current?.focus();
      expect(document.activeElement).toBe(ref.current);
    });
  });

  describe('Clear button', () => {
    it('shows clear button when there is value (uncontrolled)', async () => {
      const user = userEvent.setup();
      render(<InputSearch placeholder="Search" />);

      const input = screen.getByRole('searchbox');
      await user.type(input, 'test');

      expect(screen.getByRole('button', { name: 'Clear search' })).toBeInTheDocument();
    });

    it('shows clear button when value prop is provided (controlled)', () => {
      render(<InputSearch placeholder="Search" value="test" onChange={() => {}} />);
      expect(screen.getByRole('button', { name: 'Clear search' })).toBeInTheDocument();
    });

    it('hides clear button when value is empty', () => {
      render(<InputSearch placeholder="Search" value="" onChange={() => {}} />);
      expect(screen.queryByRole('button', { name: 'Clear search' })).not.toBeInTheDocument();
    });

    it('calls onClear when clear button is clicked', async () => {
      const user = userEvent.setup();
      const handleClear = vi.fn();
      render(<InputSearch placeholder="Search" value="test" onClear={handleClear} onChange={() => {}} />);

      await user.click(screen.getByRole('button', { name: 'Clear search' }));

      expect(handleClear).toHaveBeenCalled();
    });

    it('clears value when clear button clicked (uncontrolled)', async () => {
      const user = userEvent.setup();
      render(<InputSearch placeholder="Search" defaultValue="initial" />);

      const input = screen.getByRole('searchbox');
      expect(input).toHaveValue('initial');

      await user.click(screen.getByRole('button', { name: 'Clear search' }));

      expect(input).toHaveValue('');
    });

    it('renders custom clear icon', async () => {
      const user = userEvent.setup();
      render(<InputSearch placeholder="Search" clearIcon={<span data-testid="custom-clear">✕</span>} />);

      await user.type(screen.getByRole('searchbox'), 'test');

      expect(screen.getByTestId('custom-clear')).toBeInTheDocument();
    });

    it('respects showClearButton prop', () => {
      render(<InputSearch placeholder="Search" value="test" showClearButton={false} onChange={() => {}} />);
      expect(screen.queryByRole('button', { name: 'Clear search' })).not.toBeInTheDocument();
    });

    it('can force show clear button even when empty', () => {
      render(<InputSearch placeholder="Search" showClearButton={true} />);
      expect(screen.getByRole('button', { name: 'Clear search' })).toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    it('applies default size classes', () => {
      render(<InputSearch size="default" placeholder="Search" />);
      expect(screen.getByRole('searchbox')).toHaveClass('h-9');
    });

    it('applies small size classes', () => {
      render(<InputSearch size="sm" placeholder="Search" />);
      expect(screen.getByRole('searchbox')).toHaveClass('h-8');
    });

    it('applies large size classes', () => {
      render(<InputSearch size="lg" placeholder="Search" />);
      expect(screen.getByRole('searchbox')).toHaveClass('h-10');
    });
  });

  describe('States', () => {
    it('can be disabled', () => {
      render(<InputSearch disabled placeholder="Search" />);
      expect(screen.getByRole('searchbox')).toBeDisabled();
    });

    it('disables clear button when input is disabled', () => {
      render(<InputSearch disabled value="test" placeholder="Search" onChange={() => {}} />);
      expect(screen.getByRole('button', { name: 'Clear search' })).toBeDisabled();
    });
  });

  describe('User interaction', () => {
    it('handles user input', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<InputSearch placeholder="Search" onChange={handleChange} />);

      await user.type(screen.getByRole('searchbox'), 'hello');

      expect(handleChange).toHaveBeenCalled();
    });

    it('works with controlled value', async () => {
      const handleChange = vi.fn();
      const { rerender } = render(<InputSearch placeholder="Search" value="initial" onChange={handleChange} />);

      expect(screen.getByRole('searchbox')).toHaveValue('initial');

      rerender(<InputSearch placeholder="Search" value="updated" onChange={handleChange} />);

      expect(screen.getByRole('searchbox')).toHaveValue('updated');
    });
  });

  describe('Custom className', () => {
    it('applies custom className to input', () => {
      render(<InputSearch className="custom-class" placeholder="Search" />);
      expect(screen.getByRole('searchbox')).toHaveClass('custom-class');
    });

    it('applies wrapperClassName to container', () => {
      const { container } = render(<InputSearch wrapperClassName="wrapper-class" placeholder="Search" />);
      expect(container.querySelector('.wrapper-class')).toBeInTheDocument();
    });
  });
});
