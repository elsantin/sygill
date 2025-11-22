"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, X, Flame, User, Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export function AIChatInterface() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello. I am Sygill AI, your study assistant. How can I help you master the concepts in your Grimoire today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Prevent scrolling when chat is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "That's an excellent question. Let's break it down.",
        "Based on your current knowledge base, I recommend focusing on the core principles first.",
        "Here is a code snippet that might clarify things for you.",
        "Have you considered how this relates to the other concepts you've mastered?",
        "I can generate a quiz for you on this topic if you'd like.",
      ];
      const randomResponse =
        responses[Math.floor(Math.random() * responses.length)];

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: randomResponse,
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      <AnimatePresence>
        {/* Floating Action Button */}
        {!isOpen && (
          <motion.div
            className="fixed bottom-6 right-6 z-50"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={() => setIsOpen(true)}
              size="icon"
              className="h-14 w-14 rounded-2xl shadow-[0_0_20px_rgba(245,158,11,0.3)] bg-amber-950 text-amber-200 border border-amber-400/60 hover:bg-amber-900 hover:border-amber-300 transition-all duration-300 overflow-hidden group relative"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent" />
              <Flame className="h-7 w-7 relative z-10" />
            </Button>
          </motion.div>
        )}

        {/* Full Screen Chat Overlay */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="w-full max-w-5xl h-[85vh] flex flex-col rounded-2xl border border-white/10 bg-background/95 shadow-2xl overflow-hidden relative"
            >
              {/* Header */}
              <div className="p-4 border-b border-white/5 bg-secondary/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-amber-500/10 border border-amber-500/20">
                    <Flame className="h-5 w-5 text-amber-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg tracking-wide">
                      Sygill AI
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Study Assistant
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full hover:bg-secondary"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "flex gap-4 max-w-[80%]",
                      msg.role === "user" ? "ml-auto flex-row-reverse" : ""
                    )}
                  >
                    <div
                      className={cn(
                        "h-10 w-10 rounded-full flex items-center justify-center shrink-0 border",
                        msg.role === "user"
                          ? "bg-primary/10 border-primary/20"
                          : "bg-amber-500/10 border-amber-500/20"
                      )}
                    >
                      {msg.role === "user" ? (
                        <User className="h-5 w-5 text-primary" />
                      ) : (
                        <Bot className="h-5 w-5 text-amber-500" />
                      )}
                    </div>
                    <div
                      className={cn(
                        "p-4 rounded-2xl text-base leading-relaxed shadow-sm",
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground rounded-tr-none"
                          : "bg-secondary/80 text-gray-900 dark:text-zinc-100 rounded-tl-none border border-gray-200 dark:border-white/5"
                      )}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex gap-4 max-w-[80%]">
                    <div className="h-10 w-10 rounded-full flex items-center justify-center shrink-0 bg-amber-500/10 border border-amber-500/20">
                      <Bot className="h-5 w-5 text-amber-500" />
                    </div>
                    <div className="p-4 rounded-2xl rounded-tl-none bg-secondary/80 border border-white/5 flex items-center gap-1.5">
                      <span
                        className="w-2 h-2 bg-amber-500/50 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      />
                      <span
                        className="w-2 h-2 bg-amber-500/50 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      />
                      <span
                        className="w-2 h-2 bg-amber-500/50 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-6 border-t border-white/5 bg-background/50 backdrop-blur-sm">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                  }}
                  className="flex gap-4 max-w-4xl mx-auto w-full"
                >
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask Sygill AI..."
                    className="h-12 text-base bg-white/80 dark:bg-secondary/50 border-gray-200 dark:border-white/10 focus-visible:ring-amber-500/50 text-gray-900 dark:text-zinc-100 placeholder:text-gray-500 dark:placeholder:text-muted-foreground"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    className="h-12 w-12 shrink-0"
                    disabled={!input.trim() || isTyping}
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
