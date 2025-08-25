'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

interface NavigationTabsProps {
  locale: string;
}

export default function NavigationTabs({ locale }: NavigationTabsProps) {
  const t = useTranslations('navigationTabs');
  const router = useRouter();
  
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  const navigateToDownloads = () => {
    router.push(`/${locale}/downloads`);
  };

  const navigateToImmediateRelief = () => {
    router.push(`/${locale}/immediate-relief`);
  };

  return (
    <section className="flex justify-center">
      <div className="bg-neutral-100 p-1 rounded-lg inline-flex flex-wrap gap-1">
        <button
          onClick={() => scrollToSection('articles-section')}
          className="px-4 sm:px-6 py-2 rounded-md text-neutral-700 hover:bg-white hover:shadow-sm transition-all text-sm sm:text-base"
        >
          {locale === 'en' ? '📚 Articles' : '📚 专业文章'}
        </button>
        <button
          onClick={navigateToDownloads}
          className="px-4 sm:px-6 py-2 rounded-md text-neutral-700 hover:bg-white hover:shadow-sm transition-all text-sm sm:text-base"
        >
          {locale === 'en' ? '📥 PDF Downloads' : '📥 PDF下载'}
        </button>
        <button
          onClick={navigateToImmediateRelief}
          className="px-4 sm:px-6 py-2 rounded-md text-white bg-red-500 hover:bg-red-600 hover:shadow-sm transition-all text-sm sm:text-base font-medium"
        >
          {locale === 'en' ? '⚡ Emergency Relief' : '⚡ 紧急缓解'}
        </button>
      </div>
    </section>
  );
}
