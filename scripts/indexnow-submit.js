#!/usr/bin/env node

/**
 * IndexNow跨平台提交脚本
 * 支持Windows、macOS、Linux环境
 */

const https = require('https');

// IndexNow配置
const INDEXNOW_CONFIG = {
  key: '49c6581aaa713a83b14b2d47022e79b6',
  host: 'www.periodhub.health',
  keyLocation: 'https://www.periodhub.health/.well-known/49c6581aaa713a83b14b2d47022e79b6.txt'
};

// 要提交的URL列表
const URLS_TO_SUBMIT = [
  'https://www.periodhub.health/zh',
  'https://www.periodhub.health/zh/articles/heat-therapy-complete-guide',
  'https://www.periodhub.health/zh/articles/menstrual-pain-medical-guide',
  'https://www.periodhub.health/zh/articles/5-minute-period-pain-relief',
  'https://www.periodhub.health/zh/articles/nsaid-menstrual-pain-professional-guide',
  'https://www.periodhub.health/zh/immediate-relief',
  'https://www.periodhub.health/zh/downloads',
  'https://www.periodhub.health/zh/scenario-solutions/office',
  'https://www.periodhub.health/zh/scenario-solutions/commute',
  'https://www.periodhub.health/zh/interactive-tools/symptom-assessment',
  'https://www.periodhub.health/zh/interactive-tools/pain-tracker',
  'https://www.periodhub.health/zh/articles/pain-management/medication-guide',
  'https://www.periodhub.health/zh/teen-health',
  'https://www.periodhub.health/zh/scenario-solutions/sleep',
  'https://www.periodhub.health/zh/scenario-solutions/social',
  'https://www.periodhub.health/zh/interactive-tools',
  'https://www.periodhub.health/zh/privacy-policy',
  'https://www.periodhub.health/zh/articles/period-friendly-recipes',
  'https://www.periodhub.health/zh/articles/global-traditional-menstrual-pain-relief',
  'https://www.periodhub.health/zh/articles/menstrual-pain-vs-other-abdominal-pain-guide',
  'https://www.periodhub.health/zh/articles/anti-inflammatory-diet-period-pain',
  'https://www.periodhub.health/zh/articles/magnesium-gut-health-comprehensive-guide',
  'https://www.periodhub.health/zh/articles/pain-complications-management',
  'https://www.periodhub.health/zh/articles/iud-comprehensive-guide',
  'https://www.periodhub.health/zh/articles/evidence-based-pain-guide',
  'https://www.periodhub.health/zh/articles/essential-oils-aromatherapy-menstrual-pain-guide',
  'https://www.periodhub.health/zh/articles/personal-health-profile',
  'https://www.periodhub.health/zh/articles/anti-inflammatory-diet-guide',
  'https://www.periodhub.health/zh/articles/long-term-healthy-lifestyle-guide',
  'https://www.periodhub.health/zh/articles/health-tracking-and-analysis',
  'https://www.periodhub.health/zh/articles/sustainable-health-management'
];

/**
 * 提交URL到IndexNow
 */
function submitToIndexNow(urls) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      host: INDEXNOW_CONFIG.host,
      key: INDEXNOW_CONFIG.key,
      keyLocation: INDEXNOW_CONFIG.keyLocation,
      urlList: urls
    });

    const options = {
      hostname: 'api.indexnow.org',
      port: 443,
      path: '/indexnow',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        'User-Agent': 'PeriodHub-Health-IndexNow/1.0'
      }
    };

    console.log('📤 正在提交到IndexNow...');
    console.log(`🔑 使用密钥: ${INDEXNOW_CONFIG.key}`);
    console.log(`📊 提交URL数量: ${urls.length}`);

    const req = https.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          console.log(`✅ 提交成功! 状态码: ${res.statusCode}`);
          resolve({
            status: res.statusCode,
            response: data
          });
        } else {
          console.log(`❌ 提交失败! 状态码: ${res.statusCode}`);
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', (error) => {
      console.error('❌ 请求错误:', error.message);
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}

/**
 * 主函数
 */
async function main() {
  try {
    console.log('🚀 开始IndexNow自动提交...');
    console.log(`🌐 目标网站: ${INDEXNOW_CONFIG.host}`);
    console.log(`🔑 密钥文件: ${INDEXNOW_CONFIG.keyLocation}`);
    console.log('');

    // 分批提交（IndexNow建议每批最多10,000个URL）
    const batchSize = 10000;
    const batches = [];
    for (let i = 0; i < URLS_TO_SUBMIT.length; i += batchSize) {
      batches.push(URLS_TO_SUBMIT.slice(i, i + batchSize));
    }

    console.log(`📦 分为 ${batches.length} 批提交`);

    for (let i = 0; i < batches.length; i++) {
      const batch = batches[i];
      console.log(`\n📤 提交第 ${i + 1} 批 (${batch.length} 个URL)`);

      try {
        const result = await submitToIndexNow(batch);
        console.log(`✅ 第 ${i + 1} 批提交成功`);
        
        // 批次间延迟（避免过于频繁的请求）
        if (i < batches.length - 1) {
          console.log('⏳ 等待2秒后提交下一批...');
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      } catch (error) {
        console.error(`❌ 第 ${i + 1} 批提交失败:`, error.message);
        // 继续提交下一批，不中断整个流程
      }
    }

    console.log('\n🎉 IndexNow自动提交完成！');
    console.log('📈 搜索引擎将加速索引这些页面');
    console.log('⏰ 预计1-3天内看到索引效果');
    console.log('\n🔍 验证步骤:');
    console.log(`1. 检查密钥文件: curl -s ${INDEXNOW_CONFIG.keyLocation}`);
    console.log('2. 监控Bing Webmaster Tools状态变化');
    console.log('3. 观察搜索引擎索引速度改善');

  } catch (error) {
    console.error('💥 执行失败:', error.message);
    process.exit(1);
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { submitToIndexNow, INDEXNOW_CONFIG };
