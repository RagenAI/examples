import type { ApiDeltaEvent, ApiEvent, ApiMessageEvent } from './types';

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

  console.log({ dataLine });

  return {
    event: eventLine,
    data: JSON.parse(dataLine) as ApiMessageEvent | ApiDeltaEvent | undefined,
  };
};
