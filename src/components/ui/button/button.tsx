import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { Spinner } from '../spinner';
import { buttonVariants } from './button.variants';
import type { ButtonProps } from './button.types';
import { cn } from '@/lib/utils';

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, isLoading = false, loadingLabel, children, disabled, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    const loadingLabelText = loadingLabel === '' ? undefined : loadingLabel || 'Loading...';

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <Spinner />
            {size !== 'icon' && <span>{loadingLabelText}</span>}
          </>
        ) : (
          children
        )}
      </Comp>
    );
  }
);

Button.displayName = 'Button';

export { Button };
