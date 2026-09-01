import React, { useState, useEffect } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Terminal from './Terminal';
import { TProject, TTechnology, TExperience, TCertificate } from "@/types";

interface FloatingTerminalProps {
    data?: {
        projects: TProject[];
        skills: TTechnology[];
        experiences: TExperience[];
        certificates: TCertificate[];
        contactEmail: string;
        location: string;
    };
}

const FloatingTerminal: React.FC<FloatingTerminalProps> = ({ data: initialData }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [data, setData] = useState(initialData);

    // Fetch data if not provided
    useEffect(() => {
        if (!data && isOpen) {
            fetch('/api/terminal-data')
                .then(res => res.json())
                .then(json => setData(json))
                .catch(err => console.error('Failed to fetch terminal data:', err));
        }
    }, [isOpen, data]);

    // Close terminal with Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                setIsOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    return (
        <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-4">
            <AnimatePresence>
                {isOpen && !isMinimized && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20, transformOrigin: 'bottom right' }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="w-[90vw] md:w-[600px] h-[70vh] md:h-[500px] mb-4 shadow-2xl relative"
                    >
                        {/* Terminal Window Controls */}
                        <div className="absolute top-2 right-4 z-50 flex gap-2">
                            <button 
                                onClick={() => setIsMinimized(true)}
                                aria-label="Minimize terminal"
                                className="p-1 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
                                title="Minimize"
                            >
                                <Minimize2 size={16} />
                            </button>
                            <button 
                                onClick={() => setIsOpen(false)}
                                aria-label="Close terminal"
                                className="p-1 hover:bg-red-500/20 rounded-full transition-colors text-gray-400 hover:text-red-500"
                                title="Close"
                            >
                                <X size={16} />
                            </button>
                        </div>
                        
                        <Terminal data={data} className="h-full border-2 border-primary/20" />
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex items-center gap-3">
                <AnimatePresence>
                    {isMinimized && isOpen && (
                        <motion.button
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            onClick={() => setIsMinimized(false)}
                            aria-label="Restore terminal window"
                            className="bg-primary/20 backdrop-blur-md border border-primary/30 text-primary px-4 py-2 rounded-full text-xs font-bold hover:bg-primary/30 transition-all flex items-center gap-2"
                        >
                            <Maximize2 size={14} />
                            Restore Terminal
                        </motion.button>
                    )}
                </AnimatePresence>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                        if (isOpen && isMinimized) {
                            setIsMinimized(false);
                        } else {
                            setIsOpen(!isOpen);
                        }
                    }}
                    aria-label="Toggle terminal"
                    className={`p-4 rounded-full shadow-lg transition-all duration-300 ${
                        isOpen 
                        ? 'bg-red-500 hover:bg-red-600 text-white' 
                        : 'bg-primary hover:bg-primary/90 text-primary-foreground'
                    }`}
                >
                    {isOpen ? <X size={24} /> : <TerminalIcon size={24} />}
                </motion.button>
            </div>
        </div>
    );
};

export default FloatingTerminal;
