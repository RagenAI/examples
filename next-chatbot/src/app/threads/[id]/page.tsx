import { Assistant } from '@/components/assistant';

type Props = {
  params: {
    id: string;
  };
};

export default function ThreadPage({ params: { id } }: Props) {
  return <Assistant threadId={id} />;
}
