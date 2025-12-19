import type React from 'react';
import type { buttonVariants } from './button.variants';
import type { VariantProps } from 'class-variance-authority';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    isLoading?: boolean;
    loadingLabel?: string;
  };
