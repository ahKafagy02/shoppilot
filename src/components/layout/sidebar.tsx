"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/theme-provider";
import {
  LayoutDashboard,
  Globe,
  ShoppingBag,
  Users,
  MessageSquare,
  Bell,
  TrendingUp,
  FileText,
  Settings,
  Zap,
  Moon,
  Sun,
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
  const { theme, toggleTheme } = useTheme();

  return (
    <aside
      className="fixed left-0 top-0 z-40 h-screen w-64 flex flex-col sp-glass animate-slide-in-left"
      style={{
        borderRight: "1px solid var(--sp-border)",
        background: theme === "dark"
          ? "rgba(10, 12, 20, 0.85)"
          : "rgba(255, 255, 255, 0.85)",
      }}
    >
      {/* Logo */}
      <div
        className="flex items-center gap-2.5 px-6 py-5"
        style={{ borderBottom: "1px solid var(--sp-border)" }}
      >
        <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-400 shadow-lg shadow-emerald-500/20">
          <Zap className="w-4.5 h-4.5 text-white" />
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-300 opacity-0 hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="flex flex-col">
          <span
            className="text-[15px] font-bold tracking-tight font-[family-name:var(--font-heading)]"
            style={{ color: "var(--sp-text)" }}
          >
            ShopPilot
          </span>
          <span className="text-[9px] font-semibold tracking-widest uppercase" style={{ color: "var(--sp-accent)" }}>
            AI Dashboard
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map((item, i) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200",
                isActive
                  ? ""
                  : "hover:translate-x-0.5"
              )}
              style={{
                color: isActive ? "var(--sp-accent)" : "var(--sp-text-secondary)",
                background: isActive ? "var(--sp-accent-subtle)" : "transparent",
              }}
            >
              {/* Active indicator */}
              {isActive && (
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full transition-all duration-300"
                  style={{ background: "var(--sp-accent)" }}
                />
              )}
              <item.icon
                className={cn(
                  "w-[18px] h-[18px] transition-colors duration-200",
                  !isActive && "group-hover:text-[var(--sp-text)]"
                )}
              />
              <span
                className={cn(
                  "transition-colors duration-200",
                  !isActive && "group-hover:text-[var(--sp-text)]"
                )}
              >
                {item.label}
              </span>
              {item.label === "AI Alerts" && (
                <span
                  className="ml-auto flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold text-white animate-glow-pulse"
                  style={{ background: "var(--sp-accent)" }}
                >
                  6
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="px-3 pb-3 space-y-2">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 group"
          style={{ color: "var(--sp-text-secondary)" }}
        >
          <div
            className="relative w-[18px] h-[18px] overflow-hidden"
          >
            <Sun
              className={cn(
                "w-[18px] h-[18px] absolute inset-0 transition-all duration-300",
                theme === "light"
                  ? "opacity-100 rotate-0"
                  : "opacity-0 rotate-90"
              )}
            />
            <Moon
              className={cn(
                "w-[18px] h-[18px] absolute inset-0 transition-all duration-300",
                theme === "dark"
                  ? "opacity-100 rotate-0"
                  : "opacity-0 -rotate-90"
              )}
            />
          </div>
          <span className="group-hover:text-[var(--sp-text)] transition-colors duration-200">
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </span>
        </button>

        {/* Store info */}
        <div
          className="flex items-center gap-3 px-3 py-3 rounded-xl"
          style={{
            background: "var(--sp-accent-subtle)",
            border: "1px solid var(--sp-border)",
          }}
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-xs font-bold text-white shadow-lg shadow-violet-500/20">
            SP
          </div>
          <div className="flex-1 min-w-0">
            <p
              className="text-sm font-semibold truncate font-[family-name:var(--font-heading)]"
              style={{ color: "var(--sp-text)" }}
            >
              My Store
            </p>
            <p className="text-[11px] truncate" style={{ color: "var(--sp-text-muted)" }}>
              mystore.myshopify.com
            </p>
          </div>
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-glow-pulse" />
        </div>
      </div>
    </aside>
  );
}
