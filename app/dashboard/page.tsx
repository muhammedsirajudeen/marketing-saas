'use client';

import { Sidebar } from '@/components/dashboard/Sidebar';
import { QuickAccessGrid } from '@/components/dashboard/QuickAccessGrid';
import { TasksWidget } from '@/components/dashboard/TasksWidget';
import { ActivitiesWidget } from '@/components/dashboard/ActivitiesWidget';
import { TimeDisplay } from '@/components/dashboard/TimeDisplay';
import { CustomWidgets } from '@/components/dashboard/CustomWidgets';
import { Button } from '@/components/ui/button';
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Plus, Settings } from 'lucide-react';

export default function DashboardPage() {
    const currentDate = new Date();
    const greeting = getGreeting();
    const formattedDate = currentDate.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });

    return (
        <SidebarProvider>
            <div className="flex h-screen bg-gray-50 w-full">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content */}
                <SidebarInset className="flex-1 overflow-y-auto">
                    {/* Header */}
                    <header className="bg-white border-b border-gray-200 px-8 py-4 sticky top-0 z-10 w-full">
                        <div className="flex items-center justify-between">
                            <div className="flex gap-4 items-center">
                                <SidebarTrigger className="-ml-1" />
                                <div className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
                                    🔧 Development
                                </div>
                                <div className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
                                    📋 Onboarding
                                </div>
                                <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors">
                                    +
                                </button>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="text-black border-black hover:bg-gray-50">
                                    <Plus className="h-4 w-4 mr-1" />
                                    Widget
                                </Button>
                                <Button variant="outline" size="sm">
                                    <Settings className="h-4 w-4 mr-1" />
                                    Edit widgets
                                </Button>
                                <Button variant="outline" size="sm">
                                    <Settings className="h-4 w-4 mr-1" />
                                    Edit dashboard
                                </Button>
                            </div>
                        </div>
                    </header>

                    {/* Dashboard Content */}
                    <div className="p-8 space-y-6">
                        {/* Greeting */}
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                👋 {greeting}, Hanan!
                            </h1>
                            <p className="text-sm text-gray-600 mt-1">{formattedDate}</p>
                        </div>

                        {/* Quick Access Grid */}
                        <QuickAccessGrid />

                        {/* Widgets Grid */}
                        <div className="grid grid-cols-12 gap-6">
                            {/* Left Column - Tasks */}
                            <div className="col-span-4">
                                <TasksWidget />
                            </div>

                            {/* Middle Column - Activities */}
                            <div className="col-span-4">
                                <ActivitiesWidget />
                            </div>

                            {/* Right Column - Custom Widgets */}
                            <div className="col-span-4 space-y-4">
                                <TimeDisplay />
                                <CustomWidgets />
                            </div>
                        </div>
                    </div>
                </SidebarInset>
            </div>
        </SidebarProvider>
    );
}

function getGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
}
