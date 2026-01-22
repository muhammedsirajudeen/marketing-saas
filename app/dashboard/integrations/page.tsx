'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Facebook,
    Instagram,
    MessageCircle,
    BarChart3,
    Mail,
    Check,
    Search,
    SlidersHorizontal,
    ArrowUpRight,
    Zap,
    Globe
} from "lucide-react";

export default function IntegrationsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState("All");

    const categories = ["All", "Marketing", "Analytics", "Communication", "Social Media", "Productivity"];

    const integrations = [
        {
            id: 'facebook-ads',
            name: 'Facebook Ads',
            description: 'Connect your Facebook Ads account to track performance and generate reports.',
            icon: Facebook,
            color: 'text-blue-600',
            bg: 'bg-blue-50',
            connected: false,
            category: 'Marketing',
            popular: true
        },
        {
            id: 'google-analytics',
            name: 'Google Analytics',
            description: 'Integrate Google Analytics to get insights into your website traffic and user behavior.',
            icon: BarChart3,
            color: 'text-orange-500',
            bg: 'bg-orange-50',
            connected: true,
            category: 'Analytics',
            popular: true
        },
        {
            id: 'whatsapp',
            name: 'WhatsApp Business',
            description: 'Connect WhatsApp Business to send automated notifications and communicate with customers.',
            icon: MessageCircle,
            color: 'text-green-500',
            bg: 'bg-green-50',
            connected: false,
            category: 'Communication',
            popular: false
        },
        {
            id: 'instagram',
            name: 'Instagram',
            description: 'Link your Instagram account to schedule posts, analyze engagement, and reply to DMs.',
            icon: Instagram,
            color: 'text-pink-600',
            bg: 'bg-pink-50',
            connected: false,
            category: 'Social Media',
            popular: true
        },
        {
            id: 'google-workspace',
            name: 'Google Workspace',
            description: 'Sync with Google Workspace for seamless email, calendar, and document management.',
            icon: Mail,
            color: 'text-red-500',
            bg: 'bg-red-50',
            connected: false,
            category: 'Productivity',
            popular: false
        },
        // Adding a few more for the "professional" feel
        {
            id: 'shopify',
            name: 'Shopify',
            description: 'Sync products, orders, and customer data directly from your Shopify store.',
            icon: Globe,
            color: 'text-emerald-600',
            bg: 'bg-emerald-50',
            connected: false,
            category: 'Marketing',
            popular: true
        },
    ];

    const filteredIntegrations = integrations.filter(integration => {
        const matchesSearch = integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            integration.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "All" || integration.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="flex flex-col min-h-full bg-gray-50/50">
            {/* Header */}
            <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b border-gray-200 bg-white px-6 sticky top-0 z-10">
                <div className="flex items-center gap-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="h-6" />
                    <h1 className="text-lg font-semibold text-gray-900">Integrations</h1>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="hidden sm:flex">
                        Documentation
                        <ArrowUpRight className="ml-2 h-4 w-4 text-gray-400" />
                    </Button>
                </div>
            </header>

            <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full">

                {/* Hero / Intro */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Integrations Marketplace</h2>
                        <p className="text-muted-foreground mt-2 text-lg">
                            Supercharge your workflow by connecting your favorite tools.
                        </p>
                    </div>
                </div>

                {/* Filters & Search */}
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search integrations..."
                            className="pl-9 bg-gray-50 border-gray-200 focus-visible:ring-indigo-500"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                        {categories.map((category) => (
                            <Button
                                key={category}
                                variant={selectedCategory === category ? "default" : "ghost"}
                                size="sm"
                                onClick={() => setSelectedCategory(category)}
                                className={`rounded-full px-4 ${selectedCategory === category ? 'bg-black text-white hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}
                            >
                                {category}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                {filteredIntegrations.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredIntegrations.map((integration) => (
                            <Card key={integration.id} className="group border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 hover:border-gray-300 flex flex-col h-full bg-white overflow-hidden">
                                <CardHeader className="pb-4">
                                    <div className="flex items-start justify-between">
                                        <div className={`p-3 rounded-xl ${integration.bg} ${integration.color} transition-colors group-hover:scale-105 duration-200`}>
                                            <integration.icon className="w-8 h-8" />
                                        </div>
                                        {integration.connected ? (
                                            <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
                                                <Check className="w-3 h-3" />
                                                Active
                                            </Badge>
                                        ) : integration.popular && (
                                            <Badge variant="secondary" className="bg-indigo-50 text-indigo-700 border-indigo-100 flex items-center gap-1">
                                                <Zap className="w-3 h-3" />
                                                Popular
                                            </Badge>
                                        )}
                                    </div>
                                    <CardTitle className="mt-4 text-xl font-semibold text-gray-900">{integration.name}</CardTitle>
                                    <CardDescription className="text-sm font-medium text-indigo-600/80">{integration.category}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-1 pb-6">
                                    <p className="text-sm text-gray-500 leading-relaxed">
                                        {integration.description}
                                    </p>
                                </CardContent>
                                <CardFooter className="pt-0 pb-6">
                                    <Button
                                        variant={integration.connected ? "outline" : "default"}
                                        className={`w-full font-medium shadow-none ${integration.connected ? 'border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900' : 'bg-black text-white hover:bg-gray-800'}`}
                                    >
                                        {integration.connected ? 'Manage Connection' : 'Connect'}
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-200">
                        <div className="bg-gray-50 p-4 rounded-full inline-flex mb-4">
                            <Search className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">No integrations found</h3>
                        <p className="text-muted-foreground mt-1">
                            Try adjusting your search or filter to find what you're looking for.
                        </p>
                        <Button
                            variant="link"
                            onClick={() => { setSearchQuery(''); setSelectedCategory('All') }}
                            className="mt-2 text-indigo-600"
                        >
                            Clear filters
                        </Button>
                    </div>
                )}
            </main>
        </div>
    );
}

