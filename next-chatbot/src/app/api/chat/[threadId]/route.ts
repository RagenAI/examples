import { NextRequest } from 'next/server';

import { getMessageStream } from '@/lib/services';
import {
  ApiEvent,
  ApiMessageEvent,
  ApiDeltaEvent,
  chatMessageSchema,
} from '@/lib/types';

export const prepareApiSseMessage = (
  event: ApiEvent,
  data?: ApiMessageEvent | ApiDeltaEvent
) => {
  return `event: ${event}\ndata: ${JSON.stringify(data ?? {})}\n\n`;
};

export const parseSseString = (sseString: string) => {
  const lines = sseString.split('\n');
  const eventLine = lines[0].split(': ')[1];
  const dataLine = lines[1].split(': ')[1];

  return {
    event: eventLine,
    data: JSON.parse(dataLine) as ApiMessageEvent | ApiDeltaEvent | undefined,
  };
};

export const dynamic = 'force-dynamic';

const decoder = new TextDecoder('utf-8');

type Params = {
  params: { threadId: string };
};

export const POST = async (request: NextRequest, { params }: Params) => {
  const { threadId } = await params;

  const body = await request.json();
  const parsedBody = chatMessageSchema.parse(body);
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
