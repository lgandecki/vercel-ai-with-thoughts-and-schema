import { openrouter } from "@openrouter/ai-sdk-provider";
import { wrapLanguageModel, generateObject, type LanguageModel } from "ai";
import type z from "zod";
import { thinkingSchemaMiddleware } from "./thinkingSchemaMiddleware";

export const callOpenRouterWithVercelAiThinkingAndSchema = async <T>(
  prompt: string,
  schema: z.ZodSchema<T>,
  modelName: string
) => {
  let model: LanguageModel = openrouter(modelName);
  if (["claude", "minimax", "kimi"].some((name) => modelName.includes(name))) {
    model = wrapLanguageModel({ model, middleware: thinkingSchemaMiddleware });
  }

  const { object } = await generateObject({
    model,
    schema,
    prompt,
  });

  return object as T;
};
