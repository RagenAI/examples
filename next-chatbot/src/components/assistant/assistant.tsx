'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { MessagesList } from '../messages-list/messages-list';
import { QuestionForm } from '../question-form/question-form';
import { CreateMessageDto, MessageDto, MessageRole } from '@/lib/types';
import { createMessageAction } from './actions';

type Props = {
  threadId: string;
  messages: MessageDto[]; // initial list of chat messages
};

export function Assistant({ threadId, messages }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState<MessageDto[]>(messages);
  const messagesEndDivRef = useRef<HTMLDivElement>(null);

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
    scrollToBottom();

    const stream = connectToStream();

    return () => {
      stream.close();
    };
  }, []);

  const scrollToBottom = () =>
    messagesEndDivRef.current?.scrollIntoView({ behavior: 'smooth' });

  const handleCreateMessage = async (data: CreateMessageDto) => {
    setIsLoading(true);
    // this can be returned from API, simulate user message
    const userMessage: MessageDto = {
      id: uuidv4(),
      content: data.content,
      created_at: new Date().toISOString(),
      role: MessageRole.USER,
    };
    setChatMessages((prevMessages) => [...prevMessages, userMessage]);
    scrollToBottom();

    const message = await createMessageAction(threadId, data);
    if (message) {
      console.log({ message });
      setChatMessages((prevMessages) => [...prevMessages, message]);
      scrollToBottom();
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="flex-1 overflow-y-auto mx-6">
        <MessagesList data={chatMessages} />
        <div ref={messagesEndDivRef} />
      </div>

      <div className="flex flex-col m-4 mx-6">
        <div className="mb-2">
          <p>{isLoading && 'Loading...'}</p>
        </div>
        <QuestionForm onSubmit={handleCreateMessage} />
      </div>
    </>
  );
}
