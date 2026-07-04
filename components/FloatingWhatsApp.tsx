"use client";

import { motion } from "motion/react";
import { MessageCircle } from "lucide-react";
import { waLink, waMsg } from "@/lib/site";

export function FloatingWhatsApp() {
  return (
    <motion.a
      href={waLink(waMsg.general)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Boho Pods on WhatsApp"
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.3, type: "spring", stiffness: 260, damping: 20 }}
      className="group fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-[#25D366] py-3 pl-3 pr-4 text-white shadow-lg shadow-black/25 transition-colors hover:bg-[#1ebe5d]"
    >
      <span className="absolute left-3 inline-flex size-5 animate-ping rounded-full bg-white/50 opacity-60" />
      <MessageCircle className="relative size-5" />
      <span className="relative text-sm font-medium font-display max-sm:hidden">
        WhatsApp
      </span>
    </motion.a>
  );
}
