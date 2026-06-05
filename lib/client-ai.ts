import { GenerateRequest, GenerateResponse, GenerateError } from './types';

export async function generateReply(params: GenerateRequest): Promise<string> {
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });

  const data = (await response.json()) as GenerateResponse | GenerateError;

  if (!response.ok || 'error' in data) {
    const errorMessage = 'error' in data ? data.error : `请求失败: ${response.status}`;
    throw new Error(errorMessage);
  }

  return data.reply;
}
