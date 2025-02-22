import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("title"),
  };
}

export default async function HomePage({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return (
    <div>
      <h1>{t("title")}</h1>
      <Link href="/about">{t("about")}</Link>
    </div>
  );
}
