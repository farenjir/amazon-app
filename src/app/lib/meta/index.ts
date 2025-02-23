import type { Metadata, ResolvingMetadata } from "next";
import { getTranslations } from "next-intl/server";

import type { GlobalProps } from "@/constants/global.types";

export async function customMetadataGenerator(
  { locale, params, searchParams }: GlobalProps,
  parent: ResolvingMetadata,
  namespace: string
): Promise<Metadata> {
  // getDictionary
  const t = await getTranslations({ locale, namespace });
  // return
  return {
    applicationName: "appName",
    title: {
      default: "defaultTitle",
      template: "titleTemplate",
    },
    description: "appDescription",
    // manifest: `/assets/${locale}_manifest.json`,
    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      title: "defaultTitle",
      // startUpImage: [],
    },
    formatDetection: {
      telephone: false,
    },
    // openGraph: {
    // 	type: "website",
    // 	siteName: NAME,
    // 	title: {
    // 		default: DEFAULT_TITLE,
    // 		template: TITLE_TEMPLATE,
    // 	},
    // 	description: DESCRIPTION,
    // },
    // twitter: {
    // 	card: "summary",
    // 	title: {
    // 		default: DEFAULT_TITLE,
    // 		template: TITLE_TEMPLATE,
    // 	},
    // 	description: DESCRIPTION,
    // },
  };
}
