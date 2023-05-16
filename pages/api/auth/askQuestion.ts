import admin from "firebase-admin"
import query from "@/lib/querryApi";
import type { NextApiRequest, NextApiResponse } from "next";
import { adminDb } from "@/firebaseAdmin";

type Data={
    answer: string
}

export default async function handler(
    req:NextApiRequest, res:NextApiResponse<Data>
){
    const {prompt, chatId, model, session}=req.body
    if(!prompt){
        res.status(404).json({answer:"Please enter a question..."})
    }
    if(!chatId) {
        res.status(404).json({answer:"Please provide a chat ID..."})
    }
    const response=await query(prompt, chatId, model)
    
 const message:Message={
    text: response || "ChatGPT can not find an answer for you...",
    createdAt:admin.firestore.Timestamp.now(),
    user:{
        _id:"ChatGPT",
        name:"ChatGPT",
        avatar:"https://cdn-1.webcatalog.io/catalog/chatgpt/chatgpt-icon-filled-256.png?v=1675593277570" }
 }
 await adminDb
 .collection("users").doc(session?.user?.email)
 .collection("chats").doc(chatId)
 .collection("messages").add(message)
    res.status(200).json({answer:message.text})
}