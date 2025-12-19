import type { BadgeProps } from '../ui/badge';

export type UserRole = 'admin' | 'teamlead' | 'tech' | 'qa' | 'buyer' | 'trainee';

export type RoleBadgeProps = {
  role: UserRole;
} & Omit<BadgeProps, 'variant'>;
