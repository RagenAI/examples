"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { AskQuestionDto, questionSchema } from "./types";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export function QuestionForm() {
  const form = useForm<AskQuestionDto>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      question: "",
    },
  });

  const onSubmit: SubmitHandler<AskQuestionDto> = (data) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(data);
  };

  return (
    <div className="w-full space-y-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="question"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your question</FormLabel>
                <FormControl>
                  <Textarea
                    autoFocus={true}
                    placeholder="Type your question here"
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
