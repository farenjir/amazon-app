import { MetadataRoute } from "next";

import { BASE_URL } from "@/constants/global.configs";
import { getPathname, routing } from "@/i18n/routing";

import type { Locales } from "@/constants/global.types";

export default function sitemap(): MetadataRoute.Sitemap {
  return [...getEntries("/"), ...getEntries("/pathnames")];
}

type Href = Parameters<typeof getPathname>[0]["href"];

function getEntries(href: Href) {
  return routing.locales.map((locale) => ({
    url: getUrl(href, locale),
    alternates: {
      languages: Object.fromEntries(routing.locales.map((cur) => [cur, getUrl(href, cur)])),
    },
  }));
}

function getUrl(href: Href, locale: Locales) {
  const pathname = getPathname({ locale, href });
  return BASE_URL + pathname;
}
