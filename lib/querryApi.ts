import openai from "./chatgpt"

const query = async (prompt: string, chatId:string, model:string)=>{
    const res= await openai.createCompletion({
        model,
        prompt,
        temperature:0.3,
        top_p:0.3,
        max_tokens:1000,
        frequency_penalty:0.5,
        presence_penalty:0.2,
    }).then(res=>res.data.choices[0].text)
    .catch(err=>`ChatGPT was unable to find an answer...(Error: ${err.message})`)
    return res;
}
export default query;