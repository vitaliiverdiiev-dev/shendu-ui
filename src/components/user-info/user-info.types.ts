import type { ReactNode } from 'react';

export type UserData = {
  avatarUrl?: string;
  name: string;
  email: string;
  role?: string;
};

export type UserMenuItem = {
  id: string;
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  variant?: 'default' | 'destructive';
  disabled?: boolean;
};

export type UserInfoSize = 'sm' | 'default' | 'lg';

export type UserInfoBaseProps = {
  user: UserData;
  size?: UserInfoSize;
  showRole?: boolean;
  showChevron?: boolean;
  className?: string;
};

export type UserInfoDivProps = UserInfoBaseProps & {
  asButton?: false;
  onClick?: never;
};

export type UserInfoButtonProps = UserInfoBaseProps & {
  asButton: true;
  onClick?: () => void;
};

export type UserInfoProps = UserInfoDivProps | UserInfoButtonProps;
