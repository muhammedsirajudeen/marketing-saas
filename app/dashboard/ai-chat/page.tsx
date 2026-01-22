'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Send, MessageSquare, User, Sparkles } from 'lucide-react';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

export default function AIChatPage() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: 'Hello! I am your sophisticated AI marketing assistant. I can help you analyze data, generate content, or optimize your campaigns.',
            timestamp: new Date(),
        },
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const handleSendMessage = (text: string = inputValue) => {
        if (!text.trim()) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: text,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, newMessage]);
        setInputValue('');
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            const aiResponse: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: 'I am analyzing your request. As an AI demonstration, I can confirm your marketing metrics are trending positively. Would you like a detailed report?',
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, aiResponse]);
            setIsTyping(false);
        }, 1500);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    const suggestions = [
        "Analyze this month's ROI",
        "Generate a social media post",
        "Draft a cold email",
        "Explain my customer churn",
    ];

    return (
        <div className="h-full flex flex-col bg-gray-50/50">
            <header className="flex h-14 items-center gap-4 border-b bg-white px-6 w-full sticky top-0 z-10 shadow-sm">
                <div className="flex items-center gap-2">
                    <SidebarTrigger />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Sparkles className="h-5 w-5 text-purple-600" />
                    <h1 className="text-lg font-semibold text-gray-800">AI Assistant</h1>
                </div>
            </header>

            <div className="flex-1 overflow-hidden flex flex-col relative w-full max-w-5xl mx-auto p-4 sm:p-6">
                <ScrollArea className="flex-1 pr-4 -mr-4">
                    <div className="space-y-6 pb-4">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex items-start gap-4 ${message.role === 'user' ? 'flex-row-reverse' : ''
                                    }`}
                            >
                                <Avatar className={`h-10 w-10 border shadow-sm ${message.role === 'assistant' ? 'bg-white' : 'bg-black'}`}>
                                    {message.role === 'assistant' ? (
                                        <div className="flex h-full w-full items-center justify-center bg-black text-white">
                                            <MessageSquare className="h-5 w-5" />
                                        </div>
                                    ) : (
                                        <AvatarFallback className="text-white bg-black">You</AvatarFallback>
                                    )}
                                </Avatar>
                                <div
                                    className={`rounded-2xl px-5 py-3 text-sm shadow-sm max-w-[80%] leading-relaxed ${message.role === 'user'
                                        ? 'bg-black text-white rounded-tr-none'
                                        : 'bg-white text-gray-800 border-gray-100 border rounded-tl-none'
                                        }`}
                                >
                                    <p>{message.content}</p>
                                    <span className={`text-[10px] mt-2 block ${message.role === 'user' ? 'text-white/70' : 'text-gray-400'}`}>
                                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex items-start gap-4">
                                <Avatar className="h-10 w-10 border shadow-sm bg-white">
                                    <div className="flex h-full w-full items-center justify-center bg-black text-white">
                                        <MessageSquare className="h-5 w-5 animate-pulse" />
                                    </div>
                                </Avatar>
                                <div className="rounded-2xl rounded-tl-none px-5 py-3 bg-white text-gray-800 border-gray-100 border shadow-sm">
                                    <div className="flex gap-1">
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </ScrollArea>

                <div className="mt-6 flex flex-col gap-4">
                    {messages.length === 1 && (
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-2">
                            {suggestions.map((suggestion) => (
                                <button
                                    key={suggestion}
                                    onClick={() => handleSendMessage(suggestion)}
                                    className="text-left text-xs p-3 rounded-lg border bg-white hover:bg-gray-50 hover:border-purple-200 hover:text-purple-700 transition-colors shadow-sm"
                                >
                                    {suggestion}
                                </button>
                            ))}
                        </div>
                    )}

                    <div className="relative rounded-xl shadow-lg border-2 border-gray-100 bg-white ring-offset-2 focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-transparent transition-all">
                        <Input
                            placeholder="Message AI..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="pr-12 py-6 border-0 focus-visible:ring-0 shadow-none bg-transparent"
                        />
                        <Button
                            size="icon"
                            className={`absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-lg transition-all ${inputValue.trim() ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                                }`}
                            onClick={() => handleSendMessage()}
                            disabled={!inputValue.trim()}
                        >
                            <Send className="h-4 w-4" />
                        </Button>
                    </div>
                    <p className="text-center text-[10px] text-gray-400">
                        AI generated content may be inaccurate.
                    </p>
                </div>
            </div>
        </div>
    );
}
