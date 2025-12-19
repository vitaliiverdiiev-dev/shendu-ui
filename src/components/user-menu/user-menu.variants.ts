import { cva } from 'class-variance-authority';

export const menuItemVariants = cva(
  'flex items-center gap-2 w-full rounded-sm px-3 py-2 text-sm cursor-pointer transition-colors outline-none',
  {
    variants: {
      variant: {
        default: 'text-foreground focus:bg-accent focus:text-accent-foreground',
        destructive: 'text-red-600 focus:bg-red-50 dark:focus:bg-red-900/20 focus:text-red-600',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export const menuItemIconVariants = cva('shrink-0 h-4 w-4', {
  variants: {
    variant: {
      default: 'text-muted-foreground',
      destructive: 'text-red-600',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});
