import type { Metadata } from "next";
import { Marcellus } from 'next/font/google'
import AuthProvider from "./hooks/AuthProvider";
import { LoginWarningContextWrapper } from "./hooks/Contexts";
import cn from "classnames";
import "./globals.css";
  const marcellus = Marcellus({ weight: '400', subsets: ['latin']});


export const metadata: Metadata = {
  title: "PaliWear",
  description: "By Palestinians, for Palestinians",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={marcellus.className}>
      <body className={cn("h-full w-full bg-default")}>
        <AuthProvider>
          <LoginWarningContextWrapper>
          {children}
          </LoginWarningContextWrapper>
          </AuthProvider>
        </body>
    </html>
  );
}
