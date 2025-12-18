import * as React from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { useToggle } from '@/hooks/use-toggle';
import {
  inputVariants,
  inputWrapperVariants,
  getIconContainerWidth,
  getIconPadding,
  getStateStyles,
  ICON_CONTAINER_STATIC,
  ICON_CONTAINER_INTERACTIVE,
  type InputSize,
} from './input.variants';

export type InputPasswordProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> &
  VariantProps<typeof inputVariants> & {
    wrapperClassName?: string;
    showLockIcon?: boolean;
    lockIcon?: React.ReactNode;
    showPasswordIcon?: React.ReactNode;
    hidePasswordIcon?: React.ReactNode;
    defaultVisible?: boolean;
    visible?: boolean;
    onVisibilityChange?: (visible: boolean) => void;
    isError?: boolean;
    isSuccess?: boolean;
  };

const InputPassword = React.forwardRef<HTMLInputElement, InputPasswordProps>(
  (
    {
      className,
      size,
      wrapperClassName,
      showLockIcon = true,
      lockIcon,
      showPasswordIcon,
      hidePasswordIcon,
      defaultVisible = false,
      visible: controlledVisible,
      onVisibilityChange,
      isError,
      isSuccess,
      disabled,
      'aria-invalid': ariaInvalid,
      ...props
    },
    ref
  ) => {
    const isControlled = controlledVisible !== undefined;
    const { value: internalVisible, toggle: toggleInternal } = useToggle({
      initialValue: defaultVisible,
    });
    const isVisible = isControlled ? controlledVisible : internalVisible;
    const iconWidth = getIconContainerWidth(size as InputSize);

    const handleToggleVisibility = () => {
      if (!isControlled) {
        toggleInternal();
      }
      onVisibilityChange?.(!isVisible);
    };

    return (
      <div className={cn(inputWrapperVariants({ size }), wrapperClassName)}>
        {showLockIcon && (
          <span
            className={cn(ICON_CONTAINER_STATIC, 'left-0', iconWidth, disabled && 'opacity-50')}
            aria-hidden="true"
          >
            {lockIcon || <Lock />}
          </span>
        )}
        <input
          type={isVisible ? 'text' : 'password'}
          data-slot="input"
          className={cn(
            inputVariants({ size }),
            showLockIcon && getIconPadding('left', size as InputSize),
            getIconPadding('right', size as InputSize),
            getStateStyles(isError, isSuccess),
            className
          )}
          ref={ref}
          disabled={disabled}
          aria-invalid={isError || ariaInvalid}
          {...props}
        />
        <button
          type="button"
          className={cn(
            ICON_CONTAINER_INTERACTIVE,
            'right-0 text-muted-foreground hover:text-foreground',
            iconWidth,
            disabled && 'pointer-events-none opacity-50'
          )}
          onClick={handleToggleVisibility}
          disabled={disabled}
          tabIndex={-1}
          aria-label={isVisible ? 'Hide password' : 'Show password'}
          aria-pressed={isVisible}
        >
          {isVisible
            ? (hidePasswordIcon || <EyeOff />)
            : (showPasswordIcon || <Eye />)
          }
        </button>
      </div>
    );
  }
);

InputPassword.displayName = 'InputPassword';

export { InputPassword };
