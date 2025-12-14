import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { buttonVariants } from './button.variants';
import { Spinner } from '../spinner';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  loadingLabel?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, isLoading = false, loadingLabel, children,  disabled,  ...props },
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
