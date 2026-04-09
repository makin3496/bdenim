import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlogPostBySlug, getAllBlogSlugs } from "@/lib/strapi";
import StrapiImage from "@/components/ui/StrapiImage";
import type { Metadata } from "next";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  try {
    const slugs = await getAllBlogSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const post = await getBlogPostBySlug(params.slug);
    if (!post) return { title: "Post Not Found" };
    return {
      title: `${post.title} — BDENIM Blog`,
      description: post.excerpt,
    };
  } catch {
    return { title: "BDENIM Blog" };
  }
}

export const revalidate = 60;

export default async function BlogPostPage({ params }: Props) {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="mt-[60px]">
      {/* Cover Image */}
      <div className="w-full aspect-[21/9] max-md:aspect-[16/9] relative bg-gradient-to-br from-bg-secondary to-bg-card">
        {post.coverImage?.data ? (
          <StrapiImage image={post.coverImage} fill priority sizes="100vw" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-dim text-sm tracking-widest uppercase">
            BDENIM Blog
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="max-w-[720px] mx-auto px-6 -mt-20 relative z-10">
        {/* Meta */}
        <div className="flex items-center gap-3 mb-4 text-xs text-dim">
          {post.category && (
            <span className="bg-accent text-white text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-sm">
              {post.category}
            </span>
          )}
          <span>{post.author}</span>
          <span>·</span>
          <span>
            {new Date(post.publishedAt).toLocaleDateString("tr-TR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
          {post.readTime && (
            <>
              <span>·</span>
              <span>{post.readTime} min read</span>
            </>
          )}
        </div>

        {/* Title */}
        <h1 className="text-4xl max-md:text-3xl font-extrabold uppercase leading-tight mb-8">
          {post.title}
        </h1>

        {/* Body */}
        <div
          className="prose prose-invert prose-sm max-w-none
                     prose-headings:font-bold prose-headings:uppercase prose-headings:tracking-wide
                     prose-p:text-muted prose-p:leading-[1.8]
                     prose-a:text-accent prose-a:no-underline hover:prose-a:underline
                     prose-strong:text-white prose-strong:font-semibold
                     prose-img:rounded-lg prose-img:border prose-img:border-border
                     mb-12"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Back */}
        <div className="border-t border-border pt-8 pb-20">
          <Link
            href="/blog"
            className="text-sm text-accent tracking-widest uppercase font-medium hover:text-accent-hover transition-colors no-underline"
          >
            ← Back to Blog
          </Link>
        </div>
      </div>
    </article>
  );
}
