import type React from 'react';
import type { badgeVariants } from './badge.variants';
import type { VariantProps } from 'class-variance-authority';

export type BadgeProps = React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & {
    asChild?: boolean;
  };
