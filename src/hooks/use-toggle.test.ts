import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useToggle } from './use-toggle';

describe('useToggle', () => {
  describe('Initial state', () => {
    it('defaults to false', () => {
      const { result } = renderHook(() => useToggle());
      expect(result.current.value).toBe(false);
    });

    it('accepts initial value of true', () => {
      const { result } = renderHook(() => useToggle({ initialValue: true }));
      expect(result.current.value).toBe(true);
    });

    it('accepts initial value of false', () => {
      const { result } = renderHook(() => useToggle({ initialValue: false }));
      expect(result.current.value).toBe(false);
    });
  });

  describe('toggle', () => {
    it('toggles from false to true', () => {
      const { result } = renderHook(() => useToggle());

      act(() => {
        result.current.toggle();
      });

      expect(result.current.value).toBe(true);
    });

    it('toggles from true to false', () => {
      const { result } = renderHook(() => useToggle({ initialValue: true }));

      act(() => {
        result.current.toggle();
      });

      expect(result.current.value).toBe(false);
    });

    it('toggles multiple times', () => {
      const { result } = renderHook(() => useToggle());

      act(() => {
        result.current.toggle();
      });
      expect(result.current.value).toBe(true);

      act(() => {
        result.current.toggle();
      });
      expect(result.current.value).toBe(false);

      act(() => {
        result.current.toggle();
      });
      expect(result.current.value).toBe(true);
    });
  });

  describe('setTrue', () => {
    it('sets value to true from false', () => {
      const { result } = renderHook(() => useToggle());

      act(() => {
        result.current.setTrue();
      });

      expect(result.current.value).toBe(true);
    });

    it('keeps value true when already true', () => {
      const { result } = renderHook(() => useToggle({ initialValue: true }));

      act(() => {
        result.current.setTrue();
      });

      expect(result.current.value).toBe(true);
    });
  });

  describe('setFalse', () => {
    it('sets value to false from true', () => {
      const { result } = renderHook(() => useToggle({ initialValue: true }));

      act(() => {
        result.current.setFalse();
      });

      expect(result.current.value).toBe(false);
    });

    it('keeps value false when already false', () => {
      const { result } = renderHook(() => useToggle());

      act(() => {
        result.current.setFalse();
      });

      expect(result.current.value).toBe(false);
    });
  });

  describe('setValue', () => {
    it('sets value to true', () => {
      const { result } = renderHook(() => useToggle());

      act(() => {
        result.current.setValue(true);
      });

      expect(result.current.value).toBe(true);
    });

    it('sets value to false', () => {
      const { result } = renderHook(() => useToggle({ initialValue: true }));

      act(() => {
        result.current.setValue(false);
      });

      expect(result.current.value).toBe(false);
    });
  });

  describe('onToggle callback', () => {
    it('calls onToggle when toggle is called', () => {
      const onToggle = vi.fn();
      const { result } = renderHook(() => useToggle({ onToggle }));

      act(() => {
        result.current.toggle();
      });

      expect(onToggle).toHaveBeenCalledWith(true);
    });

    it('calls onToggle with correct value on multiple toggles', () => {
      const onToggle = vi.fn();
      const { result } = renderHook(() => useToggle({ onToggle }));

      act(() => {
        result.current.toggle();
      });
      expect(onToggle).toHaveBeenLastCalledWith(true);

      act(() => {
        result.current.toggle();
      });
      expect(onToggle).toHaveBeenLastCalledWith(false);
    });

    it('calls onToggle when setTrue is called', () => {
      const onToggle = vi.fn();
      const { result } = renderHook(() => useToggle({ onToggle }));

      act(() => {
        result.current.setTrue();
      });

      expect(onToggle).toHaveBeenCalledWith(true);
    });

    it('calls onToggle when setFalse is called', () => {
      const onToggle = vi.fn();
      const { result } = renderHook(() => useToggle({ initialValue: true, onToggle }));

      act(() => {
        result.current.setFalse();
      });

      expect(onToggle).toHaveBeenCalledWith(false);
    });

    it('calls onToggle when setValue is called', () => {
      const onToggle = vi.fn();
      const { result } = renderHook(() => useToggle({ onToggle }));

      act(() => {
        result.current.setValue(true);
      });

      expect(onToggle).toHaveBeenCalledWith(true);
    });
  });

  describe('Reference stability', () => {
    it('returns stable function references', () => {
      const { result, rerender } = renderHook(() => useToggle());

      const { toggle, setTrue, setFalse, setValue } = result.current;

      rerender();

      expect(result.current.toggle).toBe(toggle);
      expect(result.current.setTrue).toBe(setTrue);
      expect(result.current.setFalse).toBe(setFalse);
      expect(result.current.setValue).toBe(setValue);
    });
  });
});
