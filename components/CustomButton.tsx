// src/components/ui/CustomButton.tsx
'use client';

import type { ButtonProps } from "@heroui/react";
import type { VariantProps } from "tailwind-variants";
import { Button, buttonVariants } from "@heroui/react";
import { tv } from "tailwind-variants";

// 1. Définition des variantes personnalisées
const myButtonVariants = tv({
  base: "text-md font-normal shadow-md text-shadow-lg data-[pending=true]:opacity-40 gap-2",
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
      lg: "h-12 px-8",
      md: "h-11 px-6",
      sm: "h-10 px-4",
      xl: "h-13 px-10",
    },
    variant: {
      primary: "text-white dark:bg-white/10 dark:text-white dark:hover:bg-white/15",
      secondary: "text-white font-normal text-lg border-3 border-white/30 bg-transparent hover:bg-white hover:text-black hover:border-white px-6",
    },
  },
});

// 2. Création des types
type MyButtonVariants = VariantProps<typeof myButtonVariants>;

// On fusionne les props natives du Button avec nos variantes
export type CustomButtonProps = Omit<ButtonProps, "className"> &
  MyButtonVariants & { className?: string };

// 3. Le composant final
export const CustomButton = ({ className, radius, variant, size, ...props }: CustomButtonProps) => {
  return (
    <Button
      className={myButtonVariants({ className, radius, variant, size })}
      {...props}
    />
  );
};