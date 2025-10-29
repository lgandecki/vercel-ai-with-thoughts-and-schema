import "dotenv/config";
import { z } from "zod";
import { callOpenRouterWithVercelAiThinkingAndSchema } from "./helpers/callOpenRouterWithVercelAiThinkingAndSchema";
import { callAnthropicWithVercelAiThinkingAndSchema } from "./helpers/callAnthropicWithVercelAiThinkingAndSchema";

const runThroughOpenRouter = async (model: string) => {
  const prompt = "What is the capital of France?";
  const responseSchema = z.object({ capital: z.string() });
  const response = await callOpenRouterWithVercelAiThinkingAndSchema(prompt, responseSchema, model);
  console.log(`${model}:`,  response);
};

const modelsToTest = [
  "moonshotai/kimi-k2-0905:exacto",
  "anthropic/claude-haiku-4.5",
  "minimax/minimax-m2:free",
]

modelsToTest.forEach(async (model) => {
  await runThroughOpenRouter(model);
});


const runThroughAnthropic = async () => {
  const prompt = "What is the capital of France?";
  const responseSchema = z.object({ capital: z.string() });
  const model = "claude-haiku-4-5-20251001";
  const response = await callAnthropicWithVercelAiThinkingAndSchema(prompt, responseSchema, model);
  console.log(`${model}:`, response);
};

runThroughAnthropic();