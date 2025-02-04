import Link from 'next/link';
import { format } from 'date-fns';

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ThreadDto } from '@/lib/types';

type Props = {
  thread: ThreadDto;
};

export function Thread({ thread: { id, created_at, source, title } }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Link
            href={`/threads/${id}`}
            className="text-blue-900 hover:text-blue-500"
          >
            {id} {title}
          </Link>
        </CardTitle>
        <CardDescription>
          Source: {source}, Created at:{' '}
          {format(created_at, 'dd.mm.yyyy HH:mm:ss')}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
