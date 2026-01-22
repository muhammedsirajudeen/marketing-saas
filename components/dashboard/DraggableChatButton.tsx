'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useDragControls } from 'framer-motion';
import { MessageSquare } from 'lucide-react';

export function DraggableChatButton() {
    const router = useRouter();
    const [isDragging, setIsDragging] = useState(false);
    const dragControls = useDragControls();

    const handleClick = (e: React.MouseEvent) => {
        // Prevent navigation if it was a drag interaction
        if (isDragging) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }
        router.push('/dashboard/ai-chat');
    };

    return (
        <motion.div
            drag
            dragMomentum={false}
            dragElastic={0.1}
            dragControls={dragControls}
            dragListener={true}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => {
                setTimeout(() => setIsDragging(false), 50);
            }}
            className="fixed bottom-6 right-6 z-[100] cursor-grab active:cursor-grabbing touch-none"
            style={{ touchAction: 'none' }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >
            <div
                onClick={handleClick}
                className="h-14 w-14 rounded-full shadow-xl bg-black text-white hover:bg-zinc-800 transition-all border-2 border-white/20 flex items-center justify-center"
            >
                <MessageSquare className="h-7 w-7 pointer-events-none" />
            </div>
        </motion.div>
    );
}
