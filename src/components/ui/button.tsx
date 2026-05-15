import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-bold tracking-wide whitespace-nowrap outline-none select-none transition-[color,background-color,border-color,box-shadow,transform] duration-200 ease-out motion-reduce:transform-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/55 hover:not-disabled:not-aria-[haspopup]:-translate-y-px active:not-disabled:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-45 disabled:shadow-none aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[0_2px_0_0_rgb(7_19_51_/0.22),0_6px_16px_-5px_rgb(13_63_184_/0.38)] hover:bg-brand-blue-dark hover:shadow-[0_3px_0_0_rgb(7_19_51_/0.28),0_10px_22px_-6px_rgb(13_63_184_/0.45)] active:shadow-[inset_0_2px_6px_rgb(0_0_0_/0.14),0_1px_0_0_rgb(7_19_51_/0.18)]",
        emergency:
          "bg-destructive text-white shadow-[0_2px_0_0_rgb(101_8_11_/0.42),0_6px_18px_-5px_rgb(215_25_32_/0.48)] hover:bg-[#b8141a] hover:shadow-[0_3px_0_0_rgb(101_8_11_/0.48),0_10px_24px_-6px_rgb(215_25_32_/0.52)] active:shadow-[inset_0_2px_6px_rgb(0_0_0_/0.18),0_1px_0_0_rgb(101_8_11_/0.35)]",
        outline:
          "border-border bg-background text-brand-blue-dark shadow-[0_1px_0_0_rgb(10_26_68_/0.06),0_4px_12px_-4px_rgb(10_26_68_/0.08)] hover:border-primary hover:bg-secondary hover:shadow-[0_2px_0_0_rgb(13_63_184_/0.12),0_8px_16px_-6px_rgb(13_63_184_/0.12)] active:shadow-[inset_0_1px_4px_rgb(0_0_0_/0.06)]",
        secondary:
          "bg-secondary text-secondary-foreground shadow-[0_1px_0_0_rgb(10_26_68_/0.08),0_4px_10px_-4px_rgb(10_26_68_/0.1)] hover:bg-secondary/85 hover:shadow-[0_2px_0_0_rgb(10_26_68_/0.1),0_6px_14px_-5px_rgb(10_26_68_/0.12)] active:shadow-[inset_0_1px_4px_rgb(0_0_0_/0.05)]",
        ghost:
          "text-brand-blue-dark shadow-none hover:bg-secondary hover:text-primary hover:shadow-[0_1px_0_0_rgb(10_26_68_/0.05)] active:shadow-inner",
        dark:
          "bg-brand-blue-dark text-white shadow-[0_2px_0_0_rgb(0_0_0_/0.35),0_6px_18px_-5px_rgb(10_26_68_/0.45)] hover:bg-[#071333] hover:shadow-[0_3px_0_0_rgb(0_0_0_/0.4),0_10px_24px_-6px_rgb(10_26_68_/0.5)] active:shadow-[inset_0_2px_8px_rgb(0_0_0_/0.25),0_1px_0_0_rgb(0_0_0_/0.25)]",
        link: "h-auto rounded-none border-0 bg-transparent p-0 text-primary shadow-none underline-offset-4 hover:translate-y-0 hover:shadow-none hover:underline active:translate-y-0",
        inverse:
          "bg-white text-brand-blue-dark shadow-[0_2px_0_0_rgb(10_26_68_/0.08),0_6px_14px_-5px_rgb(10_26_68_/0.12)] hover:bg-brand-ice hover:shadow-[0_3px_0_0_rgb(10_26_68_/0.1),0_8px_18px_-6px_rgb(10_26_68_/0.14)] active:shadow-[inset_0_1px_4px_rgb(0_0_0_/0.06)]",
      },
      size: {
        default: "h-10 gap-2 px-4",
        xs: "h-6 gap-1 rounded-md px-2 text-xs",
        sm: "h-8 gap-1.5 px-3 text-xs",
        lg: "h-12 gap-2.5 px-5 text-base",
        icon: "size-11 min-h-11 min-w-11",
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
