import { useState, useCallback, useMemo } from 'react';

export type UseToggleOptions = {
  initialValue?: boolean;
  onToggle?: (value: boolean) => void;
};

export type UseToggleReturn = {
  value: boolean;
  toggle: () => void;
  setTrue: () => void;
  setFalse: () => void;
  setValue: (value: boolean) => void;
};

export function useToggle(options: UseToggleOptions = {}): UseToggleReturn {
  const { initialValue = false, onToggle } = options;
  const [value, setValueState] = useState(initialValue);

  const setValue = useCallback(
    (newValue: boolean) => {
      setValueState(newValue);
      onToggle?.(newValue);
    },
    [onToggle]
  );

  const toggle = useCallback(() => {
    setValueState((prev) => {
      const newValue = !prev;
      onToggle?.(newValue);
      return newValue;
    });
  }, [onToggle]);

  const setTrue = useCallback(() => {
    setValue(true);
  }, [setValue]);

  const setFalse = useCallback(() => {
    setValue(false);
  }, [setValue]);

  return useMemo(
    () => ({
      value,
      toggle,
      setTrue,
      setFalse,
      setValue,
    }),
    [value, toggle, setTrue, setFalse, setValue]
  );
}
