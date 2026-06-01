import * as React from "react";
import {
  BarChart3,
  Bot,
  Box,
  Camera,
  Code2,
  Cog,
  Compass,
  Cpu,
  Database,
  Eye,
  FileCode,
  GitBranch,
  Globe,
  HardDrive,
  Layers,
  Map,
  Package,
  Scan,
  Search,
  Server,
  Settings,
  Shield,
  SlidersHorizontal,
  Target,
  Terminal,
  ToggleLeft,
  Zap,
  type LucideProps,
} from "lucide-react";

const zhMap: Record<string, string> = {
  "PID 控制": "PID Control",
  "计算机视觉": "Computer Vision",
  "控制理论": "Control Theory",
  "LQR 控制器": "LQR Controller",
  "Luenberger 观测器": "Luenberger Observer",
};

const iconMap: Record<string, React.ComponentType<LucideProps>> = {
  Rust: Cog,
  Python: Terminal,
  TypeScript: FileCode,
  "C++": Code2,
  "Next.js": Globe,
  WASM: Cpu,
  ECS: Layers,
  Axum: Server,
  FastAPI: Zap,
  ROS2: Bot,
  PostgreSQL: Database,
  Redis: HardDrive,
  LangGraph: GitBranch,
  "UCAN/DID": Shield,
  OpenCV: Camera,
  "Computer Vision": Eye,
  YOLOv5: Target,
  "Meta SAM2": Scan,
  Docker: Package,
  Colmap: Map,
  Octomap: Box,
  OpenMVS: Box,
  "VINS-Fusion": Eye,
  Navigation2: Compass,
  "PID Control": Settings,
  "Control Theory": SlidersHorizontal,
  "LQR Controller": ToggleLeft,
  "Luenberger Observer": Search,
  "MATLAB/Simulink": BarChart3,
};

function normalizeTechName(tech: string): string {
  return zhMap[tech] || tech;
}

export function getTechIcon(tech: string): React.ComponentType<LucideProps> {
  const normalized = normalizeTechName(tech);
  return iconMap[normalized] || Code2;
}

interface TechIconProps {
  tech: string;
  className?: string;
  size?: number;
}

export function TechIcon({ tech, className, size = 14 }: TechIconProps) {
  const Icon = getTechIcon(tech);
  return <Icon size={size} className={className} strokeWidth={1.5} />;
}