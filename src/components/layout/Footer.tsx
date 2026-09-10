import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { footerNav } from '@/lib/nav';
import { site } from '@/lib/site';
import { Wordmark } from '@/components/brand/Wordmark';
import { MountainMotif } from '@/components/brand/MountainMotif';

export function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-stone bg-surface">
      <div className="container grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <Wordmark href={null} />
          <p className="mt-5 max-w-measure text-sm leading-relaxed text-slate">
            {t('footer.blurb')}
          </p>
          <p className="mt-4 text-xs uppercase tracking-eyebrow text-ash">
            {t('footer.originLine')}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 md:col-span-4">
          {footerNav.map((group) => (
            <nav key={group.headingKey} aria-label={t(group.headingKey)}>
              <h2 className="text-xs font-medium uppercase tracking-eyebrow text-ash">
                {t(group.headingKey)}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {group.items.map((item) => (
                  <li key={item.key}>
                    <Link
                      href={item.href}
                      className="text-sm text-slate link-underline no-underline transition-colors hover:text-ink"
                    >
                      {t(`nav.${item.key}`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="md:col-span-3">
          <h2 className="text-xs font-medium uppercase tracking-eyebrow text-ash">
            {t('footer.contactHeading')}
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm text-slate">
            <li>
              <a href={`mailto:${site.contact.email}`} className="link-underline no-underline hover:text-ink">
                {site.contact.email}
              </a>
            </li>
            <li>
              <a href={`tel:${site.contact.phoneHref}`} className="link-underline no-underline hover:text-ink">
                {site.contact.phoneDisplay}
              </a>
            </li>
            <li>
              {site.contact.addressLocality}, {site.contact.addressCountry}
            </li>
          </ul>
          <div className="mt-6 flex gap-4 text-sm">
            <a
              href={site.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-slate no-underline hover:text-ink"
            >
              LinkedIn
            </a>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-slate no-underline hover:text-ink"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-stone">
        <div className="container flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <div className="flex items-center gap-3 text-xs text-ash">
            <MountainMotif className="h-3 w-auto text-ash" />
            <span>
              © {year} {site.legalName}. {t('footer.rights')}
            </span>
          </div>
          <div className="flex gap-5 text-xs text-ash">
            <Link href="/privacy" className="link-underline no-underline hover:text-ink">
              {t('footer.privacy')}
            </Link>
            <Link href="/terms" className="link-underline no-underline hover:text-ink">
              {t('footer.terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
