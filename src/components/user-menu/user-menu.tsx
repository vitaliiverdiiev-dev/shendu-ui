import * as React from 'react';
import { menuItemVariants, menuItemIconVariants } from './user-menu.variants';
import type { UserMenuProps } from './user-menu.types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserInfo } from '@/components/user-info';
import { cn } from '@/lib/utils';

const UserMenu = React.forwardRef<HTMLDivElement, UserMenuProps>(
  (
    { user, menuItems, version, size = 'default', showRole = true, align = 'end', triggerClassName, contentClassName },
    ref
  ) => {
    return (
      <div ref={ref} className="inline-block">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <UserInfo className={triggerClassName} user={user} size={size} showRole={showRole} showChevron asButton />
          </DropdownMenuTrigger>
          <DropdownMenuContent className={cn('p-1', contentClassName)} align={align}>
            {menuItems.map((item) => (
              <DropdownMenuItem
                key={item.id}
                disabled={item.disabled}
                onClick={item.onClick}
                className={cn(menuItemVariants({ variant: item.variant || 'default' }))}
              >
                {item.icon && (
                  <span className={cn(menuItemIconVariants({ variant: item.variant || 'default' }))}>{item.icon}</span>
                )}
                <span>{item.label}</span>
              </DropdownMenuItem>
            ))}

            {version && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="px-3 py-2 font-normal">
                  <p className="text-muted-foreground text-xs">Version {version}</p>
                </DropdownMenuLabel>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }
);

UserMenu.displayName = 'UserMenu';

export { UserMenu };
