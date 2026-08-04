import { Link, router } from '@inertiajs/react';
import { LogOut, Settings } from 'lucide-react';
import {
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { UserInfo } from '@/components/user-info';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { logout } from '@/routes';
import { edit } from '@/routes/profile';
import type { User } from '@/types';
import Swal from 'sweetalert2';

type Props = {
    user: User;
};

export function UserMenuContent({ user }: Props) {
    const cleanup = useMobileNavigation();

    const handleLogout = (e: React.MouseEvent) => {
        e.preventDefault();
        
        Swal.fire({
            title: 'Yakin mau keluar?',
            text: "Anda akan keluar dari sesi admin saat ini.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444', // red-600
            cancelButtonColor: '#374151', // gray-700
            confirmButtonText: 'Ya, Keluar',
            cancelButtonText: 'Batal',
            background: '#171717',
            color: '#ffffff',
            customClass: {
                popup: 'rounded-[2rem] border border-white/10',
                confirmButton: 'rounded-xl px-6 py-2.5 font-bold',
                cancelButton: 'rounded-xl px-6 py-2.5 font-bold'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                cleanup();
                router.post(logout());
            }
        });
    };

    return (
        <>
            <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-3 px-3 py-3 text-left text-sm bg-gray-50/50 dark:bg-white/5">
                    <UserInfo user={user} showEmail={true} />
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                    <Link
                        className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-2 py-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                        href={edit()}
                        prefetch
                        onClick={cleanup}
                    >
                        <Settings className="size-4 text-gray-500" />
                        <span>Pengaturan Akun</span>
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
                <button
                    className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-2 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                    onClick={handleLogout}
                    data-test="logout-button"
                >
                    <LogOut className="size-4" />
                    <span>Keluar</span>
                </button>
            </DropdownMenuItem>
        </>
    );
}
