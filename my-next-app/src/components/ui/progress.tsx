"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils"
import { useRef } from "react";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>

>(({ className, value, ...props }, ref) => {
  const innerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(innerRef, { once: true });
  return(
    
  <ProgressPrimitive.Root
    ref={innerRef}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-[#EDCF5D] transition-all duration-700"
      style={{ transform: isInView? `translateX(-${100 - (value || 0)}%)`: "translateX(-100%)"}}
    />
  </ProgressPrimitive.Root>
  )
  
  
})
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
