// seed-products.js
// Strapi'ye toplu ürün ekleyen script
// Kullanım: node seed-products.js

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const API_TOKEN = process.env.STRAPI_API_TOKEN;

if (!API_TOKEN) {
  console.error("ERROR: STRAPI_API_TOKEN is required to run seed-products.js.");
  console.error("Add it to your local environment before seeding data.");
  process.exit(1);
}

const products = [
  {
    name: "Dark Graphic Tee",
    slug: "dark-graphic-tee",
    description: "100% cotton graphic tee featuring exclusive BDENIM artwork. Relaxed fit with dropped shoulders and heavyweight 240gsm fabric.",
    price: 3200,
    oldPrice: null,
    category: "tee",
    categoryLabel: "Tees",
    badge: null,
    inStock: true,
    sizes: [
      { label: "S", available: true },
      { label: "M", available: true },
      { label: "L", available: true },
      { label: "XL", available: true },
    ],
    colors: [
      { name: "Black", hex: "#111111" },
      { name: "Off-White", hex: "#e8e0d4" },
    ],
  },
  {
    name: "Wide Leg Raw Denim",
    slug: "wide-leg-raw-denim",
    description: "Raw selvedge denim with a wide-leg cut. Unwashed for authentic fade development. Japanese fabric, YKK hardware.",
    price: 8500,
    oldPrice: 10200,
    category: "denim",
    categoryLabel: "Denim",
    badge: "Drop 001",
    inStock: true,
    sizes: [
      { label: "28", available: true },
      { label: "30", available: true },
      { label: "32", available: true },
      { label: "34", available: true },
      { label: "36", available: false },
    ],
    colors: [
      { name: "Raw Indigo", hex: "#1a2744" },
      { name: "Washed Black", hex: "#222222" },
    ],
  },
  {
    name: "Utility Cargo Pants",
    slug: "utility-cargo-pants",
    description: "Functional cargo pants with oversized pockets and adjustable waist. Durable ripstop fabric built for everyday wear.",
    price: 7400,
    oldPrice: null,
    category: "pants",
    categoryLabel: "Pants",
    badge: null,
    inStock: true,
    sizes: [
      { label: "S", available: true },
      { label: "M", available: true },
      { label: "L", available: true },
      { label: "XL", available: true },
    ],
    colors: [
      { name: "Black", hex: "#111111" },
      { name: "Olive", hex: "#4a5534" },
      { name: "Sand", hex: "#a89878" },
    ],
  },
  {
    name: "Heavyweight Zip Hoodie",
    slug: "heavyweight-zip-hoodie",
    description: "450gsm heavyweight zip hoodie with ribbed cuffs and YKK zipper. Boxy oversized silhouette with kangaroo pocket.",
    price: 7800,
    oldPrice: null,
    category: "hoodie",
    categoryLabel: "Hoodies",
    badge: "New",
    inStock: true,
    sizes: [
      { label: "M", available: true },
      { label: "L", available: true },
      { label: "XL", available: true },
      { label: "XXL", available: true },
    ],
    colors: [
      { name: "Black", hex: "#0f0f0f" },
      { name: "Fog Grey", hex: "#6b6b6b" },
    ],
  },
  {
    name: "Embroidered Logo Tee",
    slug: "embroidered-logo-tee",
    description: "Minimal BDENIM logo embroidered on chest. Heavyweight 280gsm cotton, pre-shrunk. Clean and understated.",
    price: 3600,
    oldPrice: null,
    category: "tee",
    categoryLabel: "Tees",
    badge: null,
    inStock: true,
    sizes: [
      { label: "S", available: true },
      { label: "M", available: true },
      { label: "L", available: true },
      { label: "XL", available: true },
    ],
    colors: [
      { name: "Black", hex: "#111111" },
      { name: "White", hex: "#f0f0f0" },
      { name: "Navy", hex: "#1a2744" },
    ],
  },
  {
    name: "Straight Fit Jeans",
    slug: "straight-fit-jeans",
    description: "Classic straight-fit jeans in washed black. Mid-rise waist, clean stitching, and reinforced seams throughout.",
    price: 7200,
    oldPrice: null,
    category: "denim",
    categoryLabel: "Denim",
    badge: null,
    inStock: true,
    sizes: [
      { label: "28", available: true },
      { label: "30", available: true },
      { label: "32", available: true },
      { label: "34", available: true },
    ],
    colors: [
      { name: "Washed Black", hex: "#2a2a2a" },
      { name: "Dark Blue", hex: "#1a2744" },
    ],
  },
  {
    name: "Drop Shoulder Crewneck",
    slug: "drop-shoulder-crewneck",
    description: "Limited edition drop-shoulder crewneck. Only 50 pieces made. Heavyweight fleece interior with raw-edge details.",
    price: 5400,
    oldPrice: 6800,
    category: "limited",
    categoryLabel: "Limited Edition",
    badge: "Limited",
    inStock: true,
    sizes: [
      { label: "M", available: false },
      { label: "L", available: true },
      { label: "XL", available: true },
    ],
    colors: [
      { name: "Vintage Black", hex: "#1a1a1a" },
    ],
  },
];

async function createProduct(product) {
  try {
    const res = await fetch(`${STRAPI_URL}/api/services`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_TOKEN}`,
      },
      body: JSON.stringify({ data: product }),
    });

    if (!res.ok) {
      const error = await res.text();
      console.error(`❌ HATA: ${product.name} — ${res.status}: ${error}`);
      return false;
    }

    const data = await res.json();
    
    // Publish the product
    await fetch(`${STRAPI_URL}/api/services/${data.data.documentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_TOKEN}`,
      },
      body: JSON.stringify({ data: { ...product, publishedAt: new Date().toISOString() } }),
    });

    console.log(`✅ Eklendi: ${product.name}`);
    return true;
  } catch (err) {
    console.error(`❌ HATA: ${product.name} — ${err.message}`);
    return false;
  }
}

async function main() {
  console.log("\n🛍️  BDENIM — Ürün Ekleme Scripti");
  console.log("================================\n");

  if (API_TOKEN === "BURAYA_TOKEN_YAPISTIR") {
    console.error("❌ Lütfen script içindeki API_TOKEN değerini güncelleyin!");
    console.error("   Strapi Admin → Settings → API Tokens → Read Only token'ı kopyalayın.\n");
    
    // Full Access token gerekebilir, onu da deneyelim
    console.log("💡 NOT: Ürün eklemek için Full Access token gerekiyor, Read Only yetmez.");
    console.log("   Strapi Admin → Settings → API Tokens → Full Access token'ı kullanın.\n");
    process.exit(1);
  }

  let success = 0;
  let fail = 0;

  for (const product of products) {
    const result = await createProduct(product);
    if (result) success++;
    else fail++;
    // Strapi'ye biraz nefes aldıralım
    await new Promise((r) => setTimeout(r, 500));
  }

  console.log(`\n================================`);
  console.log(`✅ Başarılı: ${success}`);
  console.log(`❌ Başarısız: ${fail}`);
  console.log(`📦 Toplam: ${products.length}\n`);
  
  if (success > 0) {
    console.log("🎉 Ürünler eklendi! localhost:3000'i yenile.");
  }
}

main();
