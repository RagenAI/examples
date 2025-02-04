/**
 * It's artificial page to create a new thread and redirect user to thread messages
 */
import { logger } from '@/lib/logger';
import { createThread } from '@/lib/services';
import { redirect } from 'next/navigation';

export default async function CreatePage() {
  const thread = await createThread();
  if (thread) {
    logger.info(`Created new thread ${thread.id}`);
    redirect(`/threads/${thread.id}`);
  } else {
    logger.error('Cannot create new thread');
    throw new Error('Cannot create new thread');
  }
}
