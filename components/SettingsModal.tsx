"use client";

import { useStore } from "@/store/useStore";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Download, Upload, Trash2 } from "lucide-react";
import { useRef } from "react";
import { Concept } from "@/types";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { concepts, importConcepts, resetDatabase } = useStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const dataStr = JSON.stringify(concepts, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    const exportFileDefaultName = `sygill_backup_${
      new Date().toISOString().split("T")[0]
    }.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const importedConcepts = JSON.parse(content);
        if (Array.isArray(importedConcepts)) {
          importConcepts(importedConcepts as Concept[]);
          alert("Database restored successfully!");
          onClose();
        } else {
          alert("Invalid backup file format.");
        }
      } catch (error) {
        console.error("Error importing file:", error);
        alert("Invalid JSON file");
      }
    };
    reader.readAsText(file);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-lg">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Data Management</h2>
        <h2 className="text-2xl font-bold">Configuration</h2>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              AI Personality (System Prompt)
            </label>
            <textarea
              className="w-full h-32 p-3 rounded-lg bg-secondary/50 border border-white/10 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all resize-none text-sm"
              placeholder="Define how the AI should behave..."
              value={useStore.getState().systemPrompt}
              onChange={(e) =>
                useStore.getState().setSystemPrompt(e.target.value)
              }
            />
            <p className="text-xs text-muted-foreground">
              Define the persona and behavior of your AI assistant.
            </p>
          </div>

          <div className="space-y-2 pt-4 border-t border-white/10">
            <label className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Future Options (Coming Soon)
            </label>
            <div className="space-y-2 opacity-60 pointer-events-none grayscale">
              <div className="flex items-center justify-between p-3 rounded-lg border border-white/5 bg-secondary/20">
                <span className="text-sm">Interface Language</span>
                <span className="text-xs border border-white/10 px-2 py-1 rounded">
                  English
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-white/5 bg-secondary/20">
                <span className="text-sm">Font Size</span>
                <span className="text-xs border border-white/10 px-2 py-1 rounded">
                  Medium
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-white/5 bg-secondary/20">
                <span className="text-sm">Sound Effects</span>
                <div className="h-4 w-8 rounded-full bg-white/10 relative">
                  <div className="absolute left-0 top-0 h-4 w-4 rounded-full bg-white/30"></div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-white/5 bg-secondary/20">
                <span className="text-sm">Reduce Motion</span>
                <div className="h-4 w-8 rounded-full bg-white/10 relative">
                  <div className="absolute left-0 top-0 h-4 w-4 rounded-full bg-white/30"></div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-white/5 bg-secondary/20">
                <span className="text-sm">Default View</span>
                <span className="text-xs border border-white/10 px-2 py-1 rounded">
                  Grid
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-white/10">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Data Management
          </h3>
          <Button
            onClick={handleExport}
            className="w-full justify-start"
            variant="outline"
          >
            <Download className="mr-2 h-4 w-4" /> Export Backup (JSON)
          </Button>

          <div className="relative">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImport}
              accept=".json"
              className="hidden"
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="w-full justify-start"
              variant="outline"
            >
              <Upload className="mr-2 h-4 w-4" /> Restore Backup (JSON)
            </Button>
          </div>

          <div className="pt-4 border-t border-white/10">
            <Button
              onClick={() => {
                if (confirm("Delete all data? This cannot be undone."))
                  resetDatabase();
              }}
              className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-500/10"
              variant="ghost"
            >
              <Trash2 className="mr-2 h-4 w-4" /> Reset Database
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
