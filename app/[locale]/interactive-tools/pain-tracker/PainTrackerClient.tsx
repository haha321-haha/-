'use client';

import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

type Locale = 'en' | 'zh';

interface Props {
  locale: Locale;
}

export default function PainTrackerClient({ locale }: Props) {
  const t = useTranslations('interactiveTools');
  const [painLevel, setPainLevel] = useState(5);
  const [painLocation, setPainLocation] = useState('');
  const [painType, setPainType] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [result, setResult] = useState<null | {
    score: number;
    severity: 'mild' | 'moderate' | 'severe' | 'emergency';
    summary: string;
    locationLabel: string;
    typeLabel: string;
    recommendations: Array<{ 
      id: string; 
      title: string; 
      description: string; 
      timeframe: string; 
      priority: 'high' | 'medium' | 'low'; 
      actionSteps: string[] 
    }>
  }>(null);
  
  const resultRef = useRef<HTMLDivElement | null>(null);
  const percent = ((painLevel - 1) / 9) * 100;

  const locations = [
    { value: 'lower-abdomen', label: locale === 'zh' ? '下腹部' : 'Lower Abdomen' },
    { value: 'lower-back', label: locale === 'zh' ? '腰部' : 'Lower Back' },
    { value: 'upper-abdomen', label: locale === 'zh' ? '上腹部' : 'Upper Abdomen' },
    { value: 'pelvic', label: locale === 'zh' ? '盆腔' : 'Pelvic Area' }
  ];

  const painTypes = [
    { value: 'cramping', label: locale === 'zh' ? '痉挛性疼痛' : 'Cramping Pain' },
    { value: 'sharp', label: locale === 'zh' ? '尖锐疼痛' : 'Sharp Pain' },
    { value: 'dull', label: locale === 'zh' ? '钝痛' : 'Dull Pain' },
    { value: 'throbbing', label: locale === 'zh' ? '跳动性疼痛' : 'Throbbing Pain' }
  ];

  const handleRecordPain = async () => {
    if (!painLocation || !painType) {
      alert(locale === 'zh' ? '请填写完整的疼痛信息' : 'Please fill in complete pain information');
      return;
    }

    setIsRecording(true);
    
    // 模拟记录过程
    setTimeout(() => {
      setIsRecording(false);
      
      // 将存储值映射为已翻译的标签
      const locationLabel = locations.find(l => l.value === painLocation)?.label || painLocation;
      const typeLabel = painTypes.find(ti => ti.value === painType)?.label || painType;

      // 计算严重程度
      const severity: 'mild' | 'moderate' | 'severe' | 'emergency' =
        painLevel >= 9 ? 'emergency' : painLevel >= 7 ? 'severe' : painLevel >= 4 ? 'moderate' : 'mild';

      setResult({
        score: painLevel,
        severity,
        summary: locale === 'zh' 
          ? `您记录的疼痛程度为${painLevel}/10，属于${severity === 'mild' ? '轻度' : severity === 'moderate' ? '中度' : severity === 'severe' ? '重度' : '紧急'}疼痛。`
          : `Your recorded pain level is ${painLevel}/10, classified as ${severity} pain.`,
        locationLabel,
        typeLabel,
        recommendations: [
          {
            id: '1',
            title: locale === 'zh' ? '立即缓解建议' : 'Immediate Relief',
            description: locale === 'zh' ? '基于您的疼痛类型和位置的建议' : 'Recommendations based on your pain type and location',
            timeframe: locale === 'zh' ? '立即执行' : 'Immediate',
            priority: 'high' as const,
            actionSteps: [
              locale === 'zh' ? '使用热敷缓解疼痛' : 'Apply heat therapy for pain relief',
              locale === 'zh' ? '记录疼痛变化' : 'Track pain changes'
            ]
          }
        ]
      });

      // 滚动到结果区域
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        
        {/* 返回导航 */}
        <div className="mb-8">
          <Link 
            href={`/${locale}/interactive-tools`}
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium transition-colors"
          >
            ← {locale === 'zh' ? '返回工具列表' : 'Back to Tools'}
          </Link>
        </div>

        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {locale === 'zh' ? '痛经追踪工具' : 'Period Pain Tracker'}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {locale === 'zh' 
              ? '记录和追踪您的痛经症状，帮助您更好地了解疼痛模式'
              : 'Record and track your period pain symptoms to better understand your pain patterns'
            }
          </p>
        </div>

        {/* 疼痛记录表单 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            {locale === 'zh' ? '记录疼痛信息' : 'Record Pain Information'}
          </h2>

          {/* 疼痛程度滑块 */}
          <div className="mb-8">
            <label className="block text-lg font-medium text-gray-700 mb-4">
              {locale === 'zh' ? `疼痛程度：${painLevel}/10` : `Pain Level: ${painLevel}/10`}
            </label>
            <div className="relative">
              <input
                type="range"
                min="1"
                max="10"
                value={painLevel}
                onChange={(e) => setPainLevel(Number(e.target.value))}
                className="w-full h-3 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #22c55e 0%, #f59e0b 50%, #ef4444 100%)`
                }}
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>{locale === 'zh' ? '无痛' : 'No pain'}</span>
                <span>{locale === 'zh' ? '极痛' : 'Extreme pain'}</span>
              </div>
            </div>
          </div>

          {/* 疼痛位置选择 */}
          <div className="mb-8">
            <label className="block text-lg font-medium text-gray-700 mb-4">
              {locale === 'zh' ? '疼痛位置：' : 'Pain Location:'}
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {locations.map((location) => (
                <button
                  key={location.value}
                  onClick={() => setPainLocation(location.value)}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    painLocation === location.value
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-200 hover:border-purple-300 hover:bg-purple-25'
                  }`}
                >
                  {location.label}
                </button>
              ))}
            </div>
          </div>

          {/* 疼痛类型选择 */}
          <div className="mb-8">
            <label className="block text-lg font-medium text-gray-700 mb-4">
              {locale === 'zh' ? '疼痛类型：' : 'Pain Type:'}
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {painTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setPainType(type.value)}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    painType === type.value
                      ? 'border-pink-500 bg-pink-50 text-pink-700'
                      : 'border-gray-200 hover:border-pink-300 hover:bg-pink-25'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* 记录按钮 */}
          <button
            onClick={handleRecordPain}
            disabled={isRecording || !painLocation || !painType}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-8 rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRecording 
              ? (locale === 'zh' ? '记录中...' : 'Recording...') 
              : (locale === 'zh' ? '记录疼痛' : 'Record Pain')
            }
          </button>
        </div>

        {/* 记录结果 */}
        {result && (
          <div ref={resultRef} className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              {locale === 'zh' ? '疼痛记录' : 'Pain Record'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {result.score}/10
                </div>
                <div className="text-gray-600">
                  {locale === 'zh' ? '疼痛程度' : 'Pain Level'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900 mb-2">
                  {result.locationLabel}
                </div>
                <div className="text-gray-600">
                  {locale === 'zh' ? '疼痛位置' : 'Pain Location'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900 mb-2">
                  {result.typeLabel}
                </div>
                <div className="text-gray-600">
                  {locale === 'zh' ? '疼痛类型' : 'Pain Type'}
                </div>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-lg text-gray-700">{result.summary}</p>
            </div>

            <div className="space-y-4">
              {result.recommendations.map((rec) => (
                <div key={rec.id} className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{rec.title}</h3>
                  <p className="text-gray-600 mb-3">{rec.description}</p>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {rec.actionSteps.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link
                href={`/${locale}/articles/pain-management`}
                className="inline-flex items-center bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
              >
                {locale === 'zh' ? '查看治疗建议' : 'View Treatment Recommendations'} →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}