import * as React from 'react';
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
import type { InputProps } from './input.types';

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      size,
      leftIcon,
      rightIcon,
      rightElement,
      wrapperClassName,
      isError,
      isSuccess,
      disabled,
      'aria-invalid': ariaInvalid,
      ...props
    },
    ref
  ) => {
    const hasWrapper = leftIcon || rightIcon || rightElement;
    const iconWidth = getIconContainerWidth(size as InputSize);

    const iconPadding = cn(
      leftIcon && getIconPadding('left', size as InputSize),
      (rightIcon || rightElement) && getIconPadding('right', size as InputSize)
    );

    const inputElement = (
      <input
        type={type}
        data-slot="input"
        className={cn(
          inputVariants({ size }),
          hasWrapper && iconPadding,
          getStateStyles(isError, isSuccess),
          className
        )}
        ref={ref}
        disabled={disabled}
        aria-invalid={isError || ariaInvalid}
        {...props}
      />
    );

    if (!hasWrapper) {
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
        {rightElement
          ? rightElement
          : rightIcon && (
              <span
                className={cn(
                  ICON_CONTAINER_STATIC,
                  'right-0',
                  iconWidth,
                  disabled && 'opacity-50'
                )}
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
