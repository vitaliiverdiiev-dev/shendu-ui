import { Text } from './text';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Text',
  component: Text,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A polymorphic text component that renders semantic HTML elements (h1-h6, p, span) with appropriate typography styles. Use the `as` prop to specify the element type.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span'],
      description: 'The HTML element to render',
      table: {
        defaultValue: { summary: 'p' },
      },
    },
    children: {
      control: 'text',
      description: 'Text content',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This is a paragraph of text with default styling.',
  },
};

export const H1: Story = {
  args: {
    as: 'h1',
    children: 'Heading Level 1',
  },
};

export const H2: Story = {
  args: {
    as: 'h2',
    children: 'Heading Level 2',
  },
};

export const H3: Story = {
  args: {
    as: 'h3',
    children: 'Heading Level 3',
  },
};

export const H4: Story = {
  args: {
    as: 'h4',
    children: 'Heading Level 4',
  },
};

export const H5: Story = {
  args: {
    as: 'h5',
    children: 'Heading Level 5',
  },
};

export const H6: Story = {
  args: {
    as: 'h6',
    children: 'Heading Level 6',
  },
};

export const Paragraph: Story = {
  args: {
    as: 'p',
    children:
      'This is a paragraph with proper line height and spacing. It demonstrates how paragraphs will look in your application with the default styling applied.',
  },
};

export const Span: Story = {
  args: {
    as: 'span',
    children: 'This is inline span text',
  },
};

export const AllHeadings: Story = {
  render: () => (
    <div className="space-y-4">
      <Text as="h1">Heading 1 - Main Title</Text>
      <Text as="h2">Heading 2 - Section Title</Text>
      <Text as="h3">Heading 3 - Subsection</Text>
      <Text as="h4">Heading 4 - Minor Heading</Text>
      <Text as="h5">Heading 5 - Small Heading</Text>
      <Text as="h6">Heading 6 - Smallest Heading</Text>
    </div>
  ),
};

export const TypographyExample: Story = {
  render: () => (
    <div className="max-w-2xl space-y-4">
      <Text as="h1">The Quick Brown Fox</Text>
      <Text as="h2">Typography Demonstration</Text>
      <Text as="p">
        This is a demonstration of the Text component with various elements. The paragraph text uses optimal line height
        for readability and includes proper spacing between elements.
      </Text>
      <Text as="h3">Key Features</Text>
      <Text as="p">
        The Text component provides a consistent way to render text across your application. It ensures proper semantic
        HTML structure while maintaining design system consistency.
      </Text>
      <Text as="h4">Usage Notes</Text>
      <Text as="p">
        Use the{' '}
        <Text as="span" className="font-semibold">
          as
        </Text>{' '}
        prop to specify which HTML element should be rendered. This maintains accessibility while giving you full
        control over the visual hierarchy.
      </Text>
    </div>
  ),
};

export const WithCustomStyles: Story = {
  render: () => (
    <div className="space-y-4">
      <Text as="h2" className="text-blue-600">
        Blue Heading
      </Text>
      <Text as="p" className="text-gray-600 italic">
        Italic gray paragraph with custom styling
      </Text>
      <Text as="span" className="font-bold text-red-500">
        Bold red span
      </Text>
    </div>
  ),
};

export const InlineUsage: Story = {
  render: () => (
    <Text as="p">
      This paragraph contains{' '}
      <Text as="span" className="font-bold">
        bold text
      </Text>
      ,{' '}
      <Text as="span" className="italic">
        italic text
      </Text>
      , and{' '}
      <Text as="span" className="text-blue-600 underline">
        colored underlined text
      </Text>{' '}
      using span elements.
    </Text>
  ),
};

export const ArticleLayout: Story = {
  render: () => (
    <article className="max-w-3xl space-y-6">
      <Text as="h1">Understanding Modern Web Typography</Text>

      <Text as="p">
        Typography is one of the most important aspects of web design. It affects readability, accessibility, and the
        overall user experience of your application.
      </Text>

      <Text as="h2">Why Typography Matters</Text>

      <Text as="p">
        Good typography creates hierarchy, guides the reader's eye, and makes content easier to consume. The Text
        component helps maintain consistent typography across your entire application.
      </Text>

      <Text as="h3">Best Practices</Text>

      <Text as="p">
        When using the Text component, always choose the appropriate semantic element. Use heading levels (h1-h6) for
        structure, paragraphs for body text, and spans for inline modifications.
      </Text>

      <Text as="h4">Implementation Details</Text>

      <Text as="p">
        The component uses Tailwind CSS classes to ensure responsive typography that looks great on all screen sizes.
        Font sizes, weights, and spacing are carefully balanced for optimal readability.
      </Text>
    </article>
  ),
};
