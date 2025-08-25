import { Metadata } from 'next';
import SymptomAssessmentClient from './SymptomAssessmentClient';

type Locale = 'en' | 'zh';

interface Props {
  params: { locale: Locale };
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://periodhub.health';
  
  return {
    title: locale === 'zh' 
      ? '症状评估工具 - 科学评估经期症状 | PeriodHub'
      : 'Symptom Assessment Tool - Scientific Period Symptom Evaluation | PeriodHub',
    description: locale === 'zh'
      ? '专业的经期症状评估工具，帮助您科学评估痛经、月经不调等症状的严重程度，提供个性化管理建议。'
      : 'Professional period symptom assessment tool to evaluate pain, irregular periods and other symptoms. Get personalized management recommendations.',
    keywords: locale === 'zh' ? [
      '症状评估', '经期症状', '痛经评估', '月经不调评估', '症状严重程度',
      '经期健康评估', '症状管理建议', '月经症状分析', '健康评估工具'
    ] : [
      'symptom assessment', 'period symptoms', 'pain evaluation', 'irregular period assessment',
      'symptom severity', 'menstrual health evaluation', 'management recommendations'
    ],
    alternates: {
      canonical: `${baseUrl}/${locale}/interactive-tools/symptom-assessment`,
      languages: {
        'zh-CN': `${baseUrl}/zh/interactive-tools/symptom-assessment`,
        'en-US': `${baseUrl}/en/interactive-tools/symptom-assessment`,
        'x-default': `${baseUrl}/interactive-tools/symptom-assessment`,
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
        ? '症状评估工具 - 科学评估经期症状'
        : 'Symptom Assessment Tool - Scientific Period Symptom Evaluation',
      description: locale === 'zh'
        ? '专业的经期症状评估工具，科学管理经期健康'
        : 'Professional period symptom assessment tool for better menstrual health management',
      url: `${baseUrl}/${locale}/interactive-tools/symptom-assessment`,
      siteName: 'PeriodHub',
      locale: locale === 'zh' ? 'zh_CN' : 'en_US',
      type: 'website',
    },
  };
}

export default function SymptomAssessmentPage({ params: { locale } }: Props) {
  return <SymptomAssessmentClient locale={locale} />;
}