import * as React from 'react';
import { Search, X } from 'lucide-react';
import type { InputSearchProps } from './input-search.types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  getIconContainerWidth,
  ICON_CONTAINER_INTERACTIVE,
  type InputSize,
} from '@/components/ui/input/input.variants';
import { cn } from '@/lib/utils';

const InputSearch = React.forwardRef<HTMLInputElement, InputSearchProps>(
  (
    {
      className,
      size,
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

    const clearButton = shouldShowClear ? (
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={cn(
          ICON_CONTAINER_INTERACTIVE,
          'text-destructive hover:text-destructive/80 right-0 hover:bg-transparent',
          iconWidth,
          disabled && 'pointer-events-none opacity-50'
        )}
        onClick={handleClear}
        disabled={disabled}
        tabIndex={-1}
        aria-label="Clear search"
      >
        {clearIcon || <X />}
      </Button>
    ) : undefined;

    return (
      <Input
        ref={ref}
        type="search"
        data-input-search-id={props.id || 'default'}
        className={cn('[&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden', className)}
        size={size}
        leftIcon={searchIcon || <Search />}
        rightElement={clearButton}
        value={currentValue}
        onChange={handleChange}
        disabled={disabled}
        {...props}
      />
    );
  }
);

InputSearch.displayName = 'InputSearch';

export { InputSearch };
