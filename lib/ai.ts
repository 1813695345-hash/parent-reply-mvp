import { checkSafety } from './safety';

export interface GenerateOptions {
  prompt: string;
  temperature?: number;
}

export interface GenerateResult {
  reply: string;
  safetyWarning?: string;
}

export async function generateReply(options: GenerateOptions): Promise<GenerateResult> {
  const { prompt, temperature = 0.6 } = options;

  // Check safety on the prompt input side
  const safety = checkSafety(prompt);
  let safetyWarning: string | undefined;
  if (!safety.safe && safety.reason) {
    safetyWarning = safety.reason;
  }

  const apiKey = process.env.AI_API_KEY;
  const baseUrl = process.env.AI_BASE_URL || 'https://api.openai.com/v1';
  const model = process.env.AI_MODEL_NAME || 'gpt-4o-mini';

  if (!apiKey) {
    throw new Error('AI_API_KEY is not configured');
  }

  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: '你是一个最懂家长心思的文字助手。' },
        { role: 'user', content: prompt },
      ],
      temperature,
      max_tokens: 300,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => 'Unknown error');
    throw new Error(`AI API error: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content?.trim();

  if (!reply) {
    throw new Error('AI returned empty reply');
  }

  return { reply, safetyWarning };
}
