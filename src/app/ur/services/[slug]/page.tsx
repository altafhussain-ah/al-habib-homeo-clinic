// Thin route file: the page itself lives in src/site and is shared by both languages.
import Page, { generateMetadata as siteMetadata, generateStaticParams as siteParams } from "@/site/services/[slug]/page";

type Props = { params: Promise<{ slug: string }> };

const withLang = (params: Props["params"]) => params.then(({ slug }) => ({ lang: "ur", slug }));

export const dynamicParams = false;
export const generateStaticParams = siteParams;
export const generateMetadata = ({ params }: Props) => siteMetadata({ params: withLang(params) });

export default function Route({ params }: Props) {
  return <Page params={withLang(params)} />;
}
