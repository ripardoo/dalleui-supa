import OpenAI from "https://deno.land/x/openai@v4.24.0/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "../_shared/cors.ts";

Deno.serve(async (req) => {
  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization")!;
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      { global: { headers: { Authorization: authHeader } } }
    );

    const { query, apiKey } = await req.json();
    const openai = new OpenAI({
      apiKey: apiKey,
    });

    // Documentation here: https://github.com/openai/openai-node
    const picture = await openai.images.generate({
      model: "dall-e-3",
      prompt: query,
      n: 1,
      size: "1024x1024",
    });
    const image_url = picture.data[0].url;

    const { data, error } = await supabase
      .from("prompts")
      .insert([{ user: apiKey, pic: image_url }])
      .select();

      console.log(data, error);

    return new Response(image_url, {
      headers: { "Content-Type": "text/plain" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
