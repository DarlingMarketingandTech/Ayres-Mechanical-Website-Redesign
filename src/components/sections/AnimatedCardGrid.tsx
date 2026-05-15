"use client";

import { motion, useReducedMotion } from "motion/react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type AnimatedCardGridProps = {
  items: { title: string; description: string }[];
  className?: string;
  cardClassName?: string;
};

export function AnimatedCardGrid({ items, className, cardClassName }: AnimatedCardGridProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? undefined : "hidden"}
      whileInView={reduceMotion ? undefined : "show"}
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.09,
          },
        },
      }}
      className={cn("grid gap-5 md:grid-cols-2", className)}
    >
      {items.map((item) => (
        <motion.div
          key={item.title}
          variants={{
            hidden: { opacity: 0, y: 18 },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.35, ease: "easeOut" },
            },
          }}
        >
          <Card className={cn("h-full rounded-3xl border border-border/70 bg-white py-0 shadow-sm", cardClassName)}>
            <CardHeader className="px-6 pt-6">
              <CardTitle className="text-xl font-black text-brand-blue-dark">{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-6 pt-0">
              <p className="leading-8 text-muted-foreground">{item.description}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
