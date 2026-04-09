# BDENIM — Strapi CMS Kurulum Rehberi

Bu rehber, BDENIM frontend'inin ihtiyaç duyduğu Strapi backend'ini adım adım kurmanı sağlar.

---

## 1. Strapi Projesi Oluşturma

```bash
npx create-strapi-app@latest bdenim-backend --quickstart
```

Strapi admin paneli açılacak: `http://localhost:1337/admin`
İlk admin hesabını oluştur.

---

## 2. Content Type'ları Oluşturma

Strapi admin panelinde **Content-Type Builder** bölümüne git.
Aşağıdaki yapıları sırayla oluştur:

---

### 2.1 Single Type: `homepage`

| Field Name             | Type          | Detay                     |
|------------------------|---------------|---------------------------|
| heroTagline            | Short text    | "New Drop"                |
| heroTitle              | Short text    | "Modern Streetwear"       |
| heroHighlight          | Short text    | "Essentials"              |
| heroDescription        | Long text     |                           |
| heroPrimaryButtonText  | Short text    | "Explore Collection"      |
| heroPrimaryButtonLink  | Short text    | "#products"               |
| heroSecondaryButtonText| Short text    | "Order via Telegram"      |
| heroSecondaryButtonLink| Short text    | "#contact"                |
| heroImage              | Media (single)|                           |
| campaignBadgeText      | Short text    | "BDENIM Campaign"         |
| lookbookTitle          | Short text    | "Built for the"           |
| lookbookHighlight      | Short text    | "Streets"                 |
| lookbookDescription    | Long text     |                           |
| lookbookImage          | Media (single)|                           |
| lookbookButtonText     | Short text    | "Shop Now"                |
| lookbookButtonLink     | Short text    | "#products"               |
| blogSectionTitle       | Short text    | "From the Blog"           |
| blogSectionSubtitle    | Short text    |                           |

**Repeatable Components** (önce component oluştur):

#### Component: `shared.hero-stat`
| Field  | Type       |
|--------|------------|
| value  | Short text |
| label  | Short text |

→ `homepage`'e ekle: `heroStats` (Repeatable component → shared.hero-stat)

#### Component: `shared.feature-item`
| Field | Type       |
|-------|------------|
| text  | Short text |

→ `homepage`'e ekle: `lookbookFeatures` (Repeatable component → shared.feature-item)

---

### 2.2 Collection Type: `service`

| Field Name    | Type             | Detay                           |
|---------------|------------------|---------------------------------|
| name          | Short text       | Ürün adı                        |
| slug          | UID (name'den)   | URL-friendly isim               |
| description   | Long text        | Ürün açıklaması                 |
| price         | Number (decimal) | Fiyat                           |
| oldPrice      | Number (decimal) | Eski fiyat (opsiyonel)          |
| category      | Short text       | "hoodie", "tee", "denim", "pants", "limited" |
| categoryLabel | Short text       | "Hoodies", "Tees" vb.           |
| badge         | Short text       | "New", "Limited", "Drop 001" (opsiyonel) |
| image         | Media (single)   | Ürün görseli                    |
| inStock       | Boolean          | Default: true                   |

**Repeatable Components:**

#### Component: `product.size`
| Field     | Type    |
|-----------|---------|
| label     | Short text | "S", "M", "L", "XL", "28", "30" |
| available | Boolean    | Default: true                    |

→ `service`'e ekle: `sizes` (Repeatable component → product.size)

#### Component: `product.color`
| Field | Type       |
|-------|------------|
| name  | Short text | "Black", "Charcoal"  |
| hex   | Short text | "#1a1a1a", "#3a3a3a" |

→ `service`'e ekle: `colors` (Repeatable component → product.color)

---

### 2.3 Collection Type: `blog-post`

| Field Name  | Type             | Detay                  |
|-------------|------------------|------------------------|
| title       | Short text       | Blog başlığı           |
| slug        | UID (title'dan)  | URL-friendly           |
| excerpt     | Long text        | Kısa özet              |
| content     | Rich text (HTML) | Blog içeriği           |
| coverImage  | Media (single)   | Kapak görseli          |
| author      | Short text       | Yazar adı              |
| category    | Short text       | "Style", "News", "Drop"|
| readTime    | Number (integer) | Okuma süresi (dakika)  |

---

### 2.4 Single Type: `site-settings`

| Field Name         | Type       | Detay                         |
|--------------------|------------|-------------------------------|
| siteName           | Short text | "BDENIM"                      |
| logo               | Media      |                               |
| telegramUser       | Short text | "bdenim_shop"                 |
| telegramUrl        | Short text | "https://t.me/bdenim_shop"    |
| whatsappNumber     | Short text | "905551234567"                |
| whatsappUrl        | Short text | "https://wa.me/905551234567"  |
| footerText         | Short text | "© 2026 BDENIM..."           |
| contactTitle       | Short text | "Get in Touch"                |
| contactDescription | Long text  |                               |
| currency           | Short text | "₽"                           |
| mainMarket         | Short text | "RU"                          |

**Repeatable Components:**

#### Component: `shared.nav-link`
| Field | Type       |
|-------|------------|
| label | Short text |
| href  | Short text |

→ `site-settings`'e ekle: `navLinks` (Repeatable → shared.nav-link)
→ `site-settings`'e ekle: `footerLinks` (Repeatable → shared.nav-link)

---

## 3. API Permissions

Strapi admin → **Settings** → **Users & Permissions** → **Roles** → **Public**

Şu endpoint'lere `find` ve `findOne` izni ver:

- ✅ Homepage → find
- ✅ Service → find, findOne
- ✅ Blog-post → find, findOne
- ✅ Site-settings → find

---

## 4. API Token Oluşturma

**Settings** → **API Tokens** → **Create new API Token**

- Name: `Frontend`
- Type: `Read-only`
- Oluşan token'ı `.env.local`'e yapıştır

---

## 5. Frontend'i Başlatma

```bash
cd bdenim-next
cp .env.example .env.local
# .env.local'i düzenle:
# NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
# STRAPI_API_TOKEN=token_buraya

npm install
npm run dev
```

Tarayıcıda aç: `http://localhost:3000`

---

## 6. Örnek İçerik Ekleme

### Homepage (Single Type)
```
heroTagline: "New Drop"
heroTitle: "Modern Streetwear"
heroHighlight: "Essentials"
heroDescription: "Dark, oversized silhouettes built for a sharper streetwear identity..."
heroPrimaryButtonText: "Explore Collection"
heroPrimaryButtonLink: "#products"
heroSecondaryButtonText: "Order via Telegram"
heroSecondaryButtonLink: "#contact"
campaignBadgeText: "BDENIM Campaign"
heroStats:
  - value: "001", label: "Current Drop"
  - value: "24", label: "New Pieces"
  - value: "RU", label: "Main Market"
lookbookTitle: "Built for the"
lookbookHighlight: "Streets"
lookbookDescription: "BDENIM is a streetwear-first brand..."
lookbookFeatures:
  - "Premium heavyweight cotton & denim fabrics"
  - "Limited drops — once sold out, gone forever"
  - "Order via Telegram or WhatsApp — fast & direct"
  - "Shipping across Russia & CIS countries"
lookbookButtonText: "Shop Now"
```

### Site Settings
```
siteName: "BDENIM"
telegramUser: "bdenim_shop"
telegramUrl: "https://t.me/bdenim_shop"
whatsappNumber: "905551234567"
whatsappUrl: "https://wa.me/905551234567"
currency: "₽"
mainMarket: "RU"
navLinks:
  - label: "Hoodies", href: "#products"
  - label: "Tees", href: "#products"
  - label: "Denim", href: "#products"
  - label: "Pants", href: "#products"
footerLinks:
  - label: "Telegram", href: "https://t.me/bdenim_shop"
  - label: "WhatsApp", href: "https://wa.me/905551234567"
  - label: "Privacy", href: "/privacy"
```

---

## Proje Yapısı

```
bdenim-next/
├── .env.example              ← Ortam değişkenleri şablonu
├── .env.local                ← Gerçek değerler (git'e eklenmez)
├── next.config.js
├── tailwind.config.ts
├── package.json
├── tsconfig.json
├── public/
│   └── images/
├── src/
│   ├── app/
│   │   ├── layout.tsx        ← Root layout (Navbar + Footer)
│   │   ├── page.tsx          ← Ana sayfa
│   │   └── blog/
│   │       ├── page.tsx      ← Blog listesi
│   │       └── [slug]/
│   │           └── page.tsx  ← Blog detay
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── ServicesSection.tsx
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductModal.tsx
│   │   │   ├── Lookbook.tsx
│   │   │   ├── BlogSection.tsx
│   │   │   ├── ContactSection.tsx
│   │   │   └── index.ts
│   │   └── ui/
│   │       ├── StrapiImage.tsx
│   │       └── Icons.tsx
│   ├── lib/
│   │   ├── strapi.ts         ← Strapi API client
│   │   └── types.ts          ← TypeScript type definitions
│   └── styles/
│       └── globals.css
└── STRAPI_SETUP.md           ← Bu dosya
```
