// src/components/ui/CustomButton.tsx
'use client';

import type { ButtonProps } from "@heroui/react";
import type { VariantProps } from "tailwind-variants";
import { Button, buttonVariants } from "@heroui/react";
import { tv } from "tailwind-variants";

// 1. Definition of custom variants
const myButtonVariants = tv({
  base: "text-md font-normal shadow-md text-shadow-lg data-[pending=true]:opacity-40 leading-none pt-[2px]",
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
      sm: "h-10 px-4 text-sm gap-2",
      md: "h-11 px-5 text-md gap-2",
      lg: "h-12 px-5 text-lg gap-2",
      xl: "h-13 px-7 text-xl gap-2",
    },
    variant: {
      primary: "bg-[#ededed] text-black hover:bg-white transition-color",
      secondary: "bg-[#1a1a1a] backdrop-blur-md text-white border-3 border-white/30 hover:bg-white hover:text-black hover:border-white transition-all duration-400 ease-in-out",
    },
  },
});

// 2. Type creation
type MyButtonVariants = VariantProps<typeof myButtonVariants>;

// We merge the native Button props with our variants
export type CustomButtonProps = Omit<ButtonProps, "className"> &
  MyButtonVariants & { className?: string };

// 3. The final component
export const CustomButton = ({ className, radius, variant, size, ...props }: CustomButtonProps) => {
  return (
    <Button
      className={myButtonVariants({ className, radius, variant, size })}
      {...props}
    />
  );
};