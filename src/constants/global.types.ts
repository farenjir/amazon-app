export type Locales = "en" | "fa";

export type GlobalProps = {
  params: { locale: Locales };
  locale: Locales;
  children: React.ReactNode;
  searchParams: { [key: string]: string | string[] | undefined };
};
