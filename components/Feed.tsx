
export default function (){
    return ({error ? (
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
      )})
}