import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const hoverStyles =
  "hover:bg-white hover:text-penni-main hover:headline hover:border hover:border-2 hover:border-penni-main hover:rounded-lg hover:border-solid";
// rounded-lg corresponds to 8px border radius
// added hover variant
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: `bg-penni-main text-white headline rounded-lg ${hoverStyles}`, // Default blue
        link: `bg-white text-penni-main headline rounded-lg`,
        inactive: `bg-penni-grey-inactive text-white text-opacity-50 headline rounded-lg disabled:opacity-100`,
        floating: `bg-penni-main text-white subheadline-medium rounded-penni-special`,
        pay: `bg-penni-main text-white subheadline rounded-penni-special`,
        finish: `bg-penni-grey-finished text-penni-text-finish body-medium rounded-penni-special`,
        cutout: `bg-white text-penni-main headline border border-2 border-penni-main rounded-lg border-solid`,
        filecard: `bg-penni-background-file-card text-primary opacity-60 rounded-penni-select body-medium `,
      },
      size: {
        default: "h-10 px-4 py-2",
        penni: "w-full h-14", // Penni Default Size
        sm: "w-32 h-10",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        floating: "w-32 h-10",
        pay: "w-14 h-6",
        finish: "w-full h-14",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  label?: string; // Optional label for the button
  children?: React.ReactNode; // If there is no label, use children
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, label, children, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {label ? label : children}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
