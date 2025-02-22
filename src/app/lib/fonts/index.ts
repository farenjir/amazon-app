import { Figtree } from "next/font/google";
import localFont from "next/font/local";


export const figtree = Figtree({
	display: "swap",
	subsets: ["latin"],
	variable: "--font-figtree",
	weight: ["300", "400", "500", "600", "700", "700", "800", "900"],
});

export const yekan = localFont({
	display: "swap",
	variable: "--font-yekan",
	src: [
		{
			path: "../assets/fonts/YekanBakh-Regular.woff2",
			style: "normal",
		},
	],
});
