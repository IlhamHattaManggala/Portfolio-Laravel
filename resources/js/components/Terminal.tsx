
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Terminal = () => {
  const [text, setText] = useState("");
  const fullText = `// Web & Flutter Developer Portfolio
const profile = {
  name: "Ilham Hatta Manggala",
  role: "Web & Flutter Developer",
  skills: ["React", "Flutter", "Laravel", "Next.js"],
  passions: ["Clean Code", "AI Integration", "Mobile Dev"],
  status: "Open for New Projects"
};`;



  useEffect(() => {
    let currentIndex = 0;
    let isDeleting = false;
    let timeoutId: NodeJS.Timeout;

    const type = () => {
      const currentFullText = fullText;
      
      if (!isDeleting) {
        setText(currentFullText.slice(0, currentIndex));
        currentIndex++;
        
        if (currentIndex > currentFullText.length) {
          // Pause at the end
          timeoutId = setTimeout(() => {
            isDeleting = true;
            type();
          }, 5000); // Wait 5 seconds before resetting
          return;
        }
      } else {
        // Reset immediately or could do a deleting effect
        // User said "jangan memaksakan", so maybe a quick reset is better than reverse typing
        setText("");
        currentIndex = 0;
        isDeleting = false;
        timeoutId = setTimeout(type, 1000); // Wait 1 second before restarting
        return;
      }

      // Variable typing speed for a more natural feel
      const typingSpeed = isDeleting ? 20 : 30 + Math.random() * 20;
      timeoutId = setTimeout(type, typingSpeed);
    };

    type();

    return () => clearTimeout(timeoutId);
  }, [fullText]);


  const renderHighlightedCode = (code: string) => {
    const lines = code.split('\n');
    return lines.map((line, i) => (
      <div key={i} className="min-h-[1.5rem] flex items-center whitespace-pre font-mono">

        {line.split(/(\s+|[{}()[\],;.:=<>!+\-*/&|])|(".*?")|('.*?')|(\/\/.*)/).map((part, j) => {
          if (!part) return null;
          if (part.startsWith('"') || part.startsWith("'")) return <span key={j} className="text-emerald-600 dark:text-[#98c379]">{part}</span>;
          if (part.startsWith('//')) return <span key={j} className="text-slate-400 dark:text-[#5c6370] italic">{part}</span>;
          if (['const', 'function', 'return', 'let', 'var', 'if', 'else', 'for', 'while', 'map'].includes(part)) 
            return <span key={j} className="text-purple-600 dark:text-[#c678dd]">{part}</span>;
          if (['profile', 'exploreExpertise'].includes(part))
            return <span key={j} className="text-blue-600 dark:text-[#61afef]">{part}</span>;
          if (['name', 'role', 'skills', 'passions', 'status'].includes(part))
            return <span key={j} className="text-rose-600 dark:text-[#e06c75]">{part}</span>;
          return <span key={j} className="text-slate-800 dark:text-gray-200">{part}</span>;
        })}
        {i === lines.length - 1 && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="inline-block w-2 h-4 bg-primary ml-1"
          ></motion.span>
        )}
      </div>
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full max-w-2xl mx-auto overflow-hidden rounded-xl border border-slate-200/80 dark:border-white/10 shadow-xl dark:shadow-2xl bg-white dark:bg-black/90 backdrop-blur-md group"
    >
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-100/90 dark:bg-[#161b22] border-b border-slate-200/80 dark:border-white/5">
        <div className="flex space-x-2">
          <div className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] shadow-inner"></div>
          <div className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] shadow-inner"></div>
          <div className="w-3.5 h-3.5 rounded-full bg-[#27c93f] shadow-inner"></div>
        </div>
        <div className="text-[10px] text-slate-500 dark:text-gray-400 font-mono uppercase tracking-widest flex items-center gap-2 font-medium">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
          ilham_hatta — bash
        </div>
        <div className="w-12"></div>
      </div>

      {/* Terminal Body */}
      <div className="p-6 md:p-8 font-mono text-xs md:text-sm leading-relaxed h-[340px] overflow-hidden relative bg-slate-50/50 dark:bg-transparent">
        <div className="flex mb-4 text-slate-500 dark:text-gray-400 items-center">
          <span className="text-emerald-600 dark:text-[#98c379] mr-2 font-bold">➜</span>
          <span className="text-blue-600 dark:text-[#61afef] font-bold">~/portfolio</span>
          <span className="bg-blue-500/10 dark:bg-[#61afef]/10 text-blue-600 dark:text-[#61afef] px-2 py-0.5 rounded mx-2 text-[10px] font-bold">main</span>
          <span className="text-slate-600 dark:text-gray-400">git status</span>
        </div>
        
        <div className="text-slate-800 dark:text-gray-300 relative font-mono">
          {renderHighlightedCode(text)}
        </div>

        {/* Ambient Glow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent pointer-events-none group-hover:opacity-100 opacity-0 transition-opacity duration-500"></div>
      </div>

      {/* Stats Bar */}
      <div className="px-4 py-1.5 bg-slate-100/90 dark:bg-primary/10 border-t border-slate-200/80 dark:border-primary/20 flex justify-between items-center text-[10px] text-slate-500 dark:text-primary/70 uppercase tracking-widest font-bold">
        <span>UTF-8</span>
        <span>Line 14, Col 23</span>
        <span>JavaScript</span>
      </div>
    </motion.div>
  );
};

export default Terminal;
