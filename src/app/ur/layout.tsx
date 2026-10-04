// Thin route file: the page itself lives in src/site and is shared by both languages.
import type { ReactNode } from "react";
import SiteLayout, { generateMetadata as siteMetadata, viewport as siteViewport } from "@/site/layout";

const params = Promise.resolve({ lang: "ur" });

export const viewport = siteViewport;
export const generateMetadata = () => siteMetadata({ params });

export default function Layout({ children }: { children: ReactNode }) {
  return <SiteLayout params={params}>{children}</SiteLayout>;
}
