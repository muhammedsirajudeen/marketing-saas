'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

export function TimeDisplay() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const hours = time.getHours();
    const minutes = time.getMinutes();
    const isPM = hours >= 12;
    const displayHours = hours % 12 || 12;

    return (
        <Card className="shadow-sm bg-white">
            <CardContent className="p-6">
                <div className="flex items-center justify-center gap-4">
                    <div className="text-center">
                        <div className="text-6xl font-bold text-gray-900 tabular-nums">
                            {String(displayHours).padStart(2, '0')}
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-6xl font-bold text-gray-900 tabular-nums">
                            {String(minutes).padStart(2, '0')}
                        </div>
                    </div>
                </div>
                <div className="text-center mt-2">
                    <span className="text-2xl font-semibold text-gray-600">{isPM ? 'PM' : 'AM'}</span>
                </div>
            </CardContent>
        </Card>
    );
}
