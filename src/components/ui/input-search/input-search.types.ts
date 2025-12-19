import { type InputProps } from '@/components/ui/input';

export type InputSearchProps = Omit<
  InputProps,
  'type' | 'leftIcon' | 'rightIcon' | 'rightElement'
> & {
  onClear?: () => void;
  showClearButton?: boolean;
  searchIcon?: React.ReactNode;
  clearIcon?: React.ReactNode;
};
