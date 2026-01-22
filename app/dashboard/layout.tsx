import { Sidebar } from '@/components/dashboard/Sidebar';
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { DraggableChatButton } from '@/components/dashboard/DraggableChatButton';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <div className="flex h-screen bg-gray-50 w-full relative">
                <Sidebar />
                <SidebarInset className="flex-1 overflow-y-auto">
                    {children}
                </SidebarInset>
                <DraggableChatButton />
            </div>
        </SidebarProvider>
    );
}
