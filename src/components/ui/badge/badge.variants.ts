import { cva } from 'class-variance-authority';

export const badgeVariants = cva(
  'focus-visible:border-ring-ui focus-visible:ring-ring-ui/50 aria-invalid:ring-destructive-ui/20 dark:aria-invalid:ring-destructive-ui/40 aria-invalid:border-destructive-ui inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] [&>svg]:pointer-events-none [&>svg]:size-3',
  {
    variants: {
      variant: {
        default: 'bg-primary-ui text-primary-foreground-ui [a&]:hover:bg-primary-ui/90 border-transparent',
        secondary: 'bg-secondary-ui text-secondary-foreground-ui [a&]:hover:bg-secondary-ui/90 border-transparent',
        destructive:
          'bg-destructive-ui text-destructive-foreground-ui border-destructive-ui [a&]:hover:bg-destructive-ui/80 focus-visible:ring-destructive-ui/20 dark:focus-visible:ring-destructive-ui/40',
        warning:
          'bg-warning-ui text-warning-foreground-ui border-warning-ui [a&]:hover:bg-warning-ui/80 focus-visible:ring-warning-ui/20 dark:focus-visible:ring-warning-ui/40',
        success:
          'bg-success-ui text-success-foreground-ui border-success-ui [a&]:hover:bg-success-ui/80 focus-visible:ring-success-ui/20 dark:focus-visible:ring-success-ui/40',
        info: 'bg-info-ui text-info-foreground-ui border-info-ui [a&]:hover:bg-info-ui/80 focus-visible:ring-info-ui/20 dark:focus-visible:ring-info-ui/40',
        outline: 'text-foreground-ui [a&]:hover:bg-accent-ui [a&]:hover:text-accent-foreground-ui',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);
