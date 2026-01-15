// 执行 node aqi-chengdu-calc.cjs 查看结果

// 数据来源 空气质量日历 https://www.aqi.in/cn/dashboard/china/sichuan/chengdu

// 🚀 开始计算 2021 至 2025 年的 AQI 平均值...
// 
// ✅ [2021] 读取成功: 包含 365 条有效数据，当年平均值: 100.17
// ✅ [2022] 读取成功: 包含 324 条有效数据，当年平均值: 105.43
// ✅ [2023] 读取成功: 包含 361 条有效数据，当年平均值: 95.59
// ✅ [2024] 读取成功: 包含 366 条有效数据，当年平均值: 83.29
// ✅ [2025] 读取成功: 包含 365 条有效数据，当年平均值: 89.07
// 
// ------------------------------
// 📊 统计结果:
//    总记录数: 1781
//    总数值和: 168223
//    平均值:   94.45
// ------------------------------

const fs = require('fs').promises;
const path = require('path');

// 配置 assets 文件夹路径
const ASSETS_DIR = path.join(__dirname, './');

async function calculateAverageAqi() {
  let totalSum = 0;
  let totalCount = 0;
  const startYear = 2021;
  const endYear = 2025;

  console.log(`🚀 开始计算 ${startYear} 至 ${endYear} 年的 AQI 平均值...\n`);

  for (let year = startYear; year <= endYear; year++) {
    // 假设文件后缀为 .json
    const fileName = `aqi-chengdu-${year}.json`;
    const filePath = path.join(ASSETS_DIR, fileName);

    try {
      // 读取文件
      const fileContent = await fs.readFile(filePath, 'utf-8');

      // 解析 JSON
      const jsonData = JSON.parse(fileContent);

      // 数据提取逻辑：
      // 兼容两种常见结构：
      // 1. 直接是数组: [{ value: 50 }, ...]
      // 2. 包裹在 data 字段中: { data: [{ value: 50 }, ...] }
      let dataList = [];
      if (Array.isArray(jsonData)) {
        dataList = jsonData;
      } else if (jsonData.data && Array.isArray(jsonData.data)) {
        dataList = jsonData.data;
      }

      let yearSum = 0;
      let yearCount = 0;

      // 遍历数据累加
      for (const item of dataList) {
        // 确保 value 存在且为有效数字
        // 这里对应你提到的 "data.value"
        if (item && typeof item.value === 'number') {
          yearSum += item.value;
          yearCount++;
        }
      }

      // 更新总数
      totalSum += yearSum;
      totalCount += yearCount;

      if (yearCount > 0) {
        const yearAverage = yearSum / yearCount;
        console.log(
          `✅ [${year}] 读取成功: 包含 ${yearCount} 条有效数据，当年平均值: ${yearAverage.toFixed(2)}`
        );
      } else {
        console.log(`✅ [${year}] 读取成功: 包含 ${yearCount} 条有效数据`);
      }
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.warn(`⚠️ [${year}] 文件未找到: ${fileName}`);
      } else if (error instanceof SyntaxError) {
        console.error(`❌ [${year}] JSON 格式错误: ${fileName}`);
      } else {
        console.error(`❌ [${year}] 读取出错: ${error.message}`);
      }
    }
  }

  console.log('\n' + '-'.repeat(30));

  if (totalCount === 0) {
    console.log('⚠️ 未找到任何有效数据，无法计算平均值。');
  } else {
    const average = totalSum / totalCount;
    console.log(`📊 统计结果:`);
    console.log(`   总记录数: ${totalCount}`);
    console.log(`   总数值和: ${totalSum}`);
    console.log(`   平均值:   ${average.toFixed(2)}`); // 保留两位小数
  }
  console.log('-'.repeat(30));
}

// 执行主函数
calculateAverageAqi();
