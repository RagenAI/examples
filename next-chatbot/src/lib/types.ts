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

type ApiEvent =
  | 'init'
  | 'delta'
  | 'find_thread'
  | 'thread_found'
  | 'save_user_message'
  | 'user_message_saved'
  | 'init_lmm'
  | 'get_thread_messages'
  | 'add_thread_messages_to_lmm'
  | 'start_lmm'
  | 'lmm_completed'
  | 'save_assistant_response'
  | 'assistant_response_saved'
  | 'final_response'
  | 'close';

export type ApiMessageEvent = {
  id: string;
  content: string;
  role: MessageRole;
  created_at: string;
};

export type ApiDeltaEvent = {
  content: string;
};
