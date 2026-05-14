import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-bold tracking-wide whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-sm hover:bg-brand-blue-dark",
        emergency: "bg-destructive text-white shadow-sm hover:bg-[#b8141a]",
        outline: "border-border bg-background text-brand-blue-dark hover:border-primary hover:bg-secondary",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "text-brand-blue-dark hover:bg-secondary hover:text-primary",
        dark: "bg-brand-blue-dark text-white hover:bg-[#071333]",
        link: "h-auto rounded-none border-0 bg-transparent p-0 text-primary underline-offset-4 hover:underline",
        inverse: "bg-white text-brand-blue-dark hover:bg-brand-ice",
      },
      size: {
        default: "h-10 gap-2 px-4",
        xs: "h-6 gap-1 rounded-md px-2 text-xs",
        sm: "h-8 gap-1.5 px-3 text-xs",
        lg: "h-12 gap-2.5 px-5 text-base",
        icon: "size-10",
        "icon-sm": "size-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return <ButtonPrimitive data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
