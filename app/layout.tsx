import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import AuthContext from "@/app/context/AuthContext";
import ActiveStatus from "@/components/ActiveStatus";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Chatter",
  description: "Chatter",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-[100vh] overflow-hidden`}>
        <AuthContext>
          <SkeletonTheme>
            <Toaster />
            <ActiveStatus />
            <TooltipProvider>{children}</TooltipProvider>
          </SkeletonTheme>
        </AuthContext>
      </body>
    </html>
  );
}
