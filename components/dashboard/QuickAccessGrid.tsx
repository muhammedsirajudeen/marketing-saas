'use client';

import { BarChart3, ShoppingCart, Briefcase, Wrench, FileText, FileSpreadsheet, Zap } from 'lucide-react';
import Link from 'next/link';

const modules = [
    { icon: BarChart3, label: 'CRM', href: '/dashboard/crm', bgColor: 'bg-gray-100', iconColor: 'text-black' },
    { icon: ShoppingCart, label: 'Sales', href: '/dashboard/sales', bgColor: 'bg-gray-100', iconColor: 'text-black' },
    { icon: Briefcase, label: 'Projects', href: '/dashboard/projects', bgColor: 'bg-gray-100', iconColor: 'text-black' },
    { icon: Wrench, label: 'Field Ser...', href: '/dashboard/field-service', bgColor: 'bg-gray-100', iconColor: 'text-black' },
    { icon: FileText, label: 'Files', href: '/dashboard/files', bgColor: 'bg-gray-100', iconColor: 'text-black' },
    { icon: FileSpreadsheet, label: 'Forms', href: '/dashboard/forms', bgColor: 'bg-gray-100', iconColor: 'text-black' },
    { icon: Zap, label: 'Automat...', href: '/dashboard/automations', bgColor: 'bg-gray-100', iconColor: 'text-black' },
];

export function QuickAccessGrid() {
    return (
        <div className="flex gap-4 items-center justify-center">
            {modules.map((module) => (
                <Link
                    key={module.label}
                    href={module.href}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                >
                    <div className={`w-12 h-12 ${module.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <module.icon className={`h-6 w-6 ${module.iconColor}`} />
                    </div>
                    <span className="text-xs font-medium text-gray-700">{module.label}</span>
                </Link>
            ))}
        </div>
    );
}
