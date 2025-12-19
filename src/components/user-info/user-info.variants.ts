import { cva } from 'class-variance-authority';

export const userInfoVariants = cva('flex items-center', {
  variants: {
    size: {
      sm: 'gap-1.5',
      default: 'gap-2',
      lg: 'gap-3',
    },
    interactive: {
      true: 'cursor-pointer [&_*]:transition-colors hover:[&_*]:text-black',
      false: '',
    },
  },
  defaultVariants: {
    size: 'default',
    interactive: false,
  },
});

export const avatarSizeVariants = cva('', {
  variants: {
    size: {
      sm: 'h-6 w-6',
      default: 'h-8 w-8',
      lg: 'h-10 w-10',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

export const avatarFallbackVariants = cva('bg-blue-100 font-medium text-blue-600', {
  variants: {
    size: {
      sm: 'text-xs',
      default: 'text-sm',
      lg: 'text-base',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

export const nameVariants = cva('text-foreground font-medium', {
  variants: {
    size: {
      sm: 'text-xs',
      default: 'text-sm',
      lg: 'text-base',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

export const emailVariants = cva('text-muted-foreground', {
  variants: {
    size: {
      sm: 'text-[10px]',
      default: 'text-xs',
      lg: 'text-sm',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

export const roleBadgeVariants = cva(
  'inline-flex items-center rounded-xl bg-amber-100 font-medium text-amber-800 uppercase dark:bg-amber-900/30 dark:text-amber-500',
  {
    variants: {
      size: {
        sm: 'px-1.5 py-0 text-[9px]',
        default: 'px-2 py-0.5 text-[10px]',
        lg: 'px-2.5 py-0.5 text-xs',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

export const chevronVariants = cva('text-muted-foreground shrink-0', {
  variants: {
    size: {
      sm: 'h-3 w-3',
      default: 'h-4 w-4',
      lg: 'h-5 w-5',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});
