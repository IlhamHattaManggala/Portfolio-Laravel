import { Link, usePage } from '@inertiajs/react';
import { 
    LayoutGrid, 
    Briefcase, 
    BookOpen, 
    UserCircle, 
    FileBadge, 
    Code2, 
    MessageSquare, 
    Settings,
    Home,
    LogOut,
    Quote
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import type { NavItem } from '@/types';
import admin, { dashboard } from '@/routes/admin';
import { home } from '@/routes';
import { toUrl } from '@/lib/utils';

const { projects, blogs, experience, certificates, skills, messages, testimonials, settings } = admin;

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: toUrl(dashboard()),
        icon: LayoutGrid,
    },
    {
        title: 'Proyek',
        href: toUrl(projects.index()),
        icon: Briefcase,
    },
    {
        title: 'Blog',
        href: toUrl(blogs.index()),
        icon: BookOpen,
    },
    {
        title: 'Pengalaman',
        href: toUrl(experience.index()),
        icon: UserCircle,
    },
    {
        title: 'Sertifikat',
        href: toUrl(certificates.index()),
        icon: FileBadge,
    },
    {
        title: 'Skill & Tech',
        href: toUrl(skills.index()),
        icon: Code2,
    },
    {
        title: 'Pesan',
        href: toUrl(messages.index()),
        icon: MessageSquare,
    },
    {
        title: 'Testimoni',
        href: toUrl(testimonials.index()),
        icon: Quote,
    },
    {
        name: 'Pengaturan',
        title: 'Pengaturan',
        href: toUrl(settings.index()),
        icon: Settings,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Lihat Website',
        href: toUrl(home()),
        icon: Home,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="sidebar" className="border-r dark:border-gray-800">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={toUrl(dashboard())} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <div className="px-2 py-2">
                    <NavFooter items={footerNavItems} />
                </div>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
