import { z } from 'zod';

export type ServerAction<T> =
  | {
      success: true;
      payload: T;
    }
  | { success: false };

export type ThreadDto = {
  id: string;
  title: string | null;
  source: ThreadSource;
  created_at: string;
};

export enum ThreadSource {
  API = 'API',
  UI = 'UI',
}

export enum MessageRole {
  USER = 'USER',
  ASSISTANT = 'ASSISTANT',
}

export type CreateThreadDto = {
  id: ThreadDto['id'];
};

export type MessageDto = {
  id: string;
  content: string;
  role: MessageRole;
  created_at: string;
};


export const chatMessageSchema = z.object({
  content: z.string().min(3).max(50),
});

export type ChatMessageDto = z.infer<typeof chatMessageSchema>;

export type ApiEvent = 'init' | 'delta' | 'response' | 'end';

export type ApiMessageEvent = {
  id: string;
  content: string;
  role: MessageRole;
  created_at: string;
};

export type ApiDeltaEvent = {
  content: string;
};