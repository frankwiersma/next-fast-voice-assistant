import { z } from "zod";

// Use Zod to define MessageRole and Message
const MessageRoleSchema = z.enum(["system", "user", "assistant"]);

const MessageSchema = z.object({
  role: MessageRoleSchema,
  content: z.string(),
});

// Export types
export type MessageRole = z.infer<typeof MessageRoleSchema>;
export type Message = z.infer<typeof MessageSchema>;
