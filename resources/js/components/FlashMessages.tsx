import React, { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { toast } from 'sonner';

export default function FlashMessages() {
    const { flash } = usePage().props as any;

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success, {
                description: 'Perubahan berhasil disimpan.',
            });
        }

        if (flash.error) {
            toast.error('Gagal!', {
                description: flash.error,
            });
        }
    }, [flash]);

    return null;
}
