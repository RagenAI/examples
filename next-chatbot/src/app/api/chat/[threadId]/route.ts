import { NextRequest } from 'next/server';

import { getMessageStream } from '@/lib/services';
import { chatMessageSchema } from '@/lib/types';

export const dynamic = 'force-dynamic';

type Params = {
  params: Promise<{ threadId: string }>;
};

export const POST = async (request: NextRequest, { params }: Params) => {
  const { threadId } = await params;

  const body = await request.json();
  const parsedBody = chatMessageSchema.parse(body);
  // uncomment for debug
  // const decoder = new TextDecoder('utf-8');

  return new Response(
    new ReadableStream({
      async start(controller) {
        const apiStream = await getMessageStream(threadId, parsedBody);

        if (!apiStream) {
          controller.close();
          return;
        }

        apiStream.on('data', (data: Buffer) => {
          // uncomment for
          // const message = parseSseString(decoder.decode(data)); // Decode the buffer to a string and then parse SSE event format to JSON
          // const messageEvent = message.event as ApiEvent;
          // const messageData = message.data;
          // console.log(message); // Log the decoded message

          // it's proxy from Ragen API to frontend app to not expose API key
          controller.enqueue(data);
        });

        apiStream.on('end', () => {
          console.log('stream done');
          controller.close();
        });

        apiStream.on('error', () => {
          console.error('stream error');
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
