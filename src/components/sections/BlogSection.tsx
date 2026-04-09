import Link from "next/link";
import StrapiImage from "@/components/ui/StrapiImage";
import type { BlogPost, Homepage } from "@/lib/types";

interface Props {
  posts: BlogPost[];
  homepage: Homepage;
}

export default function BlogSection({ posts, homepage }: Props) {
  if (!posts.length) return null;

  return (
    <section className="section-padding border-t border-border" id="blog">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-4xl font-extrabold uppercase tracking-wider">{homepage.blogSectionTitle || "From the Blog"}</h2>
          <p className="text-sm text-muted mt-2">{homepage.blogSectionSubtitle || "Stories, style guides, and drop announcements"}</p>
        </div>
        <Link href="/blog" className="text-[13px] text-accent no-underline tracking-widest uppercase font-medium hover:text-accent-hover transition-colors">All Posts →</Link>
      </div>

      <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1">
        {posts.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`}
            className="group bg-bg-card border border-border rounded overflow-hidden transition-all duration-400 hover:border-[#3a3a3a] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)] no-underline">
            <div className="aspect-[16/10] relative overflow-hidden bg-gradient-to-br from-bg-secondary to-bg-card">
              {post.coverImage ? (
                <StrapiImage image={post.coverImage} fill sizes="(max-width: 768px) 100vw, 33vw" className="transition-transform duration-500 group-hover:scale-105" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-dim text-xs tracking-widest uppercase">BDENIM Blog</div>
              )}
              {post.category && <div className="absolute top-3 left-3 bg-accent text-white text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-sm">{post.category}</div>}
            </div>
            <div className="p-5">
              <div className="flex items-center gap-3 mb-3 text-xs text-dim">
                <span>{post.author}</span><span>·</span>
                <span>{new Date(post.publishedAt).toLocaleDateString("tr-TR", { day: "numeric", month: "short", year: "numeric" })}</span>
                {post.readTime && <><span>·</span><span>{post.readTime} min read</span></>}
              </div>
              <h3 className="text-[15px] font-semibold text-white mb-2 leading-snug group-hover:text-accent transition-colors">{post.title}</h3>
              <p className="text-xs text-muted leading-relaxed line-clamp-2">{post.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
