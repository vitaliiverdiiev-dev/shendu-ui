import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
import { inputVariants } from './input.variants';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> &
  VariantProps<typeof inputVariants> & {
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    rightElement?: React.ReactNode;
    wrapperClassName?: string;
    isError?: boolean;
    isSuccess?: boolean;
  };
