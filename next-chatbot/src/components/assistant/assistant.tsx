'use client';

import { api } from '@/lib/api';
import { MessagesList } from '../messages-list/messages-list';
import { QuestionForm } from '../question-form/question-form';
import { useEffect, useState } from 'react';
import { MessageDto } from '@/lib/types';

type Props = {
  threadId: string;
  messages: MessageDto[]; // initial list of chat messages
};

export function Assistant({ threadId, messages }: Props) {
  const [chatMessages, setChatMessages] = useState<MessageDto[]>(messages);

  const connectToStream = () => {
    // const url = '';

    const eventSource = new EventSource('/api/chat');

    // init
    // message
    // close

    eventSource.addEventListener('init', () => {
      console.log('init');
    });

    eventSource.addEventListener('message', () => {
      // const eventMessage = JSON.parse(event.data);
      // console.log('eventMessage', eventMessage.type, eventMessage.payload);
      // setChatMessages((prevMessages) => [eventMessage.payload]);
    });

    eventSource.addEventListener('close', () => {
      eventSource.close();
    });

    eventSource.addEventListener('error', () => {
      eventSource.close();
    });

    return eventSource;
  };

  useEffect(() => {
    const stream = connectToStream();

    return () => {
      stream.close();
    };
  }, []);

  const handleCreateMessage = async (data: CreateMessageDto) => {
    // FIXME: remove to backend
    const response = await api.post(
      '/chat/61404ba2-d3cb-491c-bdb8-5247b5997000',
      data,
    );

    // const response = await createMessage(data);
    console.log({ response });
  };

  return (
    <>
      <div className="flex-1 overflow-y-auto mx-6">
        <MessagesList data={chatMessages} />
      </div>

      <div className="flex m-4 mx-6">
        <QuestionForm onSubmit={handleCreateMessage} />
      </div>
    </>
  );
}
