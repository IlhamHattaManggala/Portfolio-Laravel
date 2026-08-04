import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import type { BreadcrumbItem } from '@/types';
import FlashMessages from '@/components/FlashMessages';
import FloatingTerminal from '@/components/terminal/FloatingTerminal';

export default function AppLayout({
    breadcrumbs = [],
    children,
}: {
    breadcrumbs?: BreadcrumbItem[];
    children: React.ReactNode;
}) {
    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs}>
            <FlashMessages />
            {children}
            <FloatingTerminal />
        </AppLayoutTemplate>
    );
}
