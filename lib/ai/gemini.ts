import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';

if (!process.env.GOOGLE_GEMINI_API_KEY) {
  throw new Error('GOOGLE_GEMINI_API_KEY is not set in environment variables');
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);

/**
 * Get Gemini Pro model for text generation
 */
export function getGeminiProModel(): GenerativeModel {
  return genAI.getGenerativeModel({ model: 'gemini-pro' });
}

/**
 * Get Gemini Pro Vision model for multimodal tasks
 */
export function getGeminiProVisionModel(): GenerativeModel {
  return genAI.getGenerativeModel({ model: 'gemini-pro-vision' });
}

/**
 * Get Gemini 1.5 Pro model (latest, most capable)
 */
export function getGemini15ProModel(): GenerativeModel {
  return genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
}

/**
 * Get Gemini 1.5 Flash model (fast, efficient)
 */
export function getGemini15FlashModel(): GenerativeModel {
  return genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
}

/**
 * Generate content using Gemini
 */
export async function generateContent(prompt: string, modelType: 'pro' | 'flash' | '1.5-pro' = 'flash') {
  const model = modelType === '1.5-pro'
    ? getGemini15ProModel()
    : modelType === 'flash'
    ? getGemini15FlashModel()
    : getGeminiProModel();

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

/**
 * Generate structured JSON output using Gemini
 */
export async function generateStructuredContent<T>(
  prompt: string,
  schema: string,
  modelType: 'pro' | 'flash' | '1.5-pro' = 'flash'
): Promise<T> {
  const fullPrompt = `${prompt}\n\nRespond with valid JSON matching this schema:\n${schema}\n\nJSON response:`;
  const responseText = await generateContent(fullPrompt, modelType);

  // Extract JSON from response (handle code blocks)
  const jsonMatch = responseText.match(/```json\n?([\s\S]*?)\n?```/) ||
                    responseText.match(/\{[\s\S]*\}/);

  if (!jsonMatch) {
    throw new Error('No valid JSON found in response');
  }

  const jsonText = jsonMatch[1] || jsonMatch[0];
  return JSON.parse(jsonText) as T;
}

/**
 * Stream content generation
 */
export async function* streamContent(prompt: string, modelType: 'pro' | 'flash' | '1.5-pro' = 'flash') {
  const model = modelType === '1.5-pro'
    ? getGemini15ProModel()
    : modelType === 'flash'
    ? getGemini15FlashModel()
    : getGeminiProModel();

  const result = await model.generateContentStream(prompt);

  for await (const chunk of result.stream) {
    const chunkText = chunk.text();
    yield chunkText;
  }
}
