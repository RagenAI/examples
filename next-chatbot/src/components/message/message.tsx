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
        <CardDescription>
          {role} {format(created_at, 'dd.MM.yyyy HH:mm:ss')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{content}</p>
      </CardContent>
    </Card>
  );
}
