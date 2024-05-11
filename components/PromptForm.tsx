"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { createClient } from "@/utils/supabase/client.ts";

const formSchema = z.object({
  apiKey: z.string().min(40).max(60),
  prompt: z.string().min(3).max(4000),
});

export default function ProfileForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      apiKey: "",
      prompt: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const supabase = createClient();
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const { apiKey, prompt } = values;
    const { data, error } = await supabase.functions.invoke("dalle-api-call", {
      body: { query: prompt, apiKey: apiKey, },
    });

    if (error) {
      console.error("Error:", error.message);
    } else {
      console.log("Data:", data);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="apiKey" // updated from "API Key"
          render={({ field }) => (
            <FormItem>
              <FormLabel>OpenAI api key</FormLabel>
              <FormControl>
                <Input placeholder="API key..." {...field} />
              </FormControl>
              <FormDescription>
                You can find your API key in the OpenAI dashboard
                (https://platform.openai.com/api-keys).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="prompt" // updated from "Prompt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prompt</FormLabel>
              <FormControl>
                <Input
                  placeholder="A little bunny with a hat in a field..."
                  {...field}
                />
              </FormControl>
              <FormDescription>Your dalle prompt.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
