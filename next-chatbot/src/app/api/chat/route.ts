import { NextRequest } from "next/server";

const parseSseMessage = (event: string, data: any) => {
  // SeeInitEvent
  return `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
};

export const POST = async (request: NextRequest) => {
  // return  NextResponse.json()

  const encoder = new TextEncoder();

  return new Response(
    new ReadableStream({
      async start(controller) {
        // event: event-name
        // data: custom-data

        // event: event-name2
        // data: custom-data2
        controller.enqueue(
          encoder.encode(parseSseMessage("init", { data: "init" }))
        );

        // let fullMessage = '';
        // let chainRunIds = [];
        // data
        // chat.message({ stream true })
        // {{BASE_URL}}/chat/61404ba2-d3cb-491c-bdb8-5247b5997000/stream

        // controller.enqueue(
        //   encoder.encode(
        //     encoder.encode(parseSseMessage("message", { data: "data" }))
        //   )
        // );

        controller.enqueue(parseSseMessage("close", { data: "close" }));
        controller.close();
      },
    }),
    {
      headers: {
        Connection: "keep-alive",
        "Content-Encoding": "none",
        "Cache-Control": "no-cache, no-transform",
        "Content-Type": "text/event-stream; charset=utf-8",
      },
    }
  );
};

export const GET = async (request: NextRequest) => {
  // return  NextResponse.json()

  const encoder = new TextEncoder();

  return new Response(
    new ReadableStream({
      async start(controller) {
        // event: event-name
        // data: custom-data

        // event: event-name2
        // data: custom-data2
        controller.enqueue(
          encoder.encode(
            parseSseMessage("init", { type: "init", payload: "init" })
          )
        );

        // let fullMessage = '';
        // let chainRunIds = [];
        // data
        // chat.message({ stream true })
        // {{BASE_URL}}/chat/61404ba2-d3cb-491c-bdb8-5247b5997000/stream

        // controller.enqueue(
        //   encoder.encode(
        //     encoder.encode(parseSseMessage("message", { data: "data" }))
        //   )
        // );

        controller.enqueue(
          encoder.encode(
            parseSseMessage("message", {
              type: "server-response",
              payload: { id: "qwerty", content: "one-two-three" },
            })
          )
        );

        controller.enqueue(
          parseSseMessage("close", { type: "finish", payload: "close" })
        );
        controller.close();
      },
    }),
    {
      headers: {
        Connection: "keep-alive",
        "Content-Encoding": "none",
        "Cache-Control": "no-cache, no-transform",
        "Content-Type": "text/event-stream; charset=utf-8",
      },
    }
  );
};
