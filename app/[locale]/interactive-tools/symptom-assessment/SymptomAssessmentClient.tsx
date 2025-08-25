'use client';

import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

type Locale = 'en' | 'zh';

interface Props {
  locale: Locale;
}

export default function SymptomAssessmentClient({ locale }: Props) {
  const t = useTranslations('interactiveTools');
  const [selectedSymptom, setSelectedSymptom] = useState('');
  const [painLevel, setPainLevel] = useState(5);
  const [isAssessing, setIsAssessing] = useState(false);
  const resultRef = useRef<HTMLDivElement | null>(null);
  const [result, setResult] = useState<null | {
    score: number;
    maxScore: number;
    percentage: number;
    severity: 'mild' | 'moderate' | 'severe' | 'emergency';
    summary: string;
    recommendations: Array<{
      id: string;
      title: string;
      description: string;
      timeframe: string;
      priority: 'high' | 'medium' | 'low';
      actionSteps: string[];
    }>;
  }>(null);
  
  const percent = ((painLevel - 1) / 9) * 100;
  const gradientFill = 'linear-gradient(90deg, #22c55e, #f59e0b, #ef4444)';
  const trackBase = 'linear-gradient(90deg, #e5e7eb 0 0)';

  const handleStartAssessment = () => {
    if (!selectedSymptom) {
      alert(locale === 'zh' ? '请先选择症状' : 'Please select a symptom first');
      return;
    }

    setIsAssessing(true);
    
    // 模拟评估过程
    setTimeout(() => {
      setIsAssessing(false);
      
      // 基本的评估逻辑
      const baseScore = painLevel * 10;
      const symptomMultiplier = selectedSymptom === 'severe-cramps' ? 1.5 : 1.0;
      const finalScore = Math.min(baseScore * symptomMultiplier, 100);
      
      let severity: 'mild' | 'moderate' | 'severe' | 'emergency';
      if (finalScore < 30) severity = 'mild';
      else if (finalScore < 60) severity = 'moderate';
      else if (finalScore < 85) severity = 'severe';
      else severity = 'emergency';

      setResult({
        score: Math.round(finalScore),
        maxScore: 100,
        percentage: Math.round(finalScore),
        severity,
        summary: locale === 'zh' 
          ? `根据您的症状描述，您的痛经程度为${severity === 'mild' ? '轻度' : severity === 'moderate' ? '中度' : severity === 'severe' ? '重度' : '紧急'}。`
          : `Based on your symptoms, your period pain level is ${severity}.`,
        recommendations: [
          {
            id: '1',
            title: locale === 'zh' ? '立即缓解建议' : 'Immediate Relief',
            description: locale === 'zh' ? '热敷和轻度运动' : 'Heat therapy and light exercise',
            timeframe: locale === 'zh' ? '立即执行' : 'Immediate',
            priority: 'high' as const,
            actionSteps: [
              locale === 'zh' ? '使用热水袋敷腹部' : 'Apply heat pad to abdomen',
              locale === 'zh' ? '进行轻度拉伸运动' : 'Do light stretching exercises'
            ]
          }
        ]
      });

      // 滚动到结果区域
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }, 2000);
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
            {locale === 'zh' ? '痛经症状评估工具' : 'Period Pain Symptom Assessment'}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {locale === 'zh' 
              ? '基于医学标准的专业评估，帮助您了解痛经程度并获得个性化建议'
              : 'Professional assessment based on medical standards to understand your pain level and get personalized recommendations'
            }
          </p>
        </div>

        {/* 评估表单 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            {locale === 'zh' ? '症状评估' : 'Symptom Assessment'}
          </h2>

          {/* 症状选择 */}
          <div className="mb-8">
            <label className="block text-lg font-medium text-gray-700 mb-4">
              {locale === 'zh' ? '请选择您的主要症状：' : 'Please select your main symptom:'}
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { id: 'mild-cramps', label: locale === 'zh' ? '轻度痛经' : 'Mild cramps' },
                { id: 'moderate-cramps', label: locale === 'zh' ? '中度痛经' : 'Moderate cramps' },
                { id: 'severe-cramps', label: locale === 'zh' ? '重度痛经' : 'Severe cramps' },
                { id: 'irregular-periods', label: locale === 'zh' ? '月经不规律' : 'Irregular periods' }
              ].map((symptom) => (
                <button
                  key={symptom.id}
                  onClick={() => setSelectedSymptom(symptom.id)}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    selectedSymptom === symptom.id
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-200 hover:border-purple-300 hover:bg-purple-25'
                  }`}
                >
                  {symptom.label}
                </button>
              ))}
            </div>
          </div>

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

          {/* 开始评估按钮 */}
          <button
            onClick={handleStartAssessment}
            disabled={isAssessing || !selectedSymptom}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-8 rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAssessing 
              ? (locale === 'zh' ? '评估中...' : 'Assessing...') 
              : (locale === 'zh' ? '开始评估' : 'Start Assessment')
            }
          </button>
        </div>

        {/* 评估结果 */}
        {result && (
          <div ref={resultRef} className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              {locale === 'zh' ? '评估结果' : 'Assessment Results'}
            </h2>
            
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-medium text-gray-700">
                  {locale === 'zh' ? '痛经程度评分' : 'Pain Level Score'}
                </span>
                <span className="text-2xl font-bold text-purple-600">
                  {result.score}/{result.maxScore}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${result.percentage}%` }}
                ></div>
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
                {locale === 'zh' ? '查看详细治疗指南' : 'View Detailed Treatment Guide'} →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}