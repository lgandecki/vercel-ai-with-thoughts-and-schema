import { wrapLanguageModel, generateObject } from "ai";
import type z from "zod";
import { thinkingSchemaMiddleware } from "./thinkingSchemaMiddleware";
import { anthropic } from "@ai-sdk/anthropic";



export const callAnthropicWithVercelAiThinkingAndSchema = async <T>(
  prompt: string,
  zodSchema: z.ZodSchema<T>,
  model: string = "claude-sonnet-4-5-20250929",
) => {
  const { object } = await generateObject({
    model:  wrapLanguageModel({ model: anthropic(model), middleware: thinkingSchemaMiddleware }),
    schema: zodSchema,
    prompt: prompt,
    experimental_telemetry: { isEnabled: true, recordInputs: true, recordOutputs: true },
  });

  return object as T;
};
