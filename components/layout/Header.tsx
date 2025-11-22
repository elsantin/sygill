"use client";

import { useStore } from "@/store/useStore";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { SettingsModal } from "@/components/SettingsModal";

export function Header() {
  const { concepts, searchQuery, setSearchQuery } = useStore();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const total = concepts.length;
  const mastered = concepts.filter((c) => c.mastered).length;
  const progress = total > 0 ? (mastered / total) * 100 : 0;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-heading font-normal tracking-[0.3em] uppercase text-foreground/90">
            Sygill
          </span>
        </div>
        <div className="flex flex-1 items-center justify-end gap-4">
          <div className="w-full max-w-xs hidden sm:block">
            <Input
              placeholder="Search concept..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 bg-white! dark:bg-zinc-900/60! border-zinc-200 dark:border-white/10 text-zinc-900! dark:text-zinc-100! placeholder:text-zinc-500! dark:placeholder:text-zinc-400! focus:bg-white! dark:focus:bg-zinc-900! transition-all"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col w-32 gap-1">
              <div className="flex justify-between text-[10px] uppercase tracking-wider text-muted-foreground">
                <span>Mastery</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-1.5 w-full bg-secondary/50 rounded-full overflow-hidden border border-amber-900/20 dark:border-white/5">
                <motion.div
                  className="h-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSettingsOpen(true)}
              className="rounded-full"
            >
              <Settings className="h-[1.2rem] w-[1.2rem]" />
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </div>
      <div className="sm:hidden px-4 pb-4">
        <Input
          placeholder="Search concept..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-9 bg-white! dark:bg-zinc-900/60! border-zinc-200 dark:border-white/10 text-zinc-900! dark:text-zinc-100! placeholder:text-zinc-500! dark:placeholder:text-zinc-400! focus:bg-white! dark:focus:bg-zinc-900! transition-all"
        />
      </div>
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </header>
  );
}
