const PHONE_REGEX = /\b1[3-9]\d{9}\b/g;

const ADDRESS_KEYWORDS = [
  '省', '市', '区', '县', '乡', '镇', '村',
  '路', '街', '巷', '号', '栋', '单元', '室',
  '小区', '社区', '街道', '居委会', '村委员会',
  '号楼', '幢', '弄', '胡同',
];

export function detectSensitive(input: string): { hasSensitive: boolean; keywords: string[] } {
  const keywords: string[] = [];

  const phoneMatches = input.match(PHONE_REGEX);
  if (phoneMatches) {
    keywords.push(...phoneMatches);
  }

  for (const kw of ADDRESS_KEYWORDS) {
    if (input.includes(kw)) {
      keywords.push(kw);
    }
  }

  const unique = Array.from(new Set(keywords));
  return {
    hasSensitive: unique.length > 0,
    keywords: unique,
  };
}

export function checkSafety(input: string): { safe: boolean; reason?: string } {
  const { hasSensitive, keywords } = detectSensitive(input);
  if (hasSensitive) {
    return {
      safe: false,
      reason: `检测到敏感信息（${keywords.join('、')}），请勿输入手机号或详细地址。`,
    };
  }
  return { safe: true };
}
