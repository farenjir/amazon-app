import { redirect } from "next/navigation";

import {DEFAULT_LOCALE}from "@/i18n/routing"

// This page only renders when the app is built statically (output: 'export')
export default function RootPage() {
  redirect(`/${DEFAULT_LOCALE}`);
}
