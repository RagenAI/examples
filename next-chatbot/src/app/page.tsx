import { Thread } from '@/components/thread';
import { getAllThreads } from '@/lib/services';
import Link from 'next/link';

export default async function HomePage() {
  const threads = await getAllThreads();
  console.log({ threads });
  if (!threads) {
    return (
      <div className="mx-4">
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          No threads found. Try to{' '}
          <Link href="/create" className="text-blue-900 hover:text-blue-500">
            Create a new tread
          </Link>
        </p>
      </div>
    );
  } else {
    return (
      <div className="mx-4">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Threads
        </h2>
        {threads.map((elem) => (
          <Thread key={elem.id} thread={elem} />
        ))}
      </div>
    );
  }
}
