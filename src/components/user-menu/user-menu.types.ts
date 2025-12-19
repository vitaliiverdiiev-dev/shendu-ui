import type { UserData, UserMenuItem, UserInfoSize } from '@/components/user-info';

export type UserMenuProps = {
  user: UserData;
  menuItems: UserMenuItem[];
  version?: string;
  size?: UserInfoSize;
  showRole?: boolean;
  align?: 'start' | 'center' | 'end';
  triggerClassName?: string;
  contentClassName?: string;
};
