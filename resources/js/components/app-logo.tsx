

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg overflow-hidden border border-sidebar-border shadow-sm">
                <img src="/images/profile.webp" className="size-full object-cover" alt="Profile" />
            </div>
            <div className="ml-2 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-bold">
                    IHM<span className="text-blue-600">.Admin</span>
                </span>
            </div>
        </>
    );
}
