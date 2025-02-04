import { Assistant } from '@/components/assistant';
import { getThreadMessages } from '@/lib/services';

type Props = {
  params: {
    id: string;
  };
};

export default async function ThreadPage({ params }: Props) {
  const { id } = await params;
  const messages = await getThreadMessages(id);

  return <Assistant threadId={id} messages={messages} />;
}
