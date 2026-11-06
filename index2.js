import "dotenv/config";
import express from 'express'
import { ChatGoogleGenerativeAI } from "@langchain/google-genai"
import { ChatPromptTemplate } from "@langchain/core/prompts"
import { StringOutputParser } from "@langchain/core/output_parsers";

const port = 3000
const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash",
  temperature: 0.7,
  maxRetries: 2,
})


const app = express()
// create prompt template
app.post('/user', async (req,res)=>{

  const Input = req.query.question 

   console.log(Input)

const prompt = ChatPromptTemplate.fromTemplate('you are a world clock please answer this question {input}, please do not answer the question that you dont know just say that oops i dont know' )

const parser = new StringOutputParser()

//console.log(await prompt.format({input:"Chicken"}))

const chain = prompt.pipe(model).pipe(parser)

const response = await chain.invoke({
    input:Input
})

//const response = await model.invoke("hello")
//const response = await model.batch(["hello","tell me a joke"])
//const response = await model.stream("Tell me a poem")
 res.send(response)

});

app.listen(port, () => {
  console.log("server started at", port);
});

