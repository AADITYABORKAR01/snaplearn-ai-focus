
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative w-8 h-8">
        <div className="absolute inset-0 bg-snapblue rounded-md rotate-45 transform origin-center"></div>
        <div className="absolute inset-0 flex items-center justify-center text-white font-bold">S</div>
      </div>
      <span className="font-bold text-xl tracking-tight">SnapLearn</span>
    </div>
  );
}
