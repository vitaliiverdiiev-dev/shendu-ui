import * as React from 'react';
import { Search, X } from 'lucide-react';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import {
  inputVariants,
  inputWrapperVariants,
  getIconContainerWidth,
  getIconPadding,
  ICON_CONTAINER_STATIC,
  ICON_CONTAINER_INTERACTIVE,
  type InputSize,
} from './input.variants';

export type InputSearchProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> &
  VariantProps<typeof inputVariants> & {
    wrapperClassName?: string;
    onClear?: () => void;
    showClearButton?: boolean;
    searchIcon?: React.ReactNode;
    clearIcon?: React.ReactNode;
  };

const InputSearch = React.forwardRef<HTMLInputElement, InputSearchProps>(
  (
    {
      className,
      size,
      wrapperClassName,
      value,
      defaultValue,
      onChange,
      onClear,
      showClearButton,
      searchIcon,
      clearIcon,
      disabled,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue ?? '');
    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;
    const hasValue = currentValue !== '' && currentValue !== undefined;
    const shouldShowClear = showClearButton !== undefined ? showClearButton : hasValue;
    const iconWidth = getIconContainerWidth(size as InputSize);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInternalValue(e.target.value);
      }
      onChange?.(e);
    };

    const handleClear = () => {
      if (!isControlled) {
        setInternalValue('');
      }
      onClear?.();
      const input = document.querySelector(`[data-input-search-id="${props.id || 'default'}"]`) as HTMLInputElement;
      if (input && onChange) {
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
        nativeInputValueSetter?.call(input, '');
        const event = new Event('input', { bubbles: true });
        input.dispatchEvent(event);
      }
    };

    return (
      <div className={cn(inputWrapperVariants({ size }), wrapperClassName)}>
        <span
          className={cn(ICON_CONTAINER_STATIC, 'left-0', iconWidth, disabled && 'opacity-50')}
          aria-hidden="true"
        >
          {searchIcon || <Search />}
        </span>
        <input
          type="search"
          data-slot="input"
          data-input-search-id={props.id || 'default'}
          className={cn(
            inputVariants({ size }),
            getIconPadding('left', size as InputSize),
            shouldShowClear && getIconPadding('right', size as InputSize),
            '[&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden',
            className
          )}
          ref={ref}
          value={currentValue}
          onChange={handleChange}
          disabled={disabled}
          {...props}
        />
        {shouldShowClear && (
          <button
            type="button"
            className={cn(
              ICON_CONTAINER_INTERACTIVE,
              'right-0 text-destructive hover:text-destructive/80',
              iconWidth,
              disabled && 'pointer-events-none opacity-50'
            )}
            onClick={handleClear}
            disabled={disabled}
            tabIndex={-1}
            aria-label="Clear search"
          >
            {clearIcon || <X />}
          </button>
        )}
      </div>
    );
  }
);

InputSearch.displayName = 'InputSearch';

export { InputSearch };
