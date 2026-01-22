'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Maximize2, Plus, Minus } from 'lucide-react';
import { useState } from 'react';

const featureChecklistItems = [
    'Field service job status update working',
    'Quotation → invoice flow smooth',
    'Notifications module pending tests',
    'AI assistant context improvements',
];

const quickReminders = [
    'Push to staging before production',
    'Keep ".env" synced across dev, staging, and prod',
    'Document endpoints after every update',
    'Verify role-based access in dashboard',
];

export function CustomWidgets() {
    const [waterGlasses, setWaterGlasses] = useState(4);

    return (
        <div className="space-y-4">
            {/* Water Tracker Widget */}
            <Card className="shadow-sm bg-white border-2 border-gray-200">
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-semibold">Glasses of water</CardTitle>
                        <Maximize2 className="h-4 w-4 text-gray-400" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold text-gray-900">
                            {waterGlasses} / 10
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setWaterGlasses(Math.max(0, waterGlasses - 1))}
                                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                            >
                                <Minus className="h-4 w-4 text-gray-600" />
                            </button>
                            <button
                                onClick={() => setWaterGlasses(Math.min(10, waterGlasses + 1))}
                                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                            >
                                <Plus className="h-4 w-4 text-gray-600" />
                            </button>
                            <button className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                                <Maximize2 className="h-4 w-4 text-gray-600" />
                            </button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Feature Checklist Widget */}
            <Card className="shadow-sm bg-white border-2 border-gray-200">
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-semibold">Feature Checklist</CardTitle>
                        <Maximize2 className="h-4 w-4 text-gray-600" />
                    </div>
                </CardHeader>
                <CardContent className="space-y-2">
                    {featureChecklistItems.map((item, index) => (
                        <div key={index} className="flex items-start gap-2">
                            <Checkbox className="mt-0.5" />
                            <span className="text-sm text-gray-800">{item}</span>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Quick Reminders Widget */}
            <Card className="shadow-sm bg-white border-2 border-gray-200">
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-semibold">Quick Reminders</CardTitle>
                        <Maximize2 className="h-4 w-4 text-gray-600" />
                    </div>
                </CardHeader>
                <CardContent className="space-y-2">
                    {quickReminders.map((reminder, index) => (
                        <div key={index} className="flex items-start gap-2">
                            <span className="text-sm text-gray-800">• {reminder}</span>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}
