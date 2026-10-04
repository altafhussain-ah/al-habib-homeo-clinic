// Thin route file: the page itself lives in src/site and is shared by both languages.
import Page from "@/site/page";

const params = Promise.resolve({ lang: "en" });

export default function Route() {
  return <Page params={params} />;
}
