import { MetadataRoute } from "next";
import { getTranslations } from "next-intl/server";

import { DEFAULT_LOCALE } from "@/i18n/routing";
export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const locale = DEFAULT_LOCALE;
  const t = await getTranslations({ locale, namespace: "Manifest" });

  return {
    name: t("name"),
    short_name: "Next.js App",
    start_url: "/",
    description: "Next.js App",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#101E33",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
