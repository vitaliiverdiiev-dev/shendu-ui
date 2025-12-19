import * as React from 'react';
import { type InputProps } from '@/components/ui/input';

export type InputPasswordProps = Omit<
  InputProps,
  'type' | 'leftIcon' | 'rightIcon' | 'rightElement'
> & {
  showLockIcon?: boolean;
  lockIcon?: React.ReactNode;
  showPasswordIcon?: React.ReactNode;
  hidePasswordIcon?: React.ReactNode;
  defaultVisible?: boolean;
  visible?: boolean;
  onVisibilityChange?: (visible: boolean) => void;
};
