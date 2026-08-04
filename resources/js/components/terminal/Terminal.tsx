import React, { useState, useEffect, useRef } from 'react';
import { TProject, TTechnology, TExperience, TCertificate } from "@/types";
import { motion, AnimatePresence } from "framer-motion";

interface TerminalProps {
    data?: {
        projects: TProject[];
        skills: TTechnology[];
        experiences: TExperience[];
        certificates: TCertificate[];
        contactEmail: string;
        location: string;
    };
    className?: string;
}

interface HistoryItem {
    command?: string;
    output: React.ReactNode;
}

const ASCII_ART = `
  _____ _   _                     _   _       _   _        
 |_   _| | | |                   | | | |     | | | |       
   | | | |_| |__   __ _ _ __ ___ | |_| | __ _| |_| |_ __ _ 
   | | | __| '_ \\ / _\` | '_ \` _ \\|  _  |/ _\` | __| __/ _\` |
  _| |_| |_| | | | (_| | | | | | | | | | (_| | |_| || (_| |
 |_____|\\__|_| |_|\\__,_|_| |_| |_|_| |_|\\__,_|\\__|\\__\\__,_|
                                                            
       FULL STACK DEVELOPER | AI ASSISTANT V2.0
`;

const Terminal: React.FC<TerminalProps> = ({ data, className }) => {
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [input, setInput] = useState('');
    const [isBooting, setIsBooting] = useState(true);
    const [isTyping, setIsTyping] = useState(false);
    const terminalEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [history]);

    useEffect(() => {
        const bootSequence = async () => {
            const lines = [
                "Initializing Portfolio Assistant...",
                "Loading system components...",
                "System Check: CPU [OK], RAM [OK], NETWORK [OK]",
                "Security: Connection established via secure_tunnel",
                "Ready."
            ];

            for (const line of lines) {
                await new Promise(resolve => setTimeout(resolve, 300));
                setHistory(prev => [...prev, { output: <span className="text-blue-400 opacity-70">[{new Date().toLocaleTimeString()}] {line}</span> }]);
            }
            
            await new Promise(resolve => setTimeout(resolve, 500));
            setHistory(prev => [...prev, { output: <pre className="text-primary font-bold text-[8px] md:text-[10px] leading-tight mb-4 whitespace-pre">{ASCII_ART}</pre> }]);
            setHistory(prev => [...prev, { output: <div className="mb-4 text-gray-400">Hello! I'm the AI Assistant for Ilham Hatta's portfolio. How can I help you today? (Type <span className="text-yellow-400 font-bold">help</span> to see what I can do)</div> }]);
            
            setIsBooting(false);
        };

        bootSequence();
    }, []);

    const handleCommand = async (cmd: string) => {
        const cleanCmd = cmd.toLowerCase().trim();
        let output: React.ReactNode = null;

        // Add user command to history immediately
        setHistory(prev => [...prev, { command: cmd, output: null }]);
        
        // Start typing indicator
        setIsTyping(true);
        await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1000));
        setIsTyping(false);

        if (!data && ['projects', 'skills', 'exp', 'photos', 'about', 'contact'].includes(cleanCmd)) {
            output = <div className="text-red-400">Error: System data not loaded. Please try again later.</div>;
            setHistory(prev => {
                const newHistory = [...prev];
                if (newHistory.length > 0) newHistory[newHistory.length - 1].output = output;
                return newHistory;
            });
            return;
        }

        switch (cleanCmd) {
            case 'help':
            case 'menu':
            case 'apa yang bisa kamu lakukan':
                output = (
                    <div className="mt-2">
                        <p className="text-gray-300 mb-2">I can help you explore Ilham's portfolio. Here are some things you can ask me:</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 mt-2 border-l-2 border-yellow-400/30 pl-4 py-2 bg-yellow-400/5">
                            <div><span className="text-yellow-400 font-bold w-20 inline-block">about</span> "Tell me about Ilham"</div>
                            <div><span className="text-yellow-400 font-bold w-20 inline-block">projects</span> "Show me your projects"</div>
                            <div><span className="text-yellow-400 font-bold w-20 inline-block">skills</span> "What are your skills?"</div>
                            <div><span className="text-yellow-400 font-bold w-20 inline-block">exp</span> "Where have you worked?"</div>
                            <div><span className="text-yellow-400 font-bold w-20 inline-block">profile</span> "Show me your face"</div>
                            <div><span className="text-yellow-400 font-bold w-20 inline-block">contact</span> "How can I contact you?"</div>
                            <div><span className="text-yellow-400 font-bold w-20 inline-block">photos</span> "Show certificates"</div>
                            <div><span className="text-yellow-400 font-bold w-20 inline-block">socials</span> "Check GitHub/LinkedIn"</div>
                            <div><span className="text-yellow-400 font-bold w-20 inline-block">clear</span> "Clear the chat"</div>
                        </div>
                    </div>
                );
                break;
            case 'about':
            case 'siapa itu ilham':
            case 'tell me about ilham':
                output = (
                    <div className="mt-2 text-gray-300 leading-relaxed max-w-3xl">
                        <p className="text-xl font-bold text-white mb-2 underline decoration-primary underline-offset-4">Ilham Hatta Manggala</p>
                        <p>I am a <span className="text-primary">Full Stack Developer</span> who loves crafting immersive digital experiences. My approach blends technical precision with creative problem-solving.</p>
                        <p className="mt-2 text-sm text-gray-400">Currently based in: <span className="text-white">{data?.location || 'Unknown'}</span></p>
                    </div>
                );
                break;
            case 'hi':
            case 'hello':
            case 'halo':
            case 'hey':
                output = (
                    <div className="mt-2 text-gray-300">
                        Hello! How can I assist you today? You can ask about my projects, skills, or even just say hi.
                    </div>
                );
                break;
            case 'thanks':
            case 'terima kasih':
            case 'thank you':
                output = (
                    <div className="mt-2 text-gray-300">
                        You're welcome! Let me know if you need anything else.
                    </div>
                );
                break;
            case 'projects':
                output = (
                    <div className="mt-2 grid gap-4">
                        {data?.projects.map((p, i) => (
                            <motion.div 
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                key={i} 
                                className="group p-3 border border-white/5 bg-white/5 rounded-lg hover:border-primary/50 transition-colors"
                            >
                                <div className="flex justify-between items-start">
                                    <span className="text-primary font-bold text-lg">{p.name}</span>
                                    {p.link && (
                                        <a href={p.link} target="_blank" className="text-[10px] text-gray-500 hover:text-white uppercase tracking-tighter border border-gray-700 px-2 py-0.5 rounded">
                                            Visit ↗
                                        </a>
                                    )}
                                </div>
                                <div className="text-gray-400 text-sm mt-1">{p.descriptions}</div>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {p.library?.map((lib, j) => (
                                        <span key={j} className="text-[10px] text-gray-500">#{lib}</span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                );
                break;
            case 'skills':
                output = (
                    <div className="mt-2">
                        <div className="mb-4 text-gray-400 italic">// Technical Stack Overview</div>
                        <div className="flex flex-wrap gap-3">
                            {data?.skills.map((s, i) => (
                                <motion.div 
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: i * 0.05 }}
                                    key={i} 
                                    className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full text-xs font-bold"
                                >
                                    {s.name}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                );
                break;
            case 'exp':
                output = (
                    <div className="mt-2 space-y-4">
                        {data?.experiences.map((exp, i) => (
                            <div key={i} className="border-l-2 border-primary/30 pl-4 py-1">
                                <div className="text-white font-bold">{exp.title} @ <span className="text-primary">{exp.company_name}</span></div>
                                <div className="text-gray-500 text-xs">{exp.date_range}</div>
                                <ul className="mt-2 space-y-1">
                                    {exp.points.map((point, idx) => (
                                        <li key={idx} className="text-gray-400 text-sm flex gap-2">
                                            <span className="text-primary">•</span>
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                );
                break;
            case 'contact':
                output = (
                    <div className="mt-2 p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                            <span className="text-blue-400 font-bold">CONTACT_INFO</span>
                        </div>
                        <div className="space-y-1">
                            <div>Email: <a href={`mailto:${data?.contactEmail}`} className="text-white hover:text-primary transition-colors">{data?.contactEmail}</a></div>
                            <div>Location: <span className="text-white">{data?.location}</span></div>
                            <div className="text-gray-500 text-sm mt-2 font-italic">"Let's build something extraordinary together."</div>
                        </div>
                    </div>
                );
                break;
            case 'socials':
                output = (
                    <div className="mt-2 flex gap-4">
                        <a href="https://github.com/IlhamHattaManggala" target="_blank" className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded border border-gray-700 transition-all flex items-center gap-2">
                            GitHub
                        </a>
                        <a href="#" className="px-4 py-2 bg-blue-900/50 hover:bg-blue-900 text-white rounded border border-blue-800 transition-all flex items-center gap-2">
                            LinkedIn
                        </a>
                    </div>
                );
                break;
            case 'photos':
                output = (
                    <div className="mt-4">
                        <div className="mb-4 text-gray-400 italic">// Gallery: Certificates & Achievements</div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {data?.certificates.map((cert, i) => (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                    key={i} 
                                    className="relative group overflow-hidden rounded-lg border border-white/10 bg-white/5"
                                >
                                    <div className="aspect-video relative overflow-hidden">
                                        <img 
                                            src={cert.image} 
                                            alt={cert.title} 
                                            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100" 
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>
                                    <div className="p-3">
                                        <div className="text-xs font-bold text-primary truncate">{cert.title}</div>
                                        <div className="text-[10px] text-gray-500">{cert.issuer}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                );
                break;
            case 'profile':
                output = (
                    <div className="mt-4 flex flex-col items-center sm:items-start">
                        <div className="mb-4 text-gray-400 italic">// System User Identity</div>
                        <motion.div 
                            initial={{ opacity: 0, rotateY: 90 }}
                            animate={{ opacity: 1, rotateY: 0 }}
                            className="relative p-1 bg-gradient-to-tr from-primary to-secondary rounded-2xl"
                        >
                            <div className="bg-black rounded-xl overflow-hidden border-4 border-black">
                                <img 
                                    src="/images/profile.webp" 
                                    alt="Profile" 
                                    className="w-32 h-32 md:w-48 md:h-48 object-cover grayscale hover:grayscale-0 transition-all duration-500" 
                                />
                            </div>
                        </motion.div>
                        <div className="mt-4 text-center sm:text-left">
                            <div className="text-xl font-bold text-white">Ilham Hatta Manggala</div>
                            <div className="text-primary font-mono tracking-tighter">Full Stack Developer</div>
                        </div>
                    </div>
                );
                break;
            case 'clear':
                setHistory([]);
                return;
            case 'whoami':
                output = (
                    <div className="mt-2 text-cyan-300 font-mono">
                         <div className="flex flex-col">
                            <span>SESSION_ID: {Math.random().toString(36).substring(7).toUpperCase()}</span>
                            <span>BROWSER: {window.navigator.userAgent.split(' ')[0]}</span>
                            <span>IP_ADDR: 127.0.0.1 (Local)</span>
                            <span>PERMISSIONS: guest_access_level_1</span>
                         </div>
                    </div>
                );
                break;
            case '':
                break;
            default:
                output = (
                    <div className="mt-1">
                        <p className="text-gray-300">I'm not sure I understand that. Try asking about my <span className="text-primary">projects</span>, <span className="text-primary">skills</span>, or <span className="text-primary">about</span> me.</p>
                        <div className="text-gray-500 text-xs mt-1 italic">Type 'help' for a full list of capabilities.</div>
                    </div>
                );
        }

        // Update last history item with output
        setHistory(prev => {
            const newHistory = [...prev];
            if (newHistory.length > 0) {
                newHistory[newHistory.length - 1].output = output;
            }
            return newHistory;
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            handleCommand(input);
            setInput('');
        }
    };

    return (
        <div 
            className={`w-full bg-black/95 backdrop-blur-xl text-green-500 font-mono p-4 md:p-6 rounded-2xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-y-auto relative group ${className || 'h-full'}`}
            onClick={() => inputRef.current?.focus()}
        >
            {/* Terminal Header Bar */}
            <div className="sticky top-[-24px] left-0 right-0 h-8 bg-white/5 border-b border-white/5 flex items-center px-4 justify-between select-none z-30 mb-4">
                <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
                </div>
                <div className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold">
                    Terminal — bash — 80x24
                </div>
                <div className="w-10"></div>
            </div>

            {/* Scanline & Flicker Effect Overlay */}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] z-20 bg-[length:100%_2px,3px_100%] opacity-50"></div>
            
            <div className="relative z-10">
                <AnimatePresence initial={false}>
                    {history.map((item, index) => (
                        <motion.div 
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            key={index} 
                            className="mb-4"
                        >
                            {item.command && (
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-blue-400 font-bold">You</span>
                                    <span className="text-white">›</span>
                                    <span className="text-green-300 ml-1">{item.command}</span>
                                </div>
                            )}
                            {item.output ? (
                                <div className={item.command ? "ml-4 border-l border-white/10 pl-4 py-1" : ""}>
                                    {!item.command && !isBooting && <span className="text-primary font-bold mr-2">AI:</span>}
                                    {item.output}
                                </div>
                            ) : (
                                item.command && <div className="ml-4 h-4" />
                            )}
                        </motion.div>
                    ))}
                    {isTyping && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mb-4 ml-4"
                        >
                            <span className="text-primary font-bold mr-2">AI:</span>
                            <span className="text-gray-500 italic animate-pulse">typing...</span>
                        </motion.div>
                    )}
                </AnimatePresence>

                {!isBooting && (
                    <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-2">
                        <div className="flex items-center gap-2 shrink-0">
                            <span className="text-blue-400 font-bold">You</span>
                            <span className="text-white">›</span>
                        </div>
                        <div className="relative flex-grow">
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                autoFocus
                                spellCheck={false}
                                autoComplete="off"
                                className="bg-transparent border-none outline-none text-green-300 w-full focus:ring-0 p-0 font-mono"
                                placeholder=""
                            />
                            {/* Custom blinking cursor if input is empty */}
                            {input === "" && (
                                <motion.div 
                                    animate={{ opacity: [1, 0] }}
                                    transition={{ duration: 0.8, repeat: Infinity }}
                                    className="w-2 h-5 bg-green-500 absolute left-0 top-0"
                                />
                            )}
                        </div>
                    </form>
                )}
                <div ref={terminalEndRef} />
            </div>

            {/* Vignette effect */}
            <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] z-30"></div>
        </div>
    );
};

export default Terminal;
