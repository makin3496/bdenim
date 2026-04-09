import Link from "next/link";
import { getBlogPosts } from "@/lib/strapi";
import StrapiImage from "@/components/ui/StrapiImage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — BDENIM",
  description: "Streetwear stories, style guides, and drop announcements.",
};

export const revalidate = 60;

export default async function BlogPage() {
  const { data: posts } = await getBlogPosts({ pageSize: 20 });

  return (
    <div className="mt-[60px] section-padding">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-0.5 bg-accent" />
          <span className="text-[13px] font-semibold tracking-[4px] uppercase text-accent">Blog</span>
        </div>
        <h1 className="text-5xl max-md:text-4xl font-black uppercase tracking-tight mb-4">
          Stories & <span className="text-accent">Drops</span>
        </h1>
        <p className="text-muted max-w-lg">
          Streetwear culture, style guides, behind-the-scenes, and drop announcements.
        </p>
      </div>

      {/* Posts Grid */}
      {posts.length > 0 ? (
        <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.attributes.slug}`}
              className="group bg-bg-card border border-border rounded overflow-hidden transition-all duration-400
                         hover:border-[#3a3a3a] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)] no-underline"
            >
              <div className="aspect-[16/10] relative overflow-hidden bg-gradient-to-br from-bg-secondary to-bg-card">
                {post.attributes.coverImage?.data ? (
                  <StrapiImage
                    image={post.attributes.coverImage}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-dim text-xs tracking-widest uppercase">
                    BDENIM
                  </div>
                )}
                {post.attributes.category && (
                  <div className="absolute top-3 left-3 bg-accent text-white text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-sm">
                    {post.attributes.category}
                  </div>
                )}
              </div>

              <div className="p-5">
                <div className="flex items-center gap-3 mb-3 text-xs text-dim">
                  <span>{post.attributes.author}</span>
                  <span>·</span>
                  <span>
                    {new Date(post.attributes.publishedAt).toLocaleDateString("tr-TR", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  {post.attributes.readTime && (
                    <>
                      <span>·</span>
                      <span>{post.attributes.readTime} min</span>
                    </>
                  )}
                </div>
                <h2 className="text-[15px] font-semibold text-white mb-2 leading-snug group-hover:text-accent transition-colors">
                  {post.attributes.title}
                </h2>
                <p className="text-xs text-muted leading-relaxed line-clamp-2">
                  {post.attributes.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-muted">
          <p>No blog posts yet. Add content in Strapi CMS.</p>
        </div>
      )}
    </div>
  );
}
