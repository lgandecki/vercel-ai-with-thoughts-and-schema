import type { LanguageModelV2Middleware } from "@ai-sdk/provider";

// based on https://github.com/vercel/ai/issues/9351 , with modificiations to actually make it work
export const thinkingSchemaMiddleware: LanguageModelV2Middleware = {
  transformParams: ({ params }) => {
    // Change forced tool choice to optional (Anthropic compatible)
    params.toolChoice = { type: "auto" };

    // Convert schema to optional tool
    if (params.responseFormat?.type === "json" && params.responseFormat.schema) {
      params.tools = [
        {
          type: "function",
          name: "json",
          description: "Respond with a structured JSON object matching the required schema.",
          inputSchema: params.responseFormat.schema,
        },
      ];

      params.responseFormat = { type: "text" };

      // Add instruction to use the tool
      params.prompt.push({
        role: "user",
        content: [
          {
            type: "text",
            text: "Please provide your answer using the json tool. Use extended thinking if needed to ensure accuracy.",
          },
        ],
        providerOptions: undefined,
      });
    }

    return Promise.resolve(params);
  },

  wrapGenerate: async ({ doGenerate }) => {
    const result = await doGenerate();

    // Extract tool call from content array and convert to text response
    if (result.content && result.content.length > 0) {
      const toolCallContent = result.content.find((item) => item.type === "tool-call" && item.toolName === "json");
      if (toolCallContent && toolCallContent.type === "tool-call") {
        // Parse the input string to get the actual JSON object
        const parsedInput =
          typeof toolCallContent.input === "string" ? JSON.parse(toolCallContent.input) : toolCallContent.input;

        // Replace content with text content containing the JSON
        result.content = [{ type: "text", text: JSON.stringify(parsedInput, null, 2) }];
      } else {
        try {
          const lastContent = result.content[result.content.length - 1];
          if (lastContent && lastContent.type === "text") {
            result.content = [
              {
                type: "text",
                text: lastContent.text.replace(/^```json\n/, "").replace(/\n```$/, ""),
              },
            ];
          } else {
            console.warn("Expected text content but got:", lastContent?.type);
          }
        } catch (e) {
          console.error("error", e);
        }
      }
    }

    return result;
  },
};
