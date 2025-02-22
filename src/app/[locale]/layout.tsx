import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { ResolvingMetadata, Viewport } from "next";

import { routing } from "@/i18n/routing";
import { figtree, yekan } from "@/app/lib/fonts";
import { customMetadataGenerator } from "@/app/lib/meta";
import type { Locales ,GlobalProps} from "@/constants/global.types";

export const viewport: Viewport = {
  themeColor: "white",
};

export async function generateMetadata(params: GlobalProps, parent: ResolvingMetadata) {
	return await customMetadataGenerator(params, parent);
}


export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: Locales };
}) {
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${figtree.variable} ${yekan.variable}`}>
      <body>
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
