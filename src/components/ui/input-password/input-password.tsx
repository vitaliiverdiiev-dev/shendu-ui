import * as React from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';
import type { InputPasswordProps } from './input-password.types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  getIconContainerWidth,
  ICON_CONTAINER_INTERACTIVE,
  type InputSize,
} from '@/components/ui/input/input.variants';
import { useToggle } from '@/hooks/use-toggle';
import { cn } from '@/lib/utils';

const InputPassword = React.forwardRef<HTMLInputElement, InputPasswordProps>(
  (
    {
      size,
      showLockIcon = true,
      lockIcon,
      showPasswordIcon,
      hidePasswordIcon,
      defaultVisible = false,
      visible: controlledVisible,
      onVisibilityChange,
      disabled,
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

    const toggleButton = (
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={cn(
          ICON_CONTAINER_INTERACTIVE,
          'text-muted-foreground-ui hover:text-foreground-ui right-0 hover:bg-transparent',
          iconWidth,
          disabled && 'pointer-events-none opacity-50'
        )}
        onClick={handleToggleVisibility}
        disabled={disabled}
        tabIndex={-1}
        aria-label={isVisible ? 'Hide password' : 'Show password'}
        aria-pressed={isVisible}
      >
        {isVisible ? hidePasswordIcon || <EyeOff /> : showPasswordIcon || <Eye />}
      </Button>
    );

    return (
      <Input
        ref={ref}
        type={isVisible ? 'text' : 'password'}
        size={size}
        leftIcon={showLockIcon ? lockIcon || <Lock /> : undefined}
        rightElement={toggleButton}
        disabled={disabled}
        {...props}
      />
    );
  }
);

InputPassword.displayName = 'InputPassword';

export { InputPassword };
