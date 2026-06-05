import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { mode, scene, userInput } = await req.json();

    if (!userInput || userInput.trim().length === 0) {
      return NextResponse.json({ error: '输入内容不能为空' }, { status: 400 });
    }

    let systemPrompt = '';
    let userPrompt = '';

    if (mode === 'scenario') {
      systemPrompt = '你是一位专业的教育沟通顾问，擅长帮助家长与老师进行高情商沟通。请分析用户描述的场景，并提供2-3个不同风格的回复选项。';
      userPrompt = `场景描述：${userInput}

请按以下格式回复：
【场景分析】
（简要分析这个情况的敏感点和注意事项，1-2句话）

【可选回复】
1. 温和提醒版：
（语气最软，适合试探性沟通，具体可操作）

2. 标准沟通版：
（中性语气，适合正常交流，具体可操作）

3. 正式交涉版：
（语气较重，适合原则性问题，具体可操作）

要求：每个版本都要具体、有针对性，不要泛泛而谈。减少对立感，保护孩子利益。`;
    } else if (mode === 'polish') {
      systemPrompt = '你是一位专业的教育沟通顾问，擅长优化家长与老师的沟通表达。请保留用户原意，优化语气和表达方式。';
      userPrompt = `原文：${userInput}

请按以下格式回复：
【润色后】
（优化后的版本，要求：温和、理性、有建设性，减少对立感）

【修改说明】
• （具体修改点1，如"去掉了'偏见'等对抗性词汇"）
• （具体修改点2，如"把反问句改成陈述句"）
• （具体修改点3，如"增加了感谢和合作意愿"）`;
    } else {
      return NextResponse.json({ error: '不支持的mode' }, { status: 400 });
    }

    const response = await fetch(process.env.AI_BASE_URL + '/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.AI_API_KEY}`
      },
      body: JSON.stringify({
        model: process.env.AI_MODEL_NAME,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('DeepSeek API error:', errorData);
      return NextResponse.json({ error: 'AI服务暂时不可用，请稍后重试' }, { status: 503 });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      return NextResponse.json({ error: 'AI返回内容为空' }, { status: 500 });
    }

    return NextResponse.json({ content, mode });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: '服务器内部错误' }, { status: 500 });
  }
}
