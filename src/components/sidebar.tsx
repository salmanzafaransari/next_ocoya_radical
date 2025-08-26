"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Bot,
  ShoppingCart,
  BarChart,
  Share2,
  Plug,
  Settings,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/", icon: <LayoutDashboard size={18} /> },
  { label: "My Content", href: "/my-content", icon: <FileText size={18} /> },
  { label: "Travis AI", href: "/travis-ai", icon: <Bot size={18} /> },
  { label: "Ecommerce", href: "/ecommerce", icon: <ShoppingCart size={18} /> },
  { label: "Analytics", href: "/analytics", icon: <BarChart size={18} /> },
  { label: "Social Channels", href: "/social-channels", icon: <Share2 size={18} /> },
];

const specialItems = [{ label: "API", href: "/api", icon: <Plug size={18} /> }];

const settingsItems = [
  { label: "Subscription", href: "/subscription", icon: <FileText size={18} /> },
  { label: "Account Settings", href: "/settings", icon: <Settings size={18} /> },
];


const brandName = process.env.NEXT_PUBLIC_BRAND_NAME || "Default Brand";
const brandLogo = process.env.NEXT_PUBLIC_BRAND_LOGO || "/next.svg";


export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-screen w-64 bg-white border-r border-border flex flex-col justify-between">
      {/* Top Section */}
      <div>
        <div className="flex flex-col items-center justify-center px-4 py-4 space-y-3">
          <span className="font-bold text-lg text-primary">{brandName}</span>
          <button className="flex items-center gap-2 px-8 py-2.5 rounded-lg bg-success text-white text-sm font-medium hover:opacity-90 shadow-sm">
            <span className="text-lg leading-none">+</span>
            Create
          </button>
        </div>

        {/* Navigation */}
        <nav className="px-4 space-y-6">
          <div>
            <h4 className="text-xs font-semibold text-secondary mb-2">PRIMARY</h4>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? "text-success bg-success/10"
                    : "text-secondary hover:text-primary hover:bg-gray-100"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>

          <div>
            <h4 className="text-xs font-semibold text-secondary mb-2">SPECIAL</h4>
            {specialItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? "text-success bg-success/10"
                    : "text-secondary hover:text-primary hover:bg-gray-100"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>

          <div>
            <h4 className="text-xs font-semibold text-secondary mb-2">SETTINGS</h4>
            {settingsItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? "text-success bg-success/10"
                    : "text-secondary hover:text-primary hover:bg-gray-100"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>

      {/* Bottom Empty Space */}
      <div className="p-4 text-xs text-gray-400 text-center">
        {/* you can put footer/help text here if needed */}
      </div>
    </aside>
  );
}
