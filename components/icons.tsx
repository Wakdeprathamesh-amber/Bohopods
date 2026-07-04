import {
  Compass,
  CalendarClock,
  Blocks,
  Wallet,
  Users,
  ShieldCheck,
  FileCheck,
  Hourglass,
  Wrench,
  Plug,
  CloudSun,
  Stamp,
  Leaf,
} from "lucide-react";
import type { ComponentType } from "react";

/** Name → icon component map, so content can stay as plain data in lib/site.ts. */
export const icons: Record<string, ComponentType<{ className?: string }>> = {
  Compass,
  CalendarClock,
  Blocks,
  Wallet,
  Users,
  ShieldCheck,
  FileCheck,
  Hourglass,
  Wrench,
  Plug,
  CloudSun,
  Stamp,
  Leaf,
};
