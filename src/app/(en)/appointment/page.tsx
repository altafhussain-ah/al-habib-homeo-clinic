// Thin route file: the page itself lives in src/site and is shared by both languages.
import Page, { generateMetadata as siteMetadata } from "@/site/appointment/page";

const params = Promise.resolve({ lang: "en" });

export const generateMetadata = () => siteMetadata({ params });

export default function Route() {
  return <Page params={params} />;
}
