import PromptForm from "@/components/PromptForm";
import Image from "next/image";
import { createClient } from "@/utils/supabase/server.ts";

export default async function Index() {
  const supabase = createClient();

  let { data: prompts, error } = await supabase
    .from("prompts")
    .select("pic,id");

  return (
    <div className="flex flex-col w-dvw h-dvh">
      <nav className="sticky flex self-start text-white p-4 flex-row w-dvw justify-between items-center bg-slate-800">
        <h1 className="text-6xl pl-8">Pic BOT</h1>
        <h2 className="pr-8">Pick your model: Dalle-3</h2>
      </nav>
      <div className="h-full flex flex-row">
        <section className="flex-grow">
          <div className="p-8 flex flex-col justify-center items-center overflow-scroll">
            {error ? (
              <div>{error.message}</div>
            ) : (
              prompts.reverse().map((prompt, id) => (
                console.log(prompt,id),
                <div className="flex justify-center items-center" key={id}>
                  <Image
                    src={prompt.pic}
                    alt="Generated image"
                    width={1024}
                    height={1024}
                  />
                </div>
              ))
            )}
          </div>
        </section>
        <div className="pt-8">
            <PromptForm />
        </div>
      </div>
    </div>
  );
}
