'use client';

import { Home, CheckSquare, Bell, Search, BarChart3, ShoppingCart, Briefcase, Wrench, FileText, FileSpreadsheet, Zap, LogOut, Puzzle, MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    Sidebar as ShadcnSidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuBadge,
    SidebarInput,
    SidebarRail,
    SidebarFooter,
} from "@/components/ui/sidebar"

const navigationItems = [
    { icon: Home, label: 'Home', href: '/dashboard', badge: null },
    { icon: CheckSquare, label: 'Tasks', href: '/dashboard/tasks', badge: 2 },
    { icon: Bell, label: 'Notifications', href: '/dashboard/notifications', badge: 3 },
];

const appModules = [
    { icon: MessageSquare, label: 'AI Chat', href: '/dashboard/ai-chat', color: 'text-rose-600' },
    { icon: BarChart3, label: 'CRM', href: '/dashboard/crm', color: 'text-green-600' },
    { icon: ShoppingCart, label: 'Sales', href: '/dashboard/sales', color: 'text-blue-600' },
    { icon: Briefcase, label: 'Projects', href: '/dashboard/projects', color: 'text-purple-600' },
    { icon: Wrench, label: 'Field Service', href: '/dashboard/field-service', color: 'text-orange-600' },
    { icon: FileText, label: 'Files', href: '/dashboard/files', color: 'text-gray-600' },
    { icon: FileSpreadsheet, label: 'Forms', href: '/dashboard/forms', color: 'text-yellow-600' },
    { icon: Puzzle, label: 'Integrations', href: '/dashboard/integrations', color: 'text-indigo-600' },
    { icon: Zap, label: 'Automations', href: '/dashboard/automations', color: 'text-orange-500' },
];

import { useUser } from '@/components/providers/UserProvider';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function Sidebar({ ...props }: React.ComponentProps<typeof ShadcnSidebar>) {
    const router = useRouter();
    const { user, logout } = useUser();

    const handleLogout = async () => {
        logout();
    };

    return (
        <ShadcnSidebar collapsible="icon" {...props} className="border-r border-gray-200 bg-white">
            <SidebarHeader className="border-b border-gray-100 p-4">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild className="hover:bg-transparent hover:text-inherit">
                            <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage src={user?.picture} alt={user?.name} />
                                    <AvatarFallback className="rounded-lg bg-black text-white">
                                        {user?.name?.charAt(0) || 'U'}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="font-semibold text-sm truncate">{user?.name || 'User'}</span>
                                    <span className="text-xs text-muted-foreground truncate">{user?.email || ''}</span>
                                </div>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
                <div className="relative mt-2 group-data-[collapsible=icon]:hidden">
                    <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <SidebarInput
                        placeholder="Search"
                        className="pl-8 bg-gray-50 border-gray-200 h-9"
                    />
                    <kbd className="absolute right-2 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[10px] font-medium text-gray-500 bg-white border border-gray-200 rounded">
                        ⌘ K
                    </kbd>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navigationItems.map((item) => (
                                <SidebarMenuItem key={item.label}>
                                    <SidebarMenuButton asChild tooltip={item.label}>
                                        <Link href={item.href}>
                                            <item.icon className="h-4 w-4" />
                                            <span>{item.label}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                    {item.badge && (
                                        <SidebarMenuBadge className="bg-black text-white hover:bg-gray-800 hover:text-white">
                                            {item.badge}
                                        </SidebarMenuBadge>
                                    )}
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel>Apps</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {appModules.map((app) => (
                                <SidebarMenuItem key={app.label}>
                                    <SidebarMenuButton asChild tooltip={app.label}>
                                        <Link href={app.href}>
                                            <app.icon className="h-4 w-4" />
                                            <span>{app.label}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="border-t border-gray-100 p-4">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild tooltip="Log out">
                            <button className="w-full flex items-center gap-2" onClick={handleLogout}>
                                <LogOut className="h-4 w-4" />
                                <span>Log out</span>
                            </button>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </ShadcnSidebar>
    );
}
