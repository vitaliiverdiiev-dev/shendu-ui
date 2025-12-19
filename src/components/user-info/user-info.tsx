import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  userInfoVariants,
  avatarSizeVariants,
  avatarFallbackVariants,
  nameVariants,
  emailVariants,
  roleBadgeVariants,
  chevronVariants,
} from './user-info.variants';
import type { UserInfoButtonProps, UserInfoProps } from './user-info.types';
import { getInitials } from '@/lib/getInitials';

const UserInfo = React.forwardRef<HTMLDivElement | HTMLButtonElement, UserInfoProps>(
  (
    {
      user,
      size = 'default',
      showRole = true,
      showChevron = false,
      className,
      asButton = false,
      ...props
    },
    ref
  ) => {
    const commonContent = (
      <>
        <Avatar className={cn(avatarSizeVariants({ size }))}>
          <AvatarImage src={user.avatarUrl} alt={user.name} />
          <AvatarFallback className={cn(avatarFallbackVariants({ size }))}>
            {getInitials(user.name)}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className={cn(nameVariants({ size }))}>{user.name}</span>
            {showRole && user.role && (
              <span className={cn(roleBadgeVariants({ size }))}>{user.role}</span>
            )}
          </div>
          <span className={cn(emailVariants({ size }))}>{user.email}</span>
        </div>

        {showChevron && (
          <ChevronDown className={cn(chevronVariants({ size }))} aria-hidden="true" />
        )}
      </>
    );

    const sharedClassName = cn(userInfoVariants({ size, interactive: asButton }), className);

    if (asButton) {
      const { onClick } = props as UserInfoButtonProps;
      return (
        <Button
          ref={ref as React.Ref<HTMLButtonElement>}
          variant="ghost"
          className={cn('hover:bg-transparent', sharedClassName)}
          onClick={onClick}
          {...props}
        >
          {commonContent}
        </Button>
      );
    }

    return (
      <div ref={ref as React.Ref<HTMLDivElement>} className={sharedClassName} {...props}>
        {commonContent}
      </div>
    );
  }
);

UserInfo.displayName = 'UserInfo';

export { UserInfo };
