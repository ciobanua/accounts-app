import { Locale, routing } from "@/i18n/routing";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { Link } from "@/i18n/routing";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { FaHome } from "react-icons/fa";
import { Toaster } from "@/components/ui/sonner";
import LocaleSwitcher from "@/components/custom/LocaleSwitcher";

import "./globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: Locale };
}>) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }
  const messages = await getMessages();
  return (
    <>
      <NextIntlClientProvider messages={messages}>
        <div className="mx-3 w-full md:w-2md xl:w-4xl md:mx-auto">
          <div className="flex justify-between mt-5 mx-8 items-center">
            <Link href="/">
              <FaHome />
            </Link>
            <LocaleSwitcher />
          </div>
          {children}
        </div>
      </NextIntlClientProvider>
      <Toaster />
    </>
  );
}
