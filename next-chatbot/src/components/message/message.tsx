import { format } from 'date-fns';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { MessageDto } from '@/lib/types';

type Props = {
  message: MessageDto;
};

export function Message({ message: { content, created_at, role } }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{role}</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <p>{content}</p>
      </CardContent>
      <CardFooter>
        <p>{format(created_at, 'dd.mm.yyyy HH:mm:ss')}</p>
      </CardFooter>
    </Card>
  );
}
