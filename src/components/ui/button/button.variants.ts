import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  "focus-visible:border-ring-ui focus-visible:ring-ring-ui/50 aria-invalid:ring-destructive-ui/20 dark:aria-invalid:ring-destructive-ui/40 aria-invalid:border-destructive-ui inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: 'bg-primary-ui text-primary-foreground-ui hover:bg-primary-ui/90',
        destructive:
          'bg-destructive-ui hover:bg-destructive-ui/90 focus-visible:ring-destructive-ui/20 dark:focus-visible:ring-destructive-ui/40 dark:bg-destructive-ui/60 text-white',
        outline:
          'bg-background-ui hover:bg-accent-ui hover:text-accent-foreground-ui dark:bg-input-ui/30 dark:border-input-ui dark:hover:bg-input-ui/50 border shadow-xs',
        secondary: 'bg-secondary-ui text-secondary-foreground-ui hover:bg-secondary-ui/80',
        ghost: 'hover:bg-accent-ui hover:text-accent-foreground-ui dark:hover:bg-accent-ui/50',
        link: 'text-primary-ui underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9 gap-0',
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);
