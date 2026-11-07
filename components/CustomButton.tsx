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
  base: "relative isolate uppercase font-medium tracking-[0.1em] leading-none data-[pending=true]:opacity-40 transition-colors duration-300 ease-out",
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
      primary: "bg-[#ebedf0] text-black hover:bg-white",
      // Subtle fill; on hover a white layer fades in (opacity is smoother
      // than animating the background color)
      secondary: [
        "bg-white/6 text-white/90 hover:text-black focus-visible:text-black",
        "before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:bg-white",
        "before:opacity-0 hover:before:opacity-100 focus-visible:before:opacity-100",
        "before:transition-opacity before:duration-300 before:ease-out",
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
  // room for descenders capitals don't have): nudge the text only, icons
  // are already centered
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