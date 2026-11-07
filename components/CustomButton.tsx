// src/components/ui/CustomButton.tsx
'use client';

import { Children } from 'react';
import type { ButtonProps } from "@heroui/react";
import type { VariantProps } from "tailwind-variants";
import { Button, buttonVariants } from "@heroui/react";
import { tv } from "tailwind-variants";

// 1. Definition of custom variants
const myButtonVariants = tv({
  // Same language as the hero's pills: no outline (jagged with fractional
  // display scaling), tracked uppercase type, no shadows
  base: "relative isolate uppercase font-medium tracking-[0.1em] leading-none [&_svg]:translate-y-px data-[pending=true]:opacity-40 transition-colors duration-300 ease-out",
  defaultVariants: {
    radius: "full",
    variant: "primary",
  },
  extend: buttonVariants,
  variants: {
    radius: {
      full: "rounded-full",
      lg: "rounded-lg",
      md: "rounded-md",
      sm: "rounded-sm",
    },
    size: {
      sm: "h-9 px-4 text-[11px] gap-3",
      md: "h-10 px-5 text-xs gap-3",
      lg: "h-11 px-6 text-[13px] gap-3",
      xl: "h-12 px-7 text-sm gap-3.5",
    },
    variant: {
      // Rest: a cool light gray, not full white; hover: near white with a
      // light halo (a glow, not a drop shadow); same on keyboard focus.
      // Both carry a touch of blue (hue 257, the palette's): a neutral white
      // glow reads yellowish against the cool background
      primary: [
        "bg-gray-300 text-black hover:bg-[oklch(97%_0.012_257)] focus-visible:bg-[oklch(97%_0.012_257)]",
        "hover:shadow-[0_0_20px_oklch(82%_0.09_257/0.3)] focus-visible:shadow-[0_0_20px_oklch(82%_0.09_257/0.3)]",
        "transition-[background-color,box-shadow] duration-300",
      ],
      // Subtle fill; on hover a white layer fades in (opacity is smoother
      // than animating the background color)
      secondary: [
        "bg-white/6 text-white/90 hover:text-black focus-visible:text-black",
        "before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:bg-white",
        "before:opacity-0 hover:before:opacity-100 focus-visible:before:opacity-100",
        // Slower, eased in and out (a gentle fade, not a flash); the label
        // color follows the same curve
        "duration-400 ease-[cubic-bezier(0.45,0,0.55,1)] before:transition-opacity before:duration-400 before:ease-[cubic-bezier(0.45,0,0.55,1)]",
      ],
    },
  },
});

// 2. Type creation
type MyButtonVariants = VariantProps<typeof myButtonVariants>;

// We merge the native Button props with our variants
export type CustomButtonProps = Omit<ButtonProps, "className"> &
  MyButtonVariants & { className?: string };

// 3. The final component
export const CustomButton = ({ className, radius, variant, size, children, ...props }: CustomButtonProps) => {
  // Uppercase labels look ~1px too high when centered (the line box keeps
  // room for descenders capitals don't have): nudge the text 1px down; the
  // icons follow (base class), so both stay aligned
  const content = typeof children === 'function'
    ? children
    : Children.map(children, (child) =>
      typeof child === 'string' ? <span className="relative top-px">{child}</span> : child
    );

  return (
    <Button
      className={myButtonVariants({ className, radius, variant, size })}
      {...props}
    >
      {content}
    </Button>
  );
};