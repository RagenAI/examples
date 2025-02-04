'use server';

import { api } from '@/lib/api';
import { CreateMessageDto, MessageDto, ThreadDto } from '@/lib/types';

/**
 * This function sends user message, adds to chat and returns assistant response
 * @param threadId Thread['id']
 * @param data CreateMessageDto
 * @returns MessageDto
 */
export const createMessageAction = async (
  threadId: ThreadDto['id'],
  data: CreateMessageDto,
) => {
  try {
    const message = await api.post<MessageDto>(`/chat/${threadId}`, data);
    return message.data;
  } catch {
    console.log('Cannot create message');
  }
};
