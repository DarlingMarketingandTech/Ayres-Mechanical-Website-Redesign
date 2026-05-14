import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-20">
      <div className="max-w-xl text-center">
        <p className="text-sm font-black uppercase tracking-[0.24em] text-brand-red">404</p>
        <h1 className="mt-4 text-5xl font-black">Page not found</h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">The page you requested is not available. Return home or request HVAC service.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href={routes.home} className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>Go Home</Link>
          <Link href={routes.requestService} className={cn(buttonVariants({ variant: "emergency", size: "lg" }))}>Request Service</Link>
        </div>
      </div>
    </main>
  );
}
