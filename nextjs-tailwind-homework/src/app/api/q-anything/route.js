import { NextResponse } from 'next/server';

export async function POST(request) {
  const { question } = await request.json();

  // 从环境变量中获取 API URL 和 Key，这是推荐的做法
  const apiUrl = process.env.QANYTHING_API_URL;
  const apiKey = process.env.QANYTHING_API_KEY;

  if (!apiUrl || !apiKey) {
    return NextResponse.json(
      { error: 'API 配置不完整' },
      { status: 500 }
    );
  }

  try {
    // 这里是调用 QAnything API 的示例，您需要根据其真实文档进行调整
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ query: question }), // API 的 body 结构可能不同
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`QAnything API 错误: ${errorData}`);
    }

    const data = await response.json();

    // 假设返回的数据结构是 { "result": "..." }，您需要根据实际情况调整
    return NextResponse.json({ answer: data.result });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: '调用 QAnything 服务失败' },
      { status: 500 }
    );
  }
}