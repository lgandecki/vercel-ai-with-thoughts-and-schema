# vercel-ai-with-thoughts-and-schema

This repository showcases the solution to use Vercel AI with thinking and schema for Anthropic Claude , Kimi and Minimax models.
Seems like things work directly hitting Anthropic APIs, but not through OpenRouter yet.


## Run with bun
To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

## Run with node
To install dependencies:

```bash
pnpm install
```

To run:

```bash
tsx index.ts
```


## Possible errors (for lost googlers):

### Moonshot
```
Invalid request: response_format.json_schema is not a valid moonshot flavored json schema
path 'root': unsupported keywords: $schema 
```

### Claude through OpenRouter
```
No object generated: could not parse the response
Error message: Unexpected token is not valid JSON
```

### Minimax
```
NoObjectGeneratedError [AI_NoObjectGeneratedError]: No object generated: the model did not return a response.
```

### Claude through Anthropic directly seems to be working!
