'use client';

import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { MessagesList } from '../messages-list/messages-list';
import { QuestionForm } from '../question-form/question-form';
import {
  ApiEvent,
  ApiMessageEvent,
  ChatMessageDto,
  MessageDto,
  MessageRole,
} from '@/lib/types';
import { parseSseString } from '@/lib/sse';
import { ChatOutput } from '../chat-output';

type Props = {
  threadId: string;
  messages: MessageDto[]; // initial list of chat messages
};

export function Assistant({ threadId, messages }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [streamedMessage, setStreamedMessage] = useState('');
  // const [streamingStatus, setStreamingStatus] = useState<ApiEvent>('');
  const [chatMessages, setChatMessages] = useState<MessageDto[]>(messages);
  const messagesEndDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, []);

  const scrollToBottom = () =>
    messagesEndDivRef.current?.scrollIntoView({ behavior: 'smooth' });

  const handleCreateMessage = async (data: ChatMessageDto) => {
    setIsLoading(true);
    const userMessage: MessageDto = {
      id: uuidv4(),
      content: data.content,
      created_at: new Date().toISOString(),
      role: MessageRole.USER,
    };
    setChatMessages((prevMessages) => [...prevMessages, userMessage]);
    scrollToBottom();

    // INFO: this is sync operation - send message and wait for chat response
    // const message = await createMessageAction(threadId, data);
    // if (message) {
    //   console.log({ message });
    //   setChatMessages((prevMessages) => [...prevMessages, message]);
    //   scrollToBottom();
    // }

    const apiStream = await fetch(`/api/chat/${threadId}`, {
      method: 'POST',
      headers: {
        Accept: 'text/event-stream',
      },
      body: JSON.stringify(data),
    });
    if (!apiStream.body) {
      return;
    }

    const reader = apiStream.body
      .pipeThrough(new TextDecoderStream())
      .getReader();

    // Read the stream
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break; // Exit the loop if the stream is done
      }

      // Process the value (which is a string)
      // const message = parseSseString(decoder.decode(data)); // Decode the buffer to a string and then parse SSE event format to JSON
      // const messageEvent = message.event as ApiEvent;
      // const messageData = message.data;

      const message = parseSseString(value);
      // You can see message format in browser console
      console.log('on frontend: ', message);
      const messageEvent = message.event as ApiEvent;
      const messageData = message.data;

      if (messageEvent === 'delta' && messageData?.content) {
        setStreamedMessage(
          (prevMessage) => `${prevMessage}${messageData.content}`
        );
        scrollToBottom();
      } else if (messageEvent == 'final_response') {
        setStreamedMessage('');
        setChatMessages((prevMessages) => [
          ...prevMessages,
          messageData as ApiMessageEvent,
        ]);
        scrollToBottom();
      }
    }

    setIsLoading(false);
  };

  return (
    <>
      <div className="flex-1 overflow-y-auto mx-6">
        <MessagesList data={chatMessages} />
        {streamedMessage && <ChatOutput streamedMessage={streamedMessage} />}
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
