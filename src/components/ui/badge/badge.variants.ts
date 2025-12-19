import { cva } from 'class-variance-authority';

export const badgeVariants = cva(
  'focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] [&>svg]:pointer-events-none [&>svg]:size-3',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground [a&]:hover:bg-primary/90 border-transparent',
        secondary: 'bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90 border-transparent',
        destructive:
          'bg-destructive text-destructive-foreground border-destructive [a&]:hover:bg-destructive/80 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40',
        warning:
          'bg-warning text-warning-foreground border-warning [a&]:hover:bg-warning/80 focus-visible:ring-warning/20 dark:focus-visible:ring-warning/40',
        success:
          'bg-success text-success-foreground border-success [a&]:hover:bg-success/80 focus-visible:ring-success/20 dark:focus-visible:ring-success/40',
        info: 'bg-info text-info-foreground border-info [a&]:hover:bg-info/80 focus-visible:ring-info/20 dark:focus-visible:ring-info/40',
        outline: 'text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);
