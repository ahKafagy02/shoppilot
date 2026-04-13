"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Globe,
  ShoppingBag,
  Users,
  MessageSquare,
  Bell,
  TrendingUp,
  Filter,
  FileText,
  Settings,
  Zap,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Globe Map", href: "/globe", icon: Globe },
  { label: "Products", href: "/products", icon: ShoppingBag },
  { label: "Customers", href: "/customers", icon: Users },
  { label: "Analytics", href: "/analytics", icon: TrendingUp },
  { label: "AI Alerts", href: "/alerts", icon: Bell },
  { label: "AI Chat", href: "/chat", icon: MessageSquare },
  { label: "Descriptions AI", href: "/descriptions", icon: FileText },
  { label: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-zinc-800 bg-zinc-950 flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-2 px-6 py-5 border-b border-zinc-800">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500">
          <Zap className="w-4 h-4 text-white" />
        </div>
        <span className="text-lg font-bold text-white tracking-tight">
          ShopPilot
        </span>
        <span className="text-[10px] font-medium text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded-full ml-auto">
          AI
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                isActive
                  ? "bg-emerald-500/10 text-emerald-400"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-4 py-4 border-t border-zinc-800">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-xs font-bold text-white">
            SP
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-zinc-200 truncate">
              My Store
            </p>
            <p className="text-xs text-zinc-500 truncate">
              mystore.myshopify.com
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
