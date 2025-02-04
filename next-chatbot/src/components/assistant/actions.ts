"use server";

import { api, CreateMessageDto } from "@/lib/api";

export const createMessage = async (data: CreateMessageDto) => {
  return api.post("/chat/61404ba2-d3cb-491c-bdb8-5247b5997000", data);
};
