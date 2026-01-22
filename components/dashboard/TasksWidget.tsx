'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus } from 'lucide-react';

const tasks = [
    { id: 1, title: 'Add search function in templates', dueDate: 'Today', assignee: null },
    { id: 2, title: 'Update employee role permissions', dueDate: 'Today', assignee: null },
    { id: 3, title: 'Test bulk upload for customer data', dueDate: 'Today', assignee: null },
    { id: 4, title: 'Implement invoice status filter in reports', dueDate: 'Today', assignee: null },
    { id: 5, title: 'Landing page redesign', dueDate: 'Today', assignee: 'Shaifali, Hanan' },
    { id: 6, title: 'LinkedIn post', dueDate: 'Today', assignee: null },
];

const weekDays = [
    { day: 'Sun', date: 13, isToday: true },
    { day: 'Mon', date: 14 },
    { day: 'Tue', date: 15 },
    { day: 'Wed', date: 16 },
    { day: 'Thu', date: 17 },
    { day: 'Fri', date: 18 },
    { day: 'Sat', date: 19 },
];

export function TasksWidget() {
    const [activeTab, setActiveTab] = useState<'mine' | 'assigned'>('mine');

    return (
        <Card className="shadow-sm">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold">Tasks</CardTitle>
                    <Button size="sm" className="bg-black hover:bg-gray-800 text-white">
                        <Plus className="h-4 w-4 mr-1" />
                        Add task
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Tabs */}
                <div className="flex gap-4 border-b">
                    <button
                        onClick={() => setActiveTab('mine')}
                        className={`pb-2 px-1 text-sm font-medium transition-colors ${activeTab === 'mine'
                            ? 'text-gray-900 border-b-2 border-gray-900'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        Mine
                    </button>
                    <button
                        onClick={() => setActiveTab('assigned')}
                        className={`pb-2 px-1 text-sm font-medium transition-colors ${activeTab === 'assigned'
                            ? 'text-gray-900 border-b-2 border-gray-900'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        Assigned
                    </button>
                </div>

                {/* Calendar Week View */}
                <div className="grid grid-cols-7 gap-2">
                    {weekDays.map((day) => (
                        <div
                            key={day.date}
                            className={`text-center p-2 rounded-lg ${day.isToday ? 'bg-black text-white' : 'hover:bg-gray-50'
                                }`}
                        >
                            <div className="text-xs font-medium">{day.day}</div>
                            <div className={`text-lg font-semibold ${day.isToday ? 'text-white' : 'text-gray-900'}`}>
                                {day.date}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Task List */}
                <div className="space-y-2">
                    {tasks.map((task) => (
                        <div key={task.id} className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded-lg">
                            <Checkbox className="mt-0.5" />
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900">{task.title}</p>
                                <p className="text-xs text-gray-500">
                                    {task.dueDate}
                                    {task.assignee && ` · Assigned to ${task.assignee}`}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
