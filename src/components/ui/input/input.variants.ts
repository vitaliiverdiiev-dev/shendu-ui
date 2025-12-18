import { cva } from 'class-variance-authority';

export const inputVariants = cva(
  'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input w-full min-w-0 rounded-md border bg-transparent text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
  {
    variants: {
      size: {
        default: 'h-9 px-3 py-1',
        sm: 'h-8 px-2.5 py-1 text-xs',
        lg: 'h-10 px-4 py-2',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

export const inputWrapperVariants = cva('relative flex items-center w-full', {
  variants: {
    size: {
      default: '[&_svg]:size-4',
      sm: '[&_svg]:size-3.5',
      lg: '[&_svg]:size-5',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

export const ICON_CONTAINER_WIDTH = {
  sm: 'w-8',
  default: 'w-9',
  lg: 'w-11',
} as const;

export const ICON_PADDING = {
  left: {
    sm: 'pl-8',
    default: 'pl-9',
    lg: 'pl-11',
  },
  right: {
    sm: 'pr-8',
    default: 'pr-9',
    lg: 'pr-11',
  },
} as const;

export const INPUT_STATE_STYLES = {
  error:
    'border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40',
  success:
    'border-green-500 focus-visible:border-green-500 focus-visible:ring-green-500/20 dark:focus-visible:ring-green-500/40',
} as const;

export const ICON_CONTAINER_BASE = 'absolute flex items-center justify-center' as const;
export const ICON_CONTAINER_STATIC =
  `${ICON_CONTAINER_BASE} pointer-events-none text-muted-foreground` as const;
export const ICON_CONTAINER_INTERACTIVE = `${ICON_CONTAINER_BASE} transition-colors` as const;

export type InputSize = 'sm' | 'default' | 'lg';

export const getIconContainerWidth = (size: InputSize | null | undefined): string => {
  return ICON_CONTAINER_WIDTH[size ?? 'default'];
};

export const getIconPadding = (
  position: 'left' | 'right',
  size: InputSize | null | undefined
): string => {
  return ICON_PADDING[position][size ?? 'default'];
};

export const getStateStyles = (isError?: boolean, isSuccess?: boolean): string => {
  if (isError) return INPUT_STATE_STYLES.error;
  if (isSuccess) return INPUT_STATE_STYLES.success;
  return '';
};
