import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import {
  inputVariants,
  inputWrapperVariants,
  getIconContainerWidth,
  getIconPadding,
  getStateStyles,
  ICON_CONTAINER_STATIC,
  type InputSize,
} from './input.variants';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> &
  VariantProps<typeof inputVariants> & {
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    wrapperClassName?: string;
    isError?: boolean;
    isSuccess?: boolean;
  };

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      size,
      leftIcon,
      rightIcon,
      wrapperClassName,
      isError,
      isSuccess,
      disabled,
      'aria-invalid': ariaInvalid,
      ...props
    },
    ref
  ) => {
    const hasIcons = leftIcon || rightIcon;
    const iconWidth = getIconContainerWidth(size as InputSize);

    const iconPadding = cn(
      leftIcon && getIconPadding('left', size as InputSize),
      rightIcon && getIconPadding('right', size as InputSize)
    );

    const inputElement = (
      <input
        type={type}
        data-slot="input"
        className={cn(
          inputVariants({ size }),
          hasIcons && iconPadding,
          getStateStyles(isError, isSuccess),
          className
        )}
        ref={ref}
        disabled={disabled}
        aria-invalid={isError || ariaInvalid}
        {...props}
      />
    );

    if (!hasIcons) {
      return inputElement;
    }

    return (
      <div className={cn(inputWrapperVariants({ size }), wrapperClassName)}>
        {leftIcon && (
          <span
            className={cn(ICON_CONTAINER_STATIC, 'left-0', iconWidth, disabled && 'opacity-50')}
            aria-hidden="true"
          >
            {leftIcon}
          </span>
        )}
        {inputElement}
        {rightIcon && (
          <span
            className={cn(ICON_CONTAINER_STATIC, 'right-0', iconWidth, disabled && 'opacity-50')}
            aria-hidden="true"
          >
            {rightIcon}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
