import { Suspense } from 'react';

import { Assistant } from '@/components/assistant';
import { getThreadMessages } from '@/lib/services';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ThreadPage({ params }: Props) {
  const { id } = await params;
  const messages = await getThreadMessages(id);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Assistant threadId={id} messages={messages} />
    </Suspense>
  );
}
