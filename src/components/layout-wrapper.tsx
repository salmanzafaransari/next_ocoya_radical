"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";


export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Any routes under /auth should skip the dashboard layout
  const isAuthPage = pathname?.startsWith("/auth");

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />
      {/* Main content area */}
      <div className="flex-1 flex flex-col bg-main-content ">
        <Header />
        <main className="flex-1 overflow-y-auto px-6">{children}</main>
      </div>
    </div>
  );
}
