import { cva } from 'class-variance-authority';

export const menuItemVariants = cva(
  'flex w-full cursor-pointer items-center gap-2 rounded-sm px-3 py-2 text-sm transition-colors outline-none',
  {
    variants: {
      variant: {
        default: 'text-foreground focus:bg-accent focus:text-accent-foreground',
        destructive: 'text-red-600 focus:bg-red-50 focus:text-red-600 dark:focus:bg-red-900/20',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export const menuItemIconVariants = cva('h-4 w-4 shrink-0', {
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
