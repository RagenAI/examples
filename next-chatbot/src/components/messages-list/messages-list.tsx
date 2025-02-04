import { MessageDto } from '@/lib/types';
import { Message } from '../message';
import { forwardRef } from 'react';

type Props = {
  data: MessageDto[];
};

export const MessagesList = forwardRef<HTMLDivElement, Props>(
  ({ data }, ref) => {
    return (
      <div ref={ref} className="flex flex-col space-y-4 overflow-y-auto">
        {data.map((elem) => (
          <Message key={elem.id} message={elem} />
        ))}
      </div>
    );
  },
);

MessagesList.displayName = 'ref(MessagesList)';
