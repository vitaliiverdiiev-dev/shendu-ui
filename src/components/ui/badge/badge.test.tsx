import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Badge } from './badge';

describe('Badge', () => {
  describe('Rendering', () => {
    it('renders children correctly', () => {
      render(<Badge>Test Badge</Badge>);
      expect(screen.getByText('Test Badge')).toBeInTheDocument();
    });

    it('renders as span by default', () => {
      render(<Badge>Badge</Badge>);
      const badge = screen.getByText('Badge');
      expect(badge.tagName).toBe('SPAN');
    });
  });

  describe('Variants', () => {
    it('applies default variant classes', () => {
      render(<Badge variant="default">Default</Badge>);
      const badge = screen.getByText('Default');
      expect(badge).toHaveClass('bg-primary', 'text-primary-foreground');
    });

    it('applies secondary variant classes', () => {
      render(<Badge variant="secondary">Secondary</Badge>);
      const badge = screen.getByText('Secondary');
      expect(badge).toHaveClass('bg-secondary', 'text-secondary-foreground');
    });

    it('applies destructive variant classes', () => {
      render(<Badge variant="destructive">Destructive</Badge>);
      const badge = screen.getByText('Destructive');
      expect(badge).toHaveClass('bg-destructive', 'text-white');
    });

    it('applies outline variant classes', () => {
      render(<Badge variant="outline">Outline</Badge>);
      const badge = screen.getByText('Outline');
      expect(badge).toHaveClass('text-foreground');
    });
  });

  describe('Custom className', () => {
    it('allows custom className to be added', () => {
      render(<Badge className="custom-class">Custom</Badge>);
      expect(screen.getByText('Custom')).toHaveClass('custom-class');
    });

    it('merges custom className with variant classes', () => {
      render(
        <Badge variant="secondary" className="text-xs">
          Secondary Badge
        </Badge>
      );
      const badge = screen.getByText('Secondary Badge');
      expect(badge).toHaveClass('bg-secondary', 'text-secondary-foreground', 'text-xs');
    });
  });

  describe('asChild', () => {
    it('renders as child component when asChild is true', () => {
      render(
        <Badge asChild>
          <a href="/link">Link Badge</a>
        </Badge>
      );
      const link = screen.getByRole('link', { name: 'Link Badge' });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/link');
    });
  });

  describe('Data attributes', () => {
    it('includes data-slot attribute', () => {
      render(<Badge>Test</Badge>);
      const badge = screen.getByText('Test');
      expect(badge).toHaveAttribute('data-slot', 'badge');
    });
  });

  describe('HTML Attributes', () => {
    it('forwards HTML attributes to the element', () => {
      render(
        <Badge id="test-id" data-testid="badge-element">
          Badge
        </Badge>
      );
      const badge = screen.getByTestId('badge-element');
      expect(badge).toHaveAttribute('id', 'test-id');
    });
  });
});
