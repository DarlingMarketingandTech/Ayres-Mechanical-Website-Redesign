import { ExternalLink, Star } from "lucide-react";

import { reviewPlatforms } from "@/content/testimonials";
import { cn } from "@/lib/utils";

const GOOGLE_PLACEHOLDER_ID = "ChIJDemo_AyresMechanical_Indianapolis";

/** Google "G" monogram rendered as inline SVG — no external dependency. */
function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn("shrink-0", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

/** Facebook "f" monogram rendered as inline SVG. */
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn("shrink-0", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"
        fill="#1877F2"
      />
    </svg>
  );
}

function PlatformIcon({ name, className }: { name: string; className?: string }) {
  if (name === "Google") return <GoogleIcon className={className} />;
  if (name === "Facebook") return <FacebookIcon className={className} />;
  return null;
}

function hasConfirmedWriteReviewUrl(url: string) {
  return Boolean(url) && !url.includes(GOOGLE_PLACEHOLDER_ID);
}

export function ReviewPlatformBadges() {
  const googlePlatform = reviewPlatforms.find((platform) => platform.name === "Google");
  const activePlatforms = reviewPlatforms.filter((platform) => platform.count > 0);
  const googleWriteReviewUrl =
    googlePlatform && hasConfirmedWriteReviewUrl(googlePlatform.writeReviewUrl)
      ? googlePlatform.writeReviewUrl
      : null;

  if (activePlatforms.length === 0) return null;

  return (
    <div className="mb-10 space-y-4">
      <p className="text-sm font-black uppercase tracking-[0.22em] text-muted-foreground">
        Verified on
      </p>
      <div className="flex flex-wrap gap-3">
        {activePlatforms.map((platform) => (
          <a
            key={platform.name}
            href={platform.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 rounded-2xl border border-border/70 bg-white px-5 py-3.5 shadow-sm transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-brand-blue/20 hover:shadow-md hover:shadow-brand-blue/5 motion-reduce:transform-none"
            aria-label={`View Ayres Mechanical reviews on ${platform.name}`}
          >
            <PlatformIcon name={platform.name} className="size-5" />
            <div className="flex flex-col">
              <span className="text-sm font-black text-brand-blue-dark">{platform.name}</span>
              {platform.count > 0 && (
                <span className="flex items-center gap-1 text-xs font-bold text-muted-foreground">
                  <Star className="size-3 fill-brand-red text-brand-red" aria-hidden="true" />
                  {platform.rating.toFixed(1)}
                  <span className="text-muted-foreground/70">· {platform.count} reviews</span>
                </span>
              )}
            </div>
            <ExternalLink
              className="ml-1 size-3.5 text-muted-foreground/50 transition-colors duration-200 group-hover:text-brand-blue"
              aria-hidden="true"
            />
          </a>
        ))}

        {googleWriteReviewUrl ? (
          <a
            href={googleWriteReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2.5 rounded-2xl border border-brand-blue/20 bg-brand-ice px-5 py-3.5 shadow-sm transition-[transform,box-shadow,background-color] duration-300 hover:-translate-y-0.5 hover:bg-brand-blue hover:shadow-md motion-reduce:transform-none"
            aria-label="Leave a review for Ayres Mechanical on Google"
          >
            <GoogleIcon className="size-5" />
            <span className="text-sm font-black text-brand-blue-dark transition-colors duration-300 group-hover:text-white">
              Leave a review
            </span>
            <ExternalLink
              className="size-3.5 text-brand-blue/50 transition-colors duration-200 group-hover:text-white/70"
              aria-hidden="true"
            />
          </a>
        ) : null}
      </div>
    </div>
  );
}
