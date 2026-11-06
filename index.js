
import express from "express"
import path from "path";
import { fileURLToPath } from "url";

// __dirname doesn't exist in ES modules, so rebuild it
import dotenv from "dotenv"
import cors from "cors"
dotenv.config()
import { ChatGoogle } from "@langchain/google";
const app=express()
const port=process.env.PORT || 5000


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors())

const model=new ChatGoogle("gemini-2.5-flash") // gpt-6-luna  //gemini-2.5-flash gemma-4-31b-it

app.post('/api/submit',async (req,res)=>{
    const result=await model.invoke(req.body.question)
    console.log(result.text)
    res.send({received:result.text})
})
app.listen(port,()=>{
    console.log("server started at ",port)
})