import type React from 'react';
import type { textVariants } from './text.variants';
import type { VariantProps } from 'class-variance-authority';

export type TextElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';

type HeadingProps = React.HTMLAttributes<HTMLHeadingElement>;
type ParagraphProps = React.HTMLAttributes<HTMLParagraphElement>;
type SpanProps = React.HTMLAttributes<HTMLSpanElement>;

type BaseTextProps = VariantProps<typeof textVariants>;

export type TextProps<T extends TextElement = 'p'> = BaseTextProps &
  (T extends 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
    ? HeadingProps & { as?: T }
    : T extends 'p'
      ? ParagraphProps & { as?: T }
      : SpanProps & { as?: T });
