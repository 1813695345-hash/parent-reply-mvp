import { NextRequest, NextResponse } from 'next/server';
import { generateReply } from '@/lib/ai';
import { buildPrompt } from '@/lib/prompt';
import { GenerateRequest } from '@/lib/types';

const RATE_LIMIT_MAP = new Map<string, { count: number; date: string }>();
const MAX_DAILY = 10;

function getClientIP(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return 'unknown';
}

function checkRateLimit(ip: string): boolean {
  const today = new Date().toISOString().slice(0, 10);
  const record = RATE_LIMIT_MAP.get(ip);

  if (!record || record.date !== today) {
    RATE_LIMIT_MAP.set(ip, { count: 1, date: today });
    return true;
  }

  if (record.count >= MAX_DAILY) {
    return false;
  }

  record.count += 1;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as GenerateRequest;

    if (body.action !== 'retry') {
      const ip = getClientIP(req);

      if (!checkRateLimit(ip)) {
        return NextResponse.json(
          { error: '今日生成次数已达上限（10次），请明天再来。' },
          { status: 429 }
        );
      }
    }

    const { scene, tone, input, action, lastReply, inputType } = body;

    if (!scene || !tone || !input || !action) {
      return NextResponse.json(
        { error: '缺少必要参数：scene, tone, input, action' },
        { status: 400 }
      );
    }

    if (input.length > 500) {
      return NextResponse.json(
        { error: '输入内容过长，请精简到500字以内。' },
        { status: 400 }
      );
    }

    const prompt = buildPrompt(scene, tone, input, action, lastReply, inputType);
    const result = await generateReply({ prompt, temperature: 0.6 });

    return NextResponse.json({ reply: result.reply });
  } catch (error) {
    const message = error instanceof Error ? error.message : '生成失败，请稍后重试';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
