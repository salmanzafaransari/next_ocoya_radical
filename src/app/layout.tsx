import "./globals.css";
import LayoutWrapper from "@/components/layout-wrapper";

export const metadata = {
  title: "Ocoya Dashboard",
  description: "Social Media Dashboard built with Next.js + Tailwind",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
