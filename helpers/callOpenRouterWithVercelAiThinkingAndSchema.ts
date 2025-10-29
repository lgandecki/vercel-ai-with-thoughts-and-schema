import { openrouter } from "@openrouter/ai-sdk-provider";
import { wrapLanguageModel, generateObject } from "ai";
import type z from "zod";
import { thinkingSchemaMiddleware } from "./thinkingSchemaMiddleware";



export const callOpenRouterWithVercelAiThinkingAndSchema = async <T>(
  prompt: string,
  zodSchema: z.ZodSchema<T>,
  model: string = "google/gemini-2.5-pro",
) => {
  const { object } = await generateObject({
    model: openrouter(model),
    schema: zodSchema,
    prompt: prompt,
  });

  return object as T;
};
