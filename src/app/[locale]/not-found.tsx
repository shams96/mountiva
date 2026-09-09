import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { ButtonLink } from '@/components/ui/Button';
import { MountainMotif } from '@/components/brand/MountainMotif';

export default function NotFound() {
  const t = useTranslations('notFound');
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <MountainMotif className="h-8 w-auto text-stone" />
      <h1 className="mt-8 text-display-md text-ink">{t('heading')}</h1>
      <p className="mt-4 max-w-md text-slate">{t('body')}</p>
      <div className="mt-8">
        <ButtonLink href="/">{t('cta')}</ButtonLink>
      </div>
    </Container>
  );
}
