import { openrouter } from "@openrouter/ai-sdk-provider";
import { wrapLanguageModel, generateObject } from "ai";
import type z from "zod";
import { thinkingSchemaMiddleware } from "./thinkingSchemaMiddleware";



export const callOpenRouterWithVercelAiThinkingAndSchema = async <T>(
  prompt: string,
  zodSchema: z.ZodSchema<T>,
  model: string = "google/gemini-2.5-pro",
) => {
  const claudeModel = wrapLanguageModel({ model: openrouter(model), middleware: thinkingSchemaMiddleware });
  const { object } = await generateObject({
    model:
      model.includes("claude") || model.includes("minimax") || model.includes("kimi") ? claudeModel : openrouter(model),
    schema: zodSchema,
    prompt: prompt,
    experimental_telemetry: { isEnabled: true, recordInputs: true, recordOutputs: true },
  });

  return object as T;
};
