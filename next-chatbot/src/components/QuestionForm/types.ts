import { z } from "zod";

export const questionSchema = z.object({
  question: z.string().min(3).max(50),
});

export type AskQuestionDto = z.infer<typeof questionSchema>;
