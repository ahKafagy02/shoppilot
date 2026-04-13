"use client";

import { CustomerGlobe } from "@/components/globe/customer-globe";
import { topCountries } from "@/data/mock-data";
import { MapPin } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";

export default function GlobePage() {
  return (
    <div className="p-6 lg:p-8 space-y-6">
      <PageHeader
        title="Customer World Map"
        description="Visualize your global customer base. Click and drag to rotate the globe."
      />

      <div className="animate-fade-in-up stagger-1">
        <CustomerGlobe />
      </div>

      <div className="sp-surface rounded-2xl p-5 animate-fade-in-up stagger-2">
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="w-4 h-4" style={{ color: "var(--sp-accent)" }} />
          <h3
            className="text-sm font-semibold font-[family-name:var(--font-heading)]"
            style={{ color: "var(--sp-text)" }}
          >
            Revenue by Country
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--sp-border)" }}>
                {["#", "Country", "Revenue", "Orders", "Customers", "AOV"].map((h, i) => (
                  <th
                    key={h}
                    className={`pb-3 text-[11px] font-semibold uppercase tracking-wider ${i >= 2 ? "text-right" : "text-left"}`}
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
                  className="sp-card-hover animate-fade-in-up"
                  style={{
                    borderBottom: "1px solid var(--sp-border)",
                    animationDelay: `${i * 0.04}s`,
                  }}
                >
                  <td className="py-3 text-[13px]" style={{ color: "var(--sp-text-muted)" }}>{i + 1}</td>
                  <td className="py-3 text-[13px] font-medium" style={{ color: "var(--sp-text)" }}>{country.country}</td>
                  <td className="py-3 text-[13px] text-right font-bold font-[family-name:var(--font-heading)]" style={{ color: "var(--sp-text)" }}>
                    ${country.revenue.toLocaleString()}
                  </td>
                  <td className="py-3 text-[13px] text-right" style={{ color: "var(--sp-text-secondary)" }}>{country.orders}</td>
                  <td className="py-3 text-[13px] text-right" style={{ color: "var(--sp-text-secondary)" }}>{country.customers}</td>
                  <td className="py-3 text-[13px] text-right" style={{ color: "var(--sp-text-muted)" }}>
                    ${(country.revenue / country.orders).toFixed(0)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
