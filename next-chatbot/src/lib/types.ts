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

export type CreateMessageDto = {
  content: string;
};
