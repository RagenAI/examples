import { api } from './api';
import { logger } from './logger';
import {
  ChatMessageDto,
  CreateThreadDto,
  MessageDto,
  ThreadDto,
} from './types';

export const createThread = async () => {
  try {
    const result = await api.post<CreateThreadDto>('/threads');
    return result.data;
  } catch (err) {
    logger.error({ err }, 'Cannot create thread');
    return null;
  }
};

export const getAllThreads = async () => {
  try {
    const result = await api.get<ThreadDto[]>('/threads');
    return result.data;
  } catch (err) {
    logger.error({ err }, 'Cannot get list of threads');
    return [];
  }
};

export const getThreadMessages = async (id: ThreadDto['id']) => {
  try {
    const result = await api.get<MessageDto[]>(`/chat/${id}`);
    return result.data;
  } catch (err) {
    logger.error({ err }, 'Cannot get thread messages');
    return [];
  }
};

export const getMessageStream = async (
  id: ThreadDto['id'],
  data: ChatMessageDto
) => {
  // fetch version:
  // const apiStream = await fetch(
  //   `https://api.ragen.io/v1/chat/${threadId}/stream`,
  //   {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'text/event-stream',
  //       'x-api-key': process.env.RAGEN_API_KEY,
  //     },
  //     body: JSON.stringify(data),
  //   }
  // );
  // if (!apiStream.body) {
  //   return;
  // }

  // const reader = apiStream.body
  //   .pipeThrough(new TextDecoderStream())
  //   .getReader();

  try {
    const result = await api.post(`/chat/${id}/stream`, data, {
      responseType: 'stream',
    });
    return result.data;
  } catch (err) {
    logger.error({ err }, 'Cannot get thread messages');
    return null;
  }
};
