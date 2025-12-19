import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Text } from './text';

describe('Text', () => {
  describe('Rendering', () => {
    it('renders children correctly', () => {
      render(<Text>Test content</Text>);
      expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('renders as paragraph by default', () => {
      render(<Text>Default paragraph</Text>);
      const element = screen.getByText('Default paragraph');
      expect(element.tagName).toBe('P');
    });

    it('renders as h1 when as="h1"', () => {
      render(<Text as="h1">Heading 1</Text>);
      const element = screen.getByRole('heading', { level: 1 });
      expect(element).toHaveTextContent('Heading 1');
    });

    it('renders as h2 when as="h2"', () => {
      render(<Text as="h2">Heading 2</Text>);
      const element = screen.getByRole('heading', { level: 2 });
      expect(element).toHaveTextContent('Heading 2');
    });

    it('renders as h3 when as="h3"', () => {
      render(<Text as="h3">Heading 3</Text>);
      const element = screen.getByRole('heading', { level: 3 });
      expect(element).toHaveTextContent('Heading 3');
    });

    it('renders as h4 when as="h4"', () => {
      render(<Text as="h4">Heading 4</Text>);
      const element = screen.getByRole('heading', { level: 4 });
      expect(element).toHaveTextContent('Heading 4');
    });

    it('renders as h5 when as="h5"', () => {
      render(<Text as="h5">Heading 5</Text>);
      const element = screen.getByRole('heading', { level: 5 });
      expect(element).toHaveTextContent('Heading 5');
    });

    it('renders as h6 when as="h6"', () => {
      render(<Text as="h6">Heading 6</Text>);
      const element = screen.getByRole('heading', { level: 6 });
      expect(element).toHaveTextContent('Heading 6');
    });

    it('renders as span when as="span"', () => {
      render(<Text as="span">Span text</Text>);
      const element = screen.getByText('Span text');
      expect(element.tagName).toBe('SPAN');
    });
  });

  describe('Styling', () => {
    it('applies h1 variant classes', () => {
      render(<Text as="h1">H1 Text</Text>);
      const element = screen.getByRole('heading', { level: 1 });
      expect(element).toHaveClass('text-4xl', 'font-extrabold');
    });

    it('applies h2 variant classes', () => {
      render(<Text as="h2">H2 Text</Text>);
      const element = screen.getByRole('heading', { level: 2 });
      expect(element).toHaveClass('text-3xl', 'font-semibold');
    });

    it('applies h3 variant classes', () => {
      render(<Text as="h3">H3 Text</Text>);
      const element = screen.getByRole('heading', { level: 3 });
      expect(element).toHaveClass('text-2xl', 'font-semibold');
    });

    it('applies paragraph variant classes', () => {
      render(<Text as="p">Paragraph</Text>);
      const element = screen.getByText('Paragraph');
      expect(element).toHaveClass('leading-7');
    });

    it('applies span variant classes', () => {
      render(<Text as="span">Span</Text>);
      const element = screen.getByText('Span');
      expect(element).toHaveClass('inline-block');
    });
  });

  describe('Custom className', () => {
    it('allows custom className to be added', () => {
      render(<Text className="custom-class">Custom</Text>);
      expect(screen.getByText('Custom')).toHaveClass('custom-class');
    });

    it('merges custom className with variant classes', () => {
      render(
        <Text as="h1" className="text-red-500">
          Red Heading
        </Text>
      );
      const element = screen.getByRole('heading', { level: 1 });
      expect(element).toHaveClass('text-4xl', 'font-extrabold', 'text-red-500');
    });
  });

  describe('HTML Attributes', () => {
    it('forwards HTML attributes to the element', () => {
      render(
        <Text as="p" id="test-id" data-testid="text-element">
          Paragraph
        </Text>
      );
      const element = screen.getByTestId('text-element');
      expect(element).toHaveAttribute('id', 'test-id');
    });

    it('supports onClick handler', () => {
      const handleClick = vi.fn();
      render(
        <Text as="span" onClick={handleClick}>
          Clickable
        </Text>
      );
      const element = screen.getByText('Clickable');
      element.click();
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Data attributes', () => {
    it('includes data-slot attribute', () => {
      render(<Text>Test</Text>);
      const element = screen.getByText('Test');
      expect(element).toHaveAttribute('data-slot', 'text');
    });
  });
});
