export type ServerAction<T> =
  | {
      success: true;
      payload: T;
    }
  | { success: false };

export type CreateMessageDto = {
  content: string;
};

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

export type CreateThreadDto = {
  id: ThreadDto['id'];
};

export type MessageDto = {
  id: string;
  content: string;
};
