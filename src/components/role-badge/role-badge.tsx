import * as React from 'react';
import { Badge } from '../ui/badge';
import { getRoleColor } from './role-badge.utils';
import type { RoleBadgeProps } from './role-badge.types';
import { cn } from '@/lib/utils';

const RoleBadge = React.forwardRef<HTMLSpanElement, RoleBadgeProps>(({ role, className, ...props }, ref) => {
  return (
    <Badge ref={ref} variant="secondary" className={cn('text-xs', getRoleColor(role), className)} {...props}>
      {role}
    </Badge>
  );
});

RoleBadge.displayName = 'RoleBadge';

export { RoleBadge };
