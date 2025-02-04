import { MessageDto } from '@/lib/types';
import { Message } from '../message';

type Props = {
  data: MessageDto[];
};

export function MessagesList({ data }: Props) {
  return (
    <div className="flex flex-col space-y-4 overflow-y-auto">
      {data.map((elem) => (
        <Message key={elem.id} content={elem.content} />
      ))}
    </div>
  );
}
