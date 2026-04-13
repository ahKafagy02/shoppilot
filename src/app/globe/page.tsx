"use client";

import { CustomerGlobe } from "@/components/globe/customer-globe";
import { topCountries } from "@/data/mock-data";
import { MapPin, Globe, Users, DollarSign } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { BlurFade } from "@/components/ui/blur-fade";
import { NumberTicker } from "@/components/ui/number-ticker";

export default function GlobePage() {
  const totalRevenue = topCountries.reduce((s, c) => s + c.revenue, 0);
  const totalOrders = topCountries.reduce((s, c) => s + c.orders, 0);
  const totalCustomers = topCountries.reduce((s, c) => s + c.customers, 0);
  const topCountry = topCountries[0];

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-[1600px]">
      <PageHeader
        title="Customer World Map"
        description="Visualize your global customer base. Click and drag to rotate the globe."
      />

      {/* Global stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Countries", value: topCountries.length, icon: Globe, prefix: "" },
          { label: "Global Revenue", value: Math.round(totalRevenue / 1000), icon: DollarSign, prefix: "$", suffix: "K" },
          { label: "Global Orders", value: totalOrders, icon: MapPin, prefix: "" },
          { label: "Global Customers", value: totalCustomers, icon: Users, prefix: "" },
        ].map((stat, i) => (
          <BlurFade key={stat.label} delay={0.05 + i * 0.05}>
            <div className="sp-surface sp-card-hover rounded-2xl p-5 flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: "var(--sp-accent-subtle)" }}>
                <stat.icon className="w-5 h-5" style={{ color: "var(--sp-accent)" }} />
              </div>
              <div>
                <p className="text-[11px] font-medium uppercase tracking-wider" style={{ color: "var(--sp-text-muted)" }}>{stat.label}</p>
                <p className="text-xl font-bold font-[family-name:var(--font-heading)]" style={{ color: "var(--sp-text)" }}>
                  {stat.prefix}<NumberTicker value={stat.value} delay={0.1 + i * 0.05} />{stat.suffix || ""}
                </p>
              </div>
            </div>
          </BlurFade>
        ))}
      </div>

      {/* Globe + top country highlight */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <BlurFade delay={0.25} className="xl:col-span-3">
          <CustomerGlobe />
        </BlurFade>
        <BlurFade delay={0.3} className="xl:col-span-1">
          <div className="sp-surface rounded-2xl p-5 h-full flex flex-col">
            <div className="flex items-center gap-2 mb-5">
              <MapPin className="w-4 h-4" style={{ color: "var(--sp-accent)" }} />
              <h3 className="text-sm font-semibold font-[family-name:var(--font-heading)]" style={{ color: "var(--sp-text)" }}>
                Top Market
              </h3>
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <p className="text-[11px] font-medium uppercase tracking-wider mb-1" style={{ color: "var(--sp-text-muted)" }}>
                {topCountry.country}
              </p>
              <p className="text-3xl font-bold font-[family-name:var(--font-heading)] mb-4" style={{ color: "var(--sp-text)" }}>
                $<NumberTicker value={topCountry.revenue} delay={0.3} />
              </p>
              <div className="space-y-3">
                {[
                  { label: "Orders", val: topCountry.orders },
                  { label: "Customers", val: topCountry.customers },
                  { label: "AOV", val: Math.round(topCountry.revenue / topCountry.orders), prefix: "$" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-[11px]" style={{ color: "var(--sp-text-muted)" }}>{item.label}</span>
                    <span className="text-[13px] font-semibold" style={{ color: "var(--sp-text)" }}>
                      {item.prefix || ""}{item.val.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            {/* Revenue share bars for top 5 */}
            <div className="mt-6 space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: "var(--sp-text-muted)" }}>Revenue share</p>
              {topCountries.slice(0, 5).map((c) => (
                <div key={c.countryCode} className="flex items-center gap-2">
                  <span className="text-[11px] w-16 truncate" style={{ color: "var(--sp-text-secondary)" }}>{c.country}</span>
                  <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--sp-border)" }}>
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${(c.revenue / totalRevenue) * 100}%`, background: "var(--sp-accent)" }}
                    />
                  </div>
                  <span className="text-[10px] font-semibold w-8 text-right" style={{ color: "var(--sp-text-muted)" }}>
                    {((c.revenue / totalRevenue) * 100).toFixed(0)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </BlurFade>
      </div>

      {/* Full country table */}
      <BlurFade delay={0.35}>
        <div className="sp-surface rounded-2xl overflow-hidden">
          <div className="px-5 py-4 flex items-center gap-2" style={{ borderBottom: "1px solid var(--sp-border)" }}>
            <MapPin className="w-4 h-4" style={{ color: "var(--sp-accent)" }} />
            <h3
              className="text-sm font-semibold font-[family-name:var(--font-heading)]"
              style={{ color: "var(--sp-text)" }}
            >
              Revenue by Country
            </h3>
            <span className="ml-auto text-[11px] font-bold px-2.5 py-1 rounded-lg" style={{ color: "var(--sp-accent)", background: "var(--sp-accent-subtle)" }}>
              {topCountries.length} markets
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--sp-border)" }}>
                  {["#", "Country", "Revenue", "Share", "Orders", "Customers", "AOV"].map((h, i) => (
                    <th
                      key={h}
                      className={`px-5 py-4 text-[11px] font-semibold uppercase tracking-wider ${i >= 2 ? "text-right" : "text-left"}`}
                      style={{ color: "var(--sp-text-muted)" }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {topCountries.map((country, i) => (
                  <tr
                    key={country.countryCode}
                    className="sp-card-hover transition-colors duration-200"
                    style={{ borderBottom: "1px solid var(--sp-border)" }}
                  >
                    <td className="px-5 py-4">
                      <span
                        className="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold"
                        style={{ background: i < 3 ? "var(--sp-accent-subtle)" : "var(--sp-bg-subtle)", color: i < 3 ? "var(--sp-accent)" : "var(--sp-text-muted)" }}
                      >
                        {i + 1}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-[13px] font-semibold" style={{ color: "var(--sp-text)" }}>
                      {country.country}
                    </td>
                    <td className="px-5 py-4 text-[13px] text-right font-bold font-[family-name:var(--font-heading)]" style={{ color: "var(--sp-text)" }}>
                      ${country.revenue.toLocaleString()}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <div className="w-16 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--sp-border)" }}>
                          <div className="h-full rounded-full" style={{ width: `${(country.revenue / totalRevenue) * 100}%`, background: "var(--sp-accent)" }} />
                        </div>
                        <span className="text-[11px] font-semibold" style={{ color: "var(--sp-text-muted)" }}>
                          {((country.revenue / totalRevenue) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-[13px] text-right" style={{ color: "var(--sp-text-secondary)" }}>{country.orders}</td>
                    <td className="px-5 py-4 text-[13px] text-right" style={{ color: "var(--sp-text-secondary)" }}>{country.customers}</td>
                    <td className="px-5 py-4 text-[13px] text-right font-medium" style={{ color: "var(--sp-text-muted)" }}>
                      ${(country.revenue / country.orders).toFixed(0)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </BlurFade>
    </div>
  );
}
