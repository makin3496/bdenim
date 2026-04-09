import qs from "qs";

// ═══════════════════════════════════════════
// Base Config
// ═══════════════════════════════════════════

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

async function fetchStrapi<T>(
  path: string,
  params?: Record<string, unknown>,
  options?: RequestInit
): Promise<T> {
  const query = params ? `?${qs.stringify(params, { encodeValuesOnly: true })}` : "";
  const url = `${STRAPI_URL}/api${path}${query}`;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (STRAPI_TOKEN) {
    headers["Authorization"] = `Bearer ${STRAPI_TOKEN}`;
  }

  const res = await fetch(url, {
    headers,
    next: { revalidate: 60 },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`Strapi fetch error: ${res.status} ${res.statusText} — ${url}`);
  }

  return res.json();
}

// ═══════════════════════════════════════════
// Helper: get full image URL
// ═══════════════════════════════════════════

export function getStrapiImageUrl(url: string | undefined | null): string {
  if (!url) return "/images/placeholder.jpg";
  if (url.startsWith("http")) return url;
  return `${STRAPI_URL}${url}`;
}

// ═══════════════════════════════════════════
// Strapi v5 response types (flat structure)
// ═══════════════════════════════════════════

interface StrapiSingleResponse<T> {
  data: T & { id: number; documentId: string };
  meta: Record<string, unknown>;
}

interface StrapiCollectionResponse<T> {
  data: Array<T & { id: number; documentId: string }>;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// ═══════════════════════════════════════════
// Types
// ═══════════════════════════════════════════

export interface Homepage {
  heroTagline: string;
  heroTitle: string;
  heroHighlight: string;
  heroDescription: string;
  heroPrimaryButtonText: string;
  heroPrimaryButtonLink: string;
  heroSecondaryButtonText: string;
  heroSecondaryButtonLink: string;
  heroImage: StrapiMedia | null;
  heroStats: Array<{ id: number; value: string; label: string }>;
  campaignBadgeText: string;
  lookbookTitle: string;
  lookbookHighlight: string;
  lookbookDescription: string;
  lookbookImage: StrapiMedia | null;
  lookbookFeatures: Array<{ id: number; text: string }>;
  lookbookButtonText: string;
  lookbookButtonLink: string;
  blogSectionTitle: string;
  blogSectionSubtitle: string;
}

export interface StrapiMedia {
  id: number;
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
  formats?: Record<string, { url: string; width: number; height: number }>;
}

export interface Service {
  id?: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  oldPrice?: number | null;
  category: string;
  categoryLabel: string;
  badge?: string | null;
  image: StrapiMedia | null;
  sizes: Array<{ id: number; label: string; available: boolean }>;
  colors: Array<{ id: number; name: string; hex: string }>;
  inStock: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface BlogPost {
  id?: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string | Array<Record<string, unknown>>;
  coverImage: StrapiMedia | null;
  author: string;
  category: string;
  readTime: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface SiteSettings {
  siteName: string;
  logo: StrapiMedia | null;
  telegramUser: string;
  telegramUrl: string;
  whatsappNumber: string;
  whatsappUrl: string;
  navLinks: Array<{ id: number; label: string; href: string }>;
  footerText: string;
  footerLinks: Array<{ id: number; label: string; href: string }>;
  contactTitle: string;
  contactDescription: string;
  currency: string;
  mainMarket: string;
}

// ═══════════════════════════════════════════
// API Functions
// ═══════════════════════════════════════════

export async function getHomepage(): Promise<Homepage> {
  const res = await fetchStrapi<StrapiSingleResponse<Homepage>>("/homepage", {
    populate: "*",
  });
  return res.data;
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const res = await fetchStrapi<StrapiSingleResponse<SiteSettings>>("/site-setting", {
    populate: "*",
  });
  return res.data;
}

export async function getServices(params?: {
  category?: string;
  page?: number;
  pageSize?: number;
}): Promise<{ data: Service[]; meta: StrapiCollectionResponse<Service>["meta"] }> {
  const filters: Record<string, unknown> = {};

  if (params?.category && params.category !== "all") {
    filters["category"] = { $eq: params.category };
  }

  const res = await fetchStrapi<StrapiCollectionResponse<Service>>("/services", {
    populate: "*",
    filters,
    pagination: {
      page: params?.page || 1,
      pageSize: params?.pageSize || 25,
    },
    sort: ["createdAt:desc"],
  });

  return { data: res.data, meta: res.meta };
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const res = await fetchStrapi<StrapiCollectionResponse<Service>>("/services", {
    populate: "*",
    filters: { slug: { $eq: slug } },
  });

  if (!res.data.length) return null;
  return res.data[0];
}

export async function getBlogPosts(params?: {
  page?: number;
  pageSize?: number;
  category?: string;
}): Promise<{ data: BlogPost[]; meta: StrapiCollectionResponse<BlogPost>["meta"] }> {
  const filters: Record<string, unknown> = {};

  if (params?.category) {
    filters["category"] = { $eq: params.category };
  }

  const res = await fetchStrapi<StrapiCollectionResponse<BlogPost>>("/blog-posts", {
    populate: "*",
    filters,
    pagination: {
      page: params?.page || 1,
      pageSize: params?.pageSize || 6,
    },
    sort: ["publishedAt:desc"],
  });

  return { data: res.data, meta: res.meta };
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const res = await fetchStrapi<StrapiCollectionResponse<BlogPost>>("/blog-posts", {
    populate: "*",
    filters: { slug: { $eq: slug } },
  });

  if (!res.data.length) return null;
  return res.data[0];
}

export async function getAllBlogSlugs(): Promise<string[]> {
  const res = await fetchStrapi<StrapiCollectionResponse<BlogPost>>("/blog-posts", {
    fields: ["slug"],
    pagination: { pageSize: 100 },
  });

  return res.data.map((post) => post.slug);
}
