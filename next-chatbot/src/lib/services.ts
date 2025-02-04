import { api } from './api';
import { logger } from './logger';
import { CreateThreadDto, ThreadDto } from './types';

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
