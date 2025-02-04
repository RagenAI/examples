'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { KeyboardEventHandler } from 'react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { AskQuestionDto, questionSchema } from './types';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { ChatMessageDto } from '@/lib/types';

type Props = {
  onSubmit: (data: ChatMessageDto) => void;
};

export function QuestionForm({ onSubmit }: Props) {
  const form = useForm<AskQuestionDto>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      question: '',
    },
  });

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.code === 'Enter') {
      form.trigger();
    }
  };

  const onFormSubmit: SubmitHandler<AskQuestionDto> = (data) => {
    form.reset();
    onSubmit({ content: data.question });
  };

  return (
    <div className="w-full space-y-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="question"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your question</FormLabel>
                <FormControl>
                  <Input
                    autoFocus={true}
                    placeholder="Type your question here"
                    onKeyDown={handleKeyDown}
                    disabled={form.formState.isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormDescription>This is example Next.js App</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex w-full justify-end">
            <Button type="submit">Send</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
