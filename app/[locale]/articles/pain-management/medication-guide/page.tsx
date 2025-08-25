import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, AlertTriangle, Clock, Pill } from 'lucide-react';
import { Locale, locales } from '@/i18n';

type Props = {
  params: { locale: Locale }
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://periodhub.health';
  
  return {
    title: locale === 'zh' 
      ? '痛经用药指南：布洛芬与萘普生剂量建议 - Period Hub' 
      : 'Period Pain Medication Guide: Ibuprofen vs Naproxen Dosing - Period Hub',
    description: locale === 'zh'
      ? '专业痛经用药指南，详细介绍布洛芬、萘普生等NSAID药物的剂量建议、使用时机和注意事项。基于循证医学的安全用药指导，帮助女性科学缓解痛经症状。'
      : 'Professional period pain medication guide covering ibuprofen, naproxen and other NSAIDs dosing recommendations, timing and precautions. Evidence-based safe medication guidance for effective dysmenorrhea relief.',
    keywords: locale === 'zh'
      ? ['痛经用药建议', '布洛芬剂量', '萘普生用法', 'NSAID痛经', '痛经药物指南', '原发性痛经治疗']
      : ['ibuprofen for period pain', 'naproxen period cramps', 'NSAID dysmenorrhea', 'period pain medication', 'menstrual cramp relief'],
    alternates: {
      canonical: `${baseUrl}/${locale}/articles/pain-management/medication-guide`,
      languages: {
        'zh-CN': `${baseUrl}/zh/articles/pain-management/medication-guide`,
        'en-US': `${baseUrl}/en/articles/pain-management/medication-guide`,
        'x-default': `${baseUrl}/articles/pain-management/medication-guide`,
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
        ? '痛经用药指南：布洛芬与萘普生剂量建议'
        : 'Period Pain Medication Guide: Ibuprofen vs Naproxen',
      description: locale === 'zh'
        ? '专业痛经用药指南，NSAID药物安全使用指导'
        : 'Professional medication guide for period pain relief',
      url: `${baseUrl}/${locale}/articles/pain-management/medication-guide`,
      siteName: 'PeriodHub',
      locale: locale === 'zh' ? 'zh_CN' : 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: locale === 'zh' 
        ? '痛经用药指南：布洛芬与萘普生剂量建议'
        : 'Period Pain Medication Guide: Ibuprofen vs Naproxen',
      description: locale === 'zh'
        ? '专业痛经用药指南，NSAID药物安全使用指导'
        : 'Professional medication guide for period pain relief',
    },
  };
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function MedicationGuidePage({
  params: { locale }
}: Props) {
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        
        {/* 返回导航 */}
        <div className="mb-8">
          <Link 
            href={`/${locale}/articles/pain-management`}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>{locale === 'zh' ? '返回痛经管理' : 'Back to Pain Management'}</span>
          </Link>
        </div>

        {/* 页面标题 */}
        <header className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {locale === 'zh' ? '痛经用药指南：NSAID安全使用' : 'Period Pain Medication Guide: Safe NSAID Use'}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            {locale === 'zh' 
              ? '基于循证医学的痛经药物治疗指导，包含布洛芬、萘普生等NSAID的安全使用建议'
              : 'Evidence-based medication guidance for period pain, including safe use of ibuprofen, naproxen and other NSAIDs'
            }
          </p>
        </header>

        {/* 医疗免责声明 */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
          <div className="flex items-start">
            <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-amber-800 mb-2">
                {locale === 'zh' ? '医疗免责声明' : 'Medical Disclaimer'}
              </h3>
              <p className="text-amber-700 text-sm">
                {locale === 'zh'
                  ? '本指南仅供参考，不能替代专业医疗建议。使用任何药物前请咨询医生或药师，特别是有过敏史、肝肾疾病或正在服用其他药物的情况。'
                  : 'This guide is for reference only and cannot replace professional medical advice. Consult a doctor or pharmacist before using any medication, especially if you have allergies, liver/kidney disease, or are taking other medications.'
                }
              </p>
            </div>
          </div>
        </div>

        {/* 主要内容 */}
        <div className="space-y-12">
          
          {/* NSAID概述 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {locale === 'zh' ? 'NSAID药物概述' : 'NSAID Overview'}
            </h2>
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <p className="text-gray-700 leading-relaxed mb-4">
                {locale === 'zh'
                  ? '非甾体抗炎药（NSAID）是治疗痛经的一线药物。它们通过抑制前列腺素的产生来减轻疼痛和炎症，对原发性痛经特别有效。'
                  : 'Nonsteroidal anti-inflammatory drugs (NSAIDs) are first-line medications for treating dysmenorrhea. They work by inhibiting prostaglandin production to reduce pain and inflammation, particularly effective for primary dysmenorrhea.'
                }
              </p>
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">80%</div>
                  <div className="text-sm text-blue-700">
                    {locale === 'zh' ? '有效率' : 'Effectiveness Rate'}
                  </div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">30min</div>
                  <div className="text-sm text-green-700">
                    {locale === 'zh' ? '起效时间' : 'Onset Time'}
                  </div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">6-8h</div>
                  <div className="text-sm text-purple-700">
                    {locale === 'zh' ? '持续时间' : 'Duration'}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 布洛芬指南 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {locale === 'zh' ? '布洛芬（Ibuprofen）使用指南' : 'Ibuprofen Usage Guide'}
            </h2>
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <Pill className="w-5 h-5 mr-2 text-blue-500" />
                    {locale === 'zh' ? '推荐剂量' : 'Recommended Dosage'}
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• <strong>{locale === 'zh' ? '成人剂量' : 'Adult dose'}:</strong> 400-600mg</li>
                    <li>• <strong>{locale === 'zh' ? '服用频率' : 'Frequency'}:</strong> {locale === 'zh' ? '每6-8小时一次' : 'Every 6-8 hours'}</li>
                    <li>• <strong>{locale === 'zh' ? '最大日剂量' : 'Max daily dose'}:</strong> 2400mg</li>
                    <li>• <strong>{locale === 'zh' ? '最佳时机' : 'Best timing'}:</strong> {locale === 'zh' ? '疼痛开始前或刚开始时' : 'Before or at pain onset'}</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-green-500" />
                    {locale === 'zh' ? '使用建议' : 'Usage Tips'}
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• {locale === 'zh' ? '随餐服用减少胃部刺激' : 'Take with food to reduce stomach irritation'}</li>
                    <li>• {locale === 'zh' ? '充足饮水' : 'Drink plenty of water'}</li>
                    <li>• {locale === 'zh' ? '预防性用药效果更好' : 'Preventive use is more effective'}</li>
                    <li>• {locale === 'zh' ? '连续使用不超过3天' : 'Do not use continuously for more than 3 days'}</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* 萘普生指南 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {locale === 'zh' ? '萘普生（Naproxen）使用指南' : 'Naproxen Usage Guide'}
            </h2>
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <Pill className="w-5 h-5 mr-2 text-purple-500" />
                    {locale === 'zh' ? '推荐剂量' : 'Recommended Dosage'}
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• <strong>{locale === 'zh' ? '初始剂量' : 'Initial dose'}:</strong> 500mg</li>
                    <li>• <strong>{locale === 'zh' ? '维持剂量' : 'Maintenance'}:</strong> 250mg</li>
                    <li>• <strong>{locale === 'zh' ? '服用频率' : 'Frequency'}:</strong> {locale === 'zh' ? '每6-8小时一次' : 'Every 6-8 hours'}</li>
                    <li>• <strong>{locale === 'zh' ? '最大日剂量' : 'Max daily dose'}:</strong> 1250mg</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    {locale === 'zh' ? '优势特点' : 'Advantages'}
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• {locale === 'zh' ? '作用时间更长' : 'Longer duration of action'}</li>
                    <li>• {locale === 'zh' ? '服用次数较少' : 'Less frequent dosing'}</li>
                    <li>• {locale === 'zh' ? '对重度痛经效果好' : 'Effective for severe dysmenorrhea'}</li>
                    <li>• {locale === 'zh' ? '抗炎效果强' : 'Strong anti-inflammatory effect'}</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* 药物对比 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {locale === 'zh' ? '布洛芬 vs 萘普生对比' : 'Ibuprofen vs Naproxen Comparison'}
            </h2>
            <div className="bg-white rounded-lg p-6 shadow-sm border overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold text-gray-800">
                      {locale === 'zh' ? '特性' : 'Feature'}
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-blue-600">
                      {locale === 'zh' ? '布洛芬' : 'Ibuprofen'}
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-purple-600">
                      {locale === 'zh' ? '萘普生' : 'Naproxen'}
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">{locale === 'zh' ? '起效时间' : 'Onset'}</td>
                    <td className="py-3 px-4">30-60 {locale === 'zh' ? '分钟' : 'minutes'}</td>
                    <td className="py-3 px-4">1-2 {locale === 'zh' ? '小时' : 'hours'}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">{locale === 'zh' ? '持续时间' : 'Duration'}</td>
                    <td className="py-3 px-4">4-6 {locale === 'zh' ? '小时' : 'hours'}</td>
                    <td className="py-3 px-4">8-12 {locale === 'zh' ? '小时' : 'hours'}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">{locale === 'zh' ? '服用频率' : 'Frequency'}</td>
                    <td className="py-3 px-4">{locale === 'zh' ? '每6-8小时' : 'Every 6-8h'}</td>
                    <td className="py-3 px-4">{locale === 'zh' ? '每8-12小时' : 'Every 8-12h'}</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">{locale === 'zh' ? '适用情况' : 'Best for'}</td>
                    <td className="py-3 px-4">{locale === 'zh' ? '轻中度痛经' : 'Mild-moderate pain'}</td>
                    <td className="py-3 px-4">{locale === 'zh' ? '中重度痛经' : 'Moderate-severe pain'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 注意事项 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {locale === 'zh' ? '重要注意事项' : 'Important Precautions'}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-red-800 mb-4">
                  {locale === 'zh' ? '禁忌症' : 'Contraindications'}
                </h3>
                <ul className="space-y-2 text-red-700 text-sm">
                  <li>• {locale === 'zh' ? '对NSAID过敏' : 'NSAID allergy'}</li>
                  <li>• {locale === 'zh' ? '活动性胃溃疡' : 'Active peptic ulcer'}</li>
                  <li>• {locale === 'zh' ? '严重肝肾功能不全' : 'Severe liver/kidney dysfunction'}</li>
                  <li>• {locale === 'zh' ? '妊娠晚期' : 'Late pregnancy'}</li>
                  <li>• {locale === 'zh' ? '哮喘急性发作' : 'Acute asthma attack'}</li>
                </ul>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-yellow-800 mb-4">
                  {locale === 'zh' ? '副作用监测' : 'Side Effects to Monitor'}
                </h3>
                <ul className="space-y-2 text-yellow-700 text-sm">
                  <li>• {locale === 'zh' ? '胃部不适、恶心' : 'Stomach upset, nausea'}</li>
                  <li>• {locale === 'zh' ? '头痛、头晕' : 'Headache, dizziness'}</li>
                  <li>• {locale === 'zh' ? '皮疹、过敏反应' : 'Rash, allergic reactions'}</li>
                  <li>• {locale === 'zh' ? '水肿' : 'Edema'}</li>
                  <li>• {locale === 'zh' ? '血压升高' : 'Elevated blood pressure'}</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 相关链接 */}
          <section className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {locale === 'zh' ? '相关资源' : 'Related Resources'}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href={`/${locale}/interactive-tools/symptom-assessment`} className="flex items-center p-3 bg-white rounded-lg hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-gray-900">
                    {locale === 'zh' ? '痛经症状评估' : 'Pain Assessment Tool'}
                  </div>
                  <div className="text-sm text-gray-600">
                    {locale === 'zh' ? '评估是否需要药物治疗' : 'Assess if medication is needed'}
                  </div>
                </div>
              </Link>
              
              <Link href={`/${locale}/scenario-solutions/emergency-kit`} className="flex items-center p-3 bg-white rounded-lg hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-gray-900">
                    {locale === 'zh' ? '应急处理方案' : 'Emergency Relief Kit'}
                  </div>
                  <div className="text-sm text-gray-600">
                    {locale === 'zh' ? '药物+非药物综合方案' : 'Combined medication & non-drug approaches'}
                  </div>
                </div>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}