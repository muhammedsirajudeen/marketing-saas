'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Phone, Users } from 'lucide-react';

const todayActivities = [
    { id: 1, icon: Phone, title: 'Call Designer', time: '09:20 PM', color: 'text-gray-700' },
    { id: 2, icon: Users, title: 'BetterServe meeting', time: '09:29 PM', color: 'text-gray-500' },
];

const upcomingActivities = [
    { id: 3, icon: Users, title: 'Notification', time: 'Tomorrow · 09:20 PM', color: 'text-gray-500' },
];

export function ActivitiesWidget() {
    return (
        <Card className="shadow-sm">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold">Activities</CardTitle>
                    <Button size="sm" className="bg-black hover:bg-gray-800 text-white">
                        <Plus className="h-4 w-4 mr-1" />
                        Activity
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Today Section */}
                <div>
                    <h3 className="text-sm font-semibold text-black mb-3">Today</h3>
                    <div className="space-y-3">
                        {todayActivities.map((activity) => (
                            <div key={activity.id} className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-gray-300 mt-2" />
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <activity.icon className={`h-4 w-4 ${activity.color}`} />
                                        <span className="text-sm font-medium text-gray-900">{activity.title}</span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-0.5">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Upcoming Section */}
                <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Upcoming</h3>
                    <div className="space-y-3">
                        {upcomingActivities.map((activity) => (
                            <div key={activity.id} className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-gray-300 mt-2" />
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <activity.icon className={`h-4 w-4 ${activity.color}`} />
                                        <span className="text-sm font-medium text-gray-900">{activity.title}</span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-0.5">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
