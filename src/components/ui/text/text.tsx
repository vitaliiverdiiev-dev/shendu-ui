import * as React from 'react';
import { textVariants } from './text.variants';
import type { TextProps, TextElement } from './text.types';
import { cn } from '@/lib/utils';

const TextComponent = React.forwardRef(
  <T extends TextElement = 'p'>({ className, as, ...props }: TextProps<T>, ref: React.ForwardedRef<HTMLElement>) => {
    const Component = (as || 'p') as TextElement;

    return (
      <Component
        data-slot="text"
        className={cn(textVariants({ as: Component, className }))}
        ref={ref as React.Ref<HTMLParagraphElement>}
        {...props}
      />
    );
  }
) as <T extends TextElement = 'p'>(
  props: TextProps<T> & { ref?: React.ForwardedRef<HTMLElement> }
) => React.ReactElement;

const Text = Object.assign(TextComponent, {
  displayName: 'Text',
});

export { Text };
