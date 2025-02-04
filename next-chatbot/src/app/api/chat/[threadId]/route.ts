import { NextRequest } from 'next/server';

import { getMessageStream } from '@/lib/services';
import { ApiEvent, chatMessageSchema } from '@/lib/types';
import { parseSseString, prepareApiSseMessage } from '@/lib/sse';

export const dynamic = 'force-dynamic';

type Params = {
  params: { threadId: string };
};

export const POST = async (request: NextRequest, { params }: Params) => {
  const { threadId } = await params;

  const body = await request.json();
  const parsedBody = chatMessageSchema.parse(body);
  const decoder = new TextDecoder('utf-8');
  const encoder = new TextEncoder();

  return new Response(
    new ReadableStream({
      async start(controller) {
        const apiStream = await getMessageStream(threadId, parsedBody);

        apiStream.on('data', (data: Buffer) => {
          const message = parseSseString(decoder.decode(data)); // Decode the buffer to a string and then parse SSE event format to JSON
          const messageEvent = message.event as ApiEvent;
          const messageData = message.data;

          // it's proxy from Ragen API to frontend app to not expose API key
          controller.enqueue(
            encoder.encode(prepareApiSseMessage(messageEvent, messageData))
          );
          console.log(message); // Log the decoded message
        });

        apiStream.on('end', () => {
          console.log('stream done');
          controller.close();
        });
      },
    }),
    {
      headers: {
        Connection: 'keep-alive',
        'Content-Encoding': 'none',
        'Cache-Control': 'no-cache, no-transform',
        'Content-Type': 'text/event-stream; charset=utf-8',
      },
    }
  );
};
