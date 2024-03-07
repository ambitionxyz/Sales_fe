"use client";

import * as z from "zod";
import { TextInput } from "@mantine/core";
import { Plus } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignalr } from "@/components/providers/SignalrProvider";

const ChatInput = () => {
  const { instance, newMessage } = useSignalr();
  if (!instance) {
    return;
  }

  const formSchema = z.object({
    content: z.string().min(1),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = (value: z.infer<typeof formSchema>) => {
    newMessage(value.content);
    form.reset();
  };

  return (
    <div className=" p-4 pb-6 ">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-10 px-3 ">
          <Controller
            name="content"
            key="content"
            control={form.control}
            render={({ field }) => (
              <TextInput
                autoFocus={true}
                disabled={isLoading}
                variant="filled"
                key={field.name}
                size="md"
                placeholder={`Message conversation name
                `}
                className="!focus:border-none"
                {...field}
              />
            )}
          />
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
