"use client";

import { cn } from "@/lib/utils";

export function Marquee({
  children,
  reverse = false,
  speedSeconds = 45,
  pauseOnHover = true,
  className,
  gap = "1.25rem",
}: {
  children: React.ReactNode;
  reverse?: boolean;
  speedSeconds?: number;
  pauseOnHover?: boolean;
  className?: string;
  gap?: string;
}) {
  return (
    <div
      className={cn("group relative flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]", className)}
    >
      <div
        className={cn(
          "flex w-max shrink-0 animate-marquee items-stretch",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
        style={{ gap, ["--marquee-duration" as string]: `${speedSeconds}s` }}
      >
        <div className="flex shrink-0 items-stretch" style={{ gap }}>
          {children}
        </div>
        <div className="flex shrink-0 items-stretch" style={{ gap }} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
