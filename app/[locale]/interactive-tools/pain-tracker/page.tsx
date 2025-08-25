import { Metadata } from 'next';
import PainTrackerClient from './PainTrackerClient';

type Locale = 'en' | 'zh';

interface Props {
  params: { locale: Locale };
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://periodhub.health';
  
  return {
    title: locale === 'zh' 
      ? '痛经追踪工具 - 记录和分析痛经症状 | PeriodHub'
      : 'Period Pain Tracker - Record and Analyze Pain Symptoms | PeriodHub',
    description: locale === 'zh'
      ? '专业的痛经追踪工具，帮助您记录疼痛程度、位置和类型，分析痛经模式，提供个性化缓解建议。科学管理经期健康，改善生活质量。'
      : 'Professional period pain tracking tool to record pain intensity, location, and type. Analyze pain patterns and get personalized relief recommendations for better menstrual health management.',
    keywords: locale === 'zh' ? [
      '痛经追踪', '疼痛记录', '经期疼痛追踪', '痛经日记', '疼痛分析',
      '痛经模式', '经期症状记录', '疼痛管理工具', '月经健康追踪', '痛经监测'
    ] : [
      'period pain tracker', 'pain recording', 'menstrual pain tracking', 'period pain diary',
      'pain analysis', 'menstrual pain patterns', 'period symptom tracking', 'pain management tool'
    ],
    alternates: {
      canonical: `${baseUrl}/${locale}/interactive-tools/pain-tracker`,
      languages: {
        'zh-CN': `${baseUrl}/zh/interactive-tools/pain-tracker`,
        'en-US': `${baseUrl}/en/interactive-tools/pain-tracker`,
        'x-default': `${baseUrl}/interactive-tools/pain-tracker`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: locale === 'zh' 
        ? '痛经追踪工具 - 记录和分析痛经症状'
        : 'Period Pain Tracker - Record and Analyze Pain Symptoms',
      description: locale === 'zh'
        ? '专业的痛经追踪工具，科学管理经期健康'
        : 'Professional period pain tracking tool for better menstrual health management',
      url: `${baseUrl}/${locale}/interactive-tools/pain-tracker`,
      siteName: 'PeriodHub',
      locale: locale === 'zh' ? 'zh_CN' : 'en_US',
      type: 'website',
    },
  };
}

export default function PainTrackerPage({ params: { locale } }: Props) {
  return <PainTrackerClient locale={locale} />;
}