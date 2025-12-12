import type { Metadata } from "next";
import "./globals.css";
import MainLayout from "@/components/layout/MainLayout";
import { UIProvider } from "@/context/UIContext";
import ModalContainer from "@/components/providers/ModalContainer";

export const metadata: Metadata = {
  title: "SSALWorks - Everyone Can Be a Builder",
  description: "Platform for non-technical founders to build and grow.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <UIProvider>
          <MainLayout>
            {children}
          </MainLayout>
          <ModalContainer />
        </UIProvider>
      </body>
    </html>
  );
}
