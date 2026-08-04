import { cn, toUrl } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useCurrentUrl } from '@/hooks/use-current-url';
import type { NavItem } from '@/types';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const { isCurrentUrl, isCurrentOrParentUrl } = useCurrentUrl();

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarMenu>
                {items.map((item) => {
                    const href = toUrl(item.href);
                    // Use exact match for Dashboard to prevent it from being active on all admin pages
                    const isActive = item.title === 'Dashboard' ? isCurrentUrl(href) : isCurrentOrParentUrl(href);
                    
                    return (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                asChild
                                isActive={isActive}
                                tooltip={item.title}
                                size="lg"
                                className={cn(
                                    "transition-all duration-200 group",
                                    isActive 
                                        ? "bg-blue-50 text-sidebar-foreground dark:bg-blue-950/40 font-semibold" 
                                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                                )}
                            >
                                <Link href={href} prefetch className="flex items-center gap-3 w-full">
                                    {item.icon && (
                                        <div className={cn(
                                            "flex aspect-square size-8 items-center justify-center rounded-lg transition-colors",
                                            isActive ? "bg-white/80 dark:bg-black/20 shadow-sm" : "group-hover:bg-sidebar-accent"
                                        )}>
                                            <item.icon className={cn("size-5", isActive ? "text-black dark:text-white" : "text-neutral-500 dark:text-neutral-400")} />
                                        </div>
                                    )}
                                    <span className={cn("font-medium truncate", isActive && "font-semibold")}>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
