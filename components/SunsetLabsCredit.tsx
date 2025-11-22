"use client";

import React from "react";

export function SunsetLabsCredit() {
  return (
    <div className="text-center pt-6 pb-6 border-t border-gray-200 dark:border-gray-800/50">
      <a
        href="https://sunsetlabs.dev"
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-block"
      >
        <div className="flex items-center justify-center gap-1 mb-2">
          <span
            className="text-sunsetlabs-magenta dark:text-sunsetlabs-pink font-mono text-lg group-hover:text-sunsetlabs-pink dark:group-hover:text-sunsetlabs-magenta transition-all duration-300"
            style={{ textShadow: "0 0 10px rgba(198, 130, 177, 0.3)" }}
          >
            {"{"}
          </span>
          <span
            className="text-orange-600 dark:text-sunsetlabs-orange font-bold text-base tracking-wide"
            style={{ textShadow: "0 0 15px rgba(253, 173, 31, 0.4)" }}
          >
            Sunset
          </span>
          <span
            className="text-sunsetlabs-magenta dark:text-sunsetlabs-pink font-bold text-base tracking-wide group-hover:text-sunsetlabs-pink dark:group-hover:text-sunsetlabs-magenta transition-all duration-300"
            style={{ textShadow: "0 0 15px rgba(198, 130, 177, 0.4)" }}
          >
            Labs
          </span>
          <span
            className="text-sunsetlabs-magenta dark:text-sunsetlabs-pink font-mono text-lg group-hover:text-sunsetlabs-pink dark:group-hover:text-sunsetlabs-magenta transition-all duration-300"
            style={{ textShadow: "0 0 10px rgba(198, 130, 177, 0.3)" }}
          >
            {"}"}
          </span>
        </div>
        <p className="text-gray-800 dark:text-gray-300 text-xs group-hover:text-black dark:group-hover:text-white transition-colors font-medium">
          Web Development from Margarita Island, Venezuela 🏝️
        </p>
      </a>
    </div>
  );
}
