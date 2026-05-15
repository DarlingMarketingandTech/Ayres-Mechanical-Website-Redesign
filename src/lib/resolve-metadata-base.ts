import { headers } from "next/headers";

import { siteConfig } from "@/content/site";

function stripTrailingSlash(url: string) {
  return url.replace(/\/+$/, "");
}

/**
 * `metadataBase` and canonical URLs must match the host you open in the browser.
 * In dev, `siteConfig.url` defaults to `http://localhost:3000`, which breaks `next dev -p 3010`, LAN IPs, etc.
 */
export async function resolveMetadataBaseUrl(): Promise<string> {
  if (process.env.NODE_ENV === "development") {
    try {
      const h = await headers();
      const host = h.get("x-forwarded-host") ?? h.get("host");
      if (host) {
        const forwardedProto = h.get("x-forwarded-proto");
        const isLocalHost =
          host.startsWith("localhost") || host.startsWith("127.") || /^192\.168\./.test(host) || /^10\./.test(host);
        const proto = forwardedProto ?? (isLocalHost ? "http" : "https");
        return stripTrailingSlash(`${proto}://${host}`);
      }
    } catch {
      /* prerender / static analysis without request */
    }
  }
  return siteConfig.url;
}
