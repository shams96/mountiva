import { useFormatter, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { BlogPost } from '@/lib/blog';

export function PostCard({ post }: { post: BlogPost }) {
  const t = useTranslations('common');
  const format = useFormatter();
  const date = new Date(post.publishedAt);

  return (
    <article className="card-wipe group flex h-full flex-col border-t border-ink pt-6">
      <div className="flex items-center gap-3 text-xs uppercase tracking-eyebrow text-ash">
        <span>{post.category}</span>
        <span aria-hidden>·</span>
        <span>{t('readingTime', { minutes: post.readingMinutes })}</span>
      </div>
      <h3 className="mt-4 text-title text-ink">
        <Link
          href={`/blog/${post.slug}`}
          className="no-underline transition-colors group-hover:text-signal"
        >
          {post.title}
        </Link>
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate">{post.excerpt}</p>
      <time
        dateTime={post.publishedAt}
        className="mt-5 text-xs text-ash"
      >
        {format.dateTime(date, { year: 'numeric', month: 'long', day: 'numeric' })}
      </time>
    </article>
  );
}
