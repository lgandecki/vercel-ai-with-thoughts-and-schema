import { generateObject } from "ai";
import type z from "zod";
import { anthropic } from "@ai-sdk/anthropic";



export const callAnthropicWithVercelAiThinkingAndSchema = async <T>(
  prompt: string,
  zodSchema: z.ZodSchema<T>,
  model: string = "claude-sonnet-4-5-20250929",
) => {
  const { object } = await generateObject({
    model:  anthropic(model),
    schema: zodSchema,
    prompt: prompt,
  });

  return object as T;
};
