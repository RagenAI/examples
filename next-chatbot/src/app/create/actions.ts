"use server";

import { logger } from "@/lib/logger";
import { createThread } from "@/lib/services";
import { CreateThreadDto, ServerAction } from "@/lib/types";

export const createThreadAction = async (): Promise<
  ServerAction<CreateThreadDto>
> => {
  const thread = await createThread();
  if (thread) {
    logger.info(`Created new thread ${thread.id}`);
    return { success: true, payload: thread };
  } else {
    logger.error("Cannot create new thread");
    return { success: false };
  }
};
