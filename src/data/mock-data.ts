// ===========================================
// ShopPilot - Realistic Mock Data
// ===========================================

export type Order = {
  id: string;
  orderNumber: string;
  customer: string;
  email: string;
  total: number;
  currency: string;
  status: "fulfilled" | "pending" | "refunded" | "partially_fulfilled";
  country: string;
  countryCode: string;
  city: string;
  createdAt: string;
  items: number;
};

export type Product = {
  id: string;
  title: string;
  image: string;
  price: number;
  compareAtPrice?: number;
  inventory: number;
  sold: number;
  revenue: number;
  category: string;
  status: "active" | "draft" | "archived";
  description: string;
  trend: number; // percentage change
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  totalSpent: number;
  orders: number;
  lastOrder: string;
  country: string;
  countryCode: string;
  city: string;
  lat: number;
  lng: number;
  segment: "new" | "returning" | "vip" | "lost";
  createdAt: string;
};

export type DailyStat = {
  date: string;
  revenue: number;
  orders: number;
  visitors: number;
  conversionRate: number;
};

export type Alert = {
  id: string;
  type: "warning" | "success" | "info" | "critical";
  title: string;
  message: string;
  createdAt: string;
};

// --- STORE HEALTH ---
export const storeHealth = {
  revenue: 47832.5,
  revenuePrev: 41200.0,
  orders: 312,
  ordersPrev: 278,
  avgOrderValue: 153.31,
  avgOrderValuePrev: 148.2,
  conversionRate: 3.2,
  conversionRatePrev: 2.9,
  visitors: 9750,
  visitorsPrev: 9586,
  returningCustomerRate: 34.5,
};

// --- DAILY STATS (last 90 days) ---
function generateDailyStats(): DailyStat[] {
  const stats: DailyStat[] = [];
  const now = new Date();
  for (let i = 89; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const baseRevenue = isWeekend ? 650 : 480;
    const variance = (Math.random() - 0.3) * 300;
    const revenue = Math.max(100, baseRevenue + variance);
    const orders = Math.floor(revenue / (140 + Math.random() * 40));
    const visitors = Math.floor(orders / (0.025 + Math.random() * 0.02));
    stats.push({
      date: date.toISOString().split("T")[0],
      revenue: Math.round(revenue * 100) / 100,
      orders,
      visitors,
      conversionRate:
        Math.round((orders / visitors) * 100 * 100) / 100,
    });
  }
  return stats;
}
export const dailyStats = generateDailyStats();

// --- PRODUCTS ---
export const products: Product[] = [
  {
    id: "prod_001",
    title: "Wireless Noise-Cancelling Headphones",
    image: "/products/headphones.jpg",
    price: 189.99,
    compareAtPrice: 249.99,
    inventory: 145,
    sold: 834,
    revenue: 158453.66,
    category: "Electronics",
    status: "active",
    description: "Premium wireless headphones with active noise cancellation and 30-hour battery life.",
    trend: 12.5,
  },
  {
    id: "prod_002",
    title: "Organic Cotton T-Shirt - Black",
    image: "/products/tshirt.jpg",
    price: 34.99,
    inventory: 523,
    sold: 2145,
    revenue: 75054.55,
    category: "Apparel",
    status: "active",
    description: "100% organic cotton t-shirt. Comfortable, breathable, and eco-friendly.",
    trend: 8.3,
  },
  {
    id: "prod_003",
    title: "Smart Water Bottle 750ml",
    image: "/products/bottle.jpg",
    price: 44.99,
    compareAtPrice: 59.99,
    inventory: 89,
    sold: 1567,
    revenue: 70510.33,
    category: "Accessories",
    status: "active",
    description: "Temperature-tracking smart water bottle with hydration reminders.",
    trend: 23.1,
  },
  {
    id: "prod_004",
    title: "Minimalist Leather Wallet",
    image: "/products/wallet.jpg",
    price: 59.99,
    inventory: 234,
    sold: 1023,
    revenue: 61375.77,
    category: "Accessories",
    status: "active",
    description: "Slim RFID-blocking leather wallet with 6 card slots.",
    trend: -2.4,
  },
  {
    id: "prod_005",
    title: "Yoga Mat Premium 6mm",
    image: "/products/yogamat.jpg",
    price: 79.99,
    compareAtPrice: 99.99,
    inventory: 67,
    sold: 678,
    revenue: 54233.22,
    category: "Fitness",
    status: "active",
    description: "Non-slip premium yoga mat with alignment markings.",
    trend: 5.7,
  },
  {
    id: "prod_006",
    title: "Ceramic Pour-Over Coffee Set",
    image: "/products/coffee.jpg",
    price: 49.99,
    inventory: 312,
    sold: 445,
    revenue: 22245.55,
    category: "Home",
    status: "active",
    description: "Handcrafted ceramic pour-over dripper with matching mug.",
    trend: -8.2,
  },
  {
    id: "prod_007",
    title: "Bamboo Desk Organizer",
    image: "/products/organizer.jpg",
    price: 29.99,
    inventory: 12,
    sold: 234,
    revenue: 7017.66,
    category: "Home",
    status: "active",
    description: "Eco-friendly bamboo desk organizer with phone stand.",
    trend: -15.3,
  },
  {
    id: "prod_008",
    title: "UV Protection Sunglasses",
    image: "/products/sunglasses.jpg",
    price: 89.99,
    inventory: 0,
    sold: 156,
    revenue: 14038.44,
    category: "Accessories",
    status: "active",
    description: "Polarized UV400 sunglasses with titanium frame.",
    trend: -22.1,
  },
  {
    id: "prod_009",
    title: "Portable Bluetooth Speaker",
    image: "/products/speaker.jpg",
    price: 69.99,
    inventory: 456,
    sold: 89,
    revenue: 6229.11,
    category: "Electronics",
    status: "draft",
    description: "Waterproof portable speaker with 12-hour battery.",
    trend: 0,
  },
  {
    id: "prod_010",
    title: "Stainless Steel Insulated Mug",
    image: "/products/mug.jpg",
    price: 24.99,
    inventory: 678,
    sold: 45,
    revenue: 1124.55,
    category: "Home",
    status: "active",
    description: "Double-wall vacuum insulated travel mug.",
    trend: -31.5,
  },
];

// --- CUSTOMERS with geolocation ---
export const customers: Customer[] = [
  { id: "cust_001", name: "Emma Laurent", email: "emma.l@gmail.com", totalSpent: 2340.50, orders: 12, lastOrder: "2026-04-12", country: "France", countryCode: "FR", city: "Paris", lat: 48.8566, lng: 2.3522, segment: "vip", createdAt: "2024-11-15" },
  { id: "cust_002", name: "James Smith", email: "james.s@outlook.com", totalSpent: 890.00, orders: 5, lastOrder: "2026-04-10", country: "United States", countryCode: "US", city: "New York", lat: 40.7128, lng: -74.006, segment: "returning", createdAt: "2025-06-20" },
  { id: "cust_003", name: "Yuki Tanaka", email: "yuki.t@yahoo.jp", totalSpent: 1567.80, orders: 8, lastOrder: "2026-04-08", country: "Japan", countryCode: "JP", city: "Tokyo", lat: 35.6762, lng: 139.6503, segment: "vip", createdAt: "2025-02-10" },
  { id: "cust_004", name: "Ahmed Hassan", email: "ahmed.h@gmail.com", totalSpent: 445.00, orders: 3, lastOrder: "2026-03-28", country: "Morocco", countryCode: "MA", city: "Casablanca", lat: 33.5731, lng: -7.5898, segment: "returning", createdAt: "2025-09-05" },
  { id: "cust_005", name: "Sophie Mueller", email: "s.mueller@web.de", totalSpent: 3200.75, orders: 18, lastOrder: "2026-04-13", country: "Germany", countryCode: "DE", city: "Berlin", lat: 52.52, lng: 13.405, segment: "vip", createdAt: "2024-08-22" },
  { id: "cust_006", name: "Carlos Mendez", email: "carlos.m@hotmail.com", totalSpent: 234.50, orders: 2, lastOrder: "2026-04-01", country: "Mexico", countryCode: "MX", city: "Mexico City", lat: 19.4326, lng: -99.1332, segment: "new", createdAt: "2026-03-15" },
  { id: "cust_007", name: "Fatima Al-Rashid", email: "fatima.ar@gmail.com", totalSpent: 1890.25, orders: 9, lastOrder: "2026-04-11", country: "UAE", countryCode: "AE", city: "Dubai", lat: 25.2048, lng: 55.2708, segment: "vip", createdAt: "2025-01-18" },
  { id: "cust_008", name: "Liam O'Brien", email: "liam.ob@gmail.com", totalSpent: 567.00, orders: 4, lastOrder: "2026-03-20", country: "Ireland", countryCode: "IE", city: "Dublin", lat: 53.3498, lng: -6.2603, segment: "returning", createdAt: "2025-07-30" },
  { id: "cust_009", name: "Priya Sharma", email: "priya.s@gmail.com", totalSpent: 123.50, orders: 1, lastOrder: "2026-04-05", country: "India", countryCode: "IN", city: "Mumbai", lat: 19.076, lng: 72.8777, segment: "new", createdAt: "2026-04-05" },
  { id: "cust_010", name: "Lucas Silva", email: "lucas.s@gmail.com", totalSpent: 78.99, orders: 1, lastOrder: "2025-12-10", country: "Brazil", countryCode: "BR", city: "Sao Paulo", lat: -23.5505, lng: -46.6333, segment: "lost", createdAt: "2025-12-10" },
  { id: "cust_011", name: "Olivia Johnson", email: "olivia.j@gmail.com", totalSpent: 1245.00, orders: 7, lastOrder: "2026-04-09", country: "United States", countryCode: "US", city: "Los Angeles", lat: 34.0522, lng: -118.2437, segment: "vip", createdAt: "2025-03-12" },
  { id: "cust_012", name: "Chen Wei", email: "chen.w@qq.com", totalSpent: 456.00, orders: 3, lastOrder: "2026-03-30", country: "China", countryCode: "CN", city: "Shanghai", lat: 31.2304, lng: 121.4737, segment: "returning", createdAt: "2025-11-08" },
  { id: "cust_013", name: "Anna Kowalski", email: "anna.k@wp.pl", totalSpent: 189.99, orders: 1, lastOrder: "2026-04-02", country: "Poland", countryCode: "PL", city: "Warsaw", lat: 52.2297, lng: 21.0122, segment: "new", createdAt: "2026-04-02" },
  { id: "cust_014", name: "Mohammed Ali", email: "m.ali@gmail.com", totalSpent: 890.50, orders: 6, lastOrder: "2026-04-07", country: "Saudi Arabia", countryCode: "SA", city: "Riyadh", lat: 24.7136, lng: 46.6753, segment: "returning", createdAt: "2025-05-20" },
  { id: "cust_015", name: "Sarah Williams", email: "sarah.w@gmail.com", totalSpent: 67.50, orders: 1, lastOrder: "2025-11-15", country: "United Kingdom", countryCode: "GB", city: "London", lat: 51.5074, lng: -0.1278, segment: "lost", createdAt: "2025-11-15" },
  { id: "cust_016", name: "Kim Soo-jin", email: "sjkim@naver.com", totalSpent: 2100.00, orders: 11, lastOrder: "2026-04-13", country: "South Korea", countryCode: "KR", city: "Seoul", lat: 37.5665, lng: 126.978, segment: "vip", createdAt: "2024-12-01" },
  { id: "cust_017", name: "Isabella Rossi", email: "isabella.r@libero.it", totalSpent: 345.00, orders: 2, lastOrder: "2026-03-25", country: "Italy", countryCode: "IT", city: "Milan", lat: 45.4642, lng: 9.19, segment: "returning", createdAt: "2026-01-10" },
  { id: "cust_018", name: "David Brown", email: "d.brown@gmail.com", totalSpent: 1890.00, orders: 10, lastOrder: "2026-04-12", country: "Australia", countryCode: "AU", city: "Sydney", lat: -33.8688, lng: 151.2093, segment: "vip", createdAt: "2025-01-05" },
  { id: "cust_019", name: "Amina Diallo", email: "amina.d@gmail.com", totalSpent: 156.50, orders: 1, lastOrder: "2026-04-06", country: "Senegal", countryCode: "SN", city: "Dakar", lat: 14.7167, lng: -17.4677, segment: "new", createdAt: "2026-04-06" },
  { id: "cust_020", name: "Erik Johansson", email: "erik.j@gmail.com", totalSpent: 789.00, orders: 5, lastOrder: "2026-03-18", country: "Sweden", countryCode: "SE", city: "Stockholm", lat: 59.3293, lng: 18.0686, segment: "returning", createdAt: "2025-08-14" },
  { id: "cust_021", name: "Maria Garcia", email: "maria.g@gmail.com", totalSpent: 2450.00, orders: 14, lastOrder: "2026-04-14", country: "Spain", countryCode: "ES", city: "Barcelona", lat: 41.3874, lng: 2.1686, segment: "vip", createdAt: "2024-10-20" },
  { id: "cust_022", name: "Ryan Chen", email: "ryan.c@gmail.com", totalSpent: 567.50, orders: 3, lastOrder: "2026-04-03", country: "Canada", countryCode: "CA", city: "Toronto", lat: 43.6532, lng: -79.3832, segment: "returning", createdAt: "2025-12-01" },
  { id: "cust_023", name: "Aisha Okafor", email: "aisha.o@gmail.com", totalSpent: 234.00, orders: 2, lastOrder: "2026-03-22", country: "Nigeria", countryCode: "NG", city: "Lagos", lat: 6.5244, lng: 3.3792, segment: "new", createdAt: "2026-03-10" },
  { id: "cust_024", name: "Hiroshi Nakamura", email: "h.nakamura@gmail.com", totalSpent: 1120.00, orders: 6, lastOrder: "2026-04-11", country: "Japan", countryCode: "JP", city: "Osaka", lat: 34.6937, lng: 135.5023, segment: "returning", createdAt: "2025-04-15" },
];

// --- RECENT ORDERS ---
export const recentOrders: Order[] = [
  { id: "ord_001", orderNumber: "#4521", customer: "Maria Garcia", email: "maria.g@gmail.com", total: 189.99, currency: "USD", status: "fulfilled", country: "Spain", countryCode: "ES", city: "Barcelona", createdAt: "2026-04-14T14:32:00Z", items: 1 },
  { id: "ord_002", orderNumber: "#4520", customer: "Kim Soo-jin", email: "sjkim@naver.com", total: 284.97, currency: "USD", status: "pending", country: "South Korea", countryCode: "KR", city: "Seoul", createdAt: "2026-04-14T12:15:00Z", items: 3 },
  { id: "ord_003", orderNumber: "#4519", customer: "Sophie Mueller", email: "s.mueller@web.de", total: 94.98, currency: "USD", status: "fulfilled", country: "Germany", countryCode: "DE", city: "Berlin", createdAt: "2026-04-13T22:45:00Z", items: 2 },
  { id: "ord_004", orderNumber: "#4518", customer: "David Brown", email: "d.brown@gmail.com", total: 79.99, currency: "USD", status: "fulfilled", country: "Australia", countryCode: "AU", city: "Sydney", createdAt: "2026-04-13T18:30:00Z", items: 1 },
  { id: "ord_005", orderNumber: "#4517", customer: "Emma Laurent", email: "emma.l@gmail.com", total: 154.98, currency: "USD", status: "partially_fulfilled", country: "France", countryCode: "FR", city: "Paris", createdAt: "2026-04-13T15:20:00Z", items: 2 },
  { id: "ord_006", orderNumber: "#4516", customer: "Fatima Al-Rashid", email: "fatima.ar@gmail.com", total: 234.98, currency: "USD", status: "fulfilled", country: "UAE", countryCode: "AE", city: "Dubai", createdAt: "2026-04-13T10:10:00Z", items: 3 },
  { id: "ord_007", orderNumber: "#4515", customer: "James Smith", email: "james.s@outlook.com", total: 44.99, currency: "USD", status: "fulfilled", country: "United States", countryCode: "US", city: "New York", createdAt: "2026-04-12T20:55:00Z", items: 1 },
  { id: "ord_008", orderNumber: "#4514", customer: "Priya Sharma", email: "priya.s@gmail.com", total: 123.50, currency: "USD", status: "pending", country: "India", countryCode: "IN", city: "Mumbai", createdAt: "2026-04-12T16:40:00Z", items: 2 },
  { id: "ord_009", orderNumber: "#4513", customer: "Anna Kowalski", email: "anna.k@wp.pl", total: 189.99, currency: "USD", status: "fulfilled", country: "Poland", countryCode: "PL", city: "Warsaw", createdAt: "2026-04-12T11:25:00Z", items: 1 },
  { id: "ord_010", orderNumber: "#4512", customer: "Olivia Johnson", email: "olivia.j@gmail.com", total: 314.97, currency: "USD", status: "refunded", country: "United States", countryCode: "US", city: "Los Angeles", createdAt: "2026-04-11T09:15:00Z", items: 3 },
];

// --- CONVERSION FUNNEL ---
export const conversionFunnel = [
  { stage: "Visitors", count: 9750, rate: 100 },
  { stage: "Product Views", count: 5850, rate: 60 },
  { stage: "Add to Cart", count: 1462, rate: 15 },
  { stage: "Checkout", count: 585, rate: 6 },
  { stage: "Purchase", count: 312, rate: 3.2 },
];

// --- AI ALERTS ---
export const alerts: Alert[] = [
  { id: "alert_001", type: "critical", title: "Stock epuise", message: "UV Protection Sunglasses est en rupture de stock depuis 3 jours. 12 clients ont consulte ce produit aujourd'hui.", createdAt: "2026-04-14T10:00:00Z" },
  { id: "alert_002", type: "success", title: "Produit viral detecte", message: "Smart Water Bottle 750ml a vu ses ventes augmenter de 23% cette semaine. Pensez a augmenter le stock.", createdAt: "2026-04-14T08:00:00Z" },
  { id: "alert_003", type: "warning", title: "Stock faible", message: "Bamboo Desk Organizer n'a plus que 12 unites en stock. Au rythme actuel, rupture dans ~5 jours.", createdAt: "2026-04-13T16:00:00Z" },
  { id: "alert_004", type: "info", title: "Nouveau marche", message: "3 nouvelles commandes du Senegal cette semaine. Marche emergent a surveiller.", createdAt: "2026-04-13T12:00:00Z" },
  { id: "alert_005", type: "warning", title: "Taux de retour eleve", message: "Stainless Steel Insulated Mug a un taux de retour de 8.5%, au-dessus de la moyenne de 3.2%.", createdAt: "2026-04-12T14:00:00Z" },
  { id: "alert_006", type: "success", title: "Record de CA", message: "Samedi dernier a ete votre meilleur jour du mois avec 1,245 USD de CA.", createdAt: "2026-04-13T09:00:00Z" },
];

// --- CUSTOMER SEGMENTS SUMMARY ---
export const customerSegments = {
  vip: { count: 8, totalRevenue: 15836.25, avgOrderValue: 197.95 },
  returning: { count: 8, totalRevenue: 4839.50, avgOrderValue: 120.99 },
  new: { count: 5, totalRevenue: 998.49, avgOrderValue: 166.42 },
  lost: { count: 3, totalRevenue: 146.49, avgOrderValue: 73.25 },
};

// --- SALES BY CHANNEL ---
export const salesByChannel = [
  { channel: "Online Store", revenue: 33682.75, percentage: 70.4 },
  { channel: "Social Media", revenue: 7174.88, percentage: 15.0 },
  { channel: "Marketplace", revenue: 4783.25, percentage: 10.0 },
  { channel: "POS", revenue: 2191.62, percentage: 4.6 },
];

// --- TOP COUNTRIES ---
export const topCountries = [
  { country: "France", countryCode: "FR", revenue: 9800.50, orders: 45, customers: 28 },
  { country: "United States", countryCode: "US", revenue: 8750.00, orders: 52, customers: 35 },
  { country: "Germany", countryCode: "DE", revenue: 6200.75, orders: 38, customers: 22 },
  { country: "Japan", countryCode: "JP", revenue: 5400.00, orders: 31, customers: 18 },
  { country: "UAE", countryCode: "AE", revenue: 4200.25, orders: 22, customers: 12 },
  { country: "South Korea", countryCode: "KR", revenue: 3800.00, orders: 28, customers: 15 },
  { country: "Spain", countryCode: "ES", revenue: 2900.00, orders: 24, customers: 14 },
  { country: "Australia", countryCode: "AU", revenue: 2400.00, orders: 18, customers: 10 },
  { country: "United Kingdom", countryCode: "GB", revenue: 1800.00, orders: 15, customers: 9 },
  { country: "Canada", countryCode: "CA", revenue: 1200.00, orders: 12, customers: 8 },
];
