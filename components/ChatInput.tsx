"use client"
import { db } from "@/firebase";
import { PaperAirplaneIcon, MicrophoneIcon,StopIcon,ArrowPathIcon} from "@heroicons/react/24/outline";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import ModelSelection from "./ModelSelection";
import useSWR from "swr" 
import SpeechRecognition, {
    useSpeechRecognition
  } from "react-speech-recognition";

type Props = {
    chatId: string;
}

const ChatInput = ({chatId}: Props) => {
    const [prompt, setPrompt] =useState<string>("")
    const {data:session}=useSession()
    const {data:model} =useSWR('model',{
        fallbackData:"text-davinci-003"
    })
    const {
        transcript,
        interimTranscript,
        finalTranscript,
        resetTranscript,
      } = useSpeechRecognition()
 
      useEffect(() => {
        if (finalTranscript !== "") {
          console.log("Got final result:", finalTranscript);
        }
      }, [interimTranscript, finalTranscript]);

    const sendMessage = async (e:FormEvent<HTMLFormElement>)=> {
    e.preventDefault()
    if(!prompt) return
    const input=prompt.trim()
    setPrompt("")

    const message:Message = {
        text:input,
        createdAt:serverTimestamp(),
        user:{
            _id:session?.user?.email!,
            name:session?.user?.name!,
            avatar:session?.user?.image! || `https://ui-avatars.com/api/?name=${session?.user?.name}`,
        }
    }
    await addDoc(collection(db,'users',session?.user?.email!, 'chats',chatId, 'messages'),message)
    
    const notification=toast.loading("ChatGPT is thinking...")
    await fetch('/api/auth/askQuestion',{
        method: 'POST',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify({
            prompt: input,chatId,model,session
        })
    }).then(()=>{
    toast.success("ChatGPT has responded!",{
    id:notification,
    })
    resetTranscript()
    })
}

    const listenContinuously = () => {
    SpeechRecognition.startListening({
      continuous: true,
      language: "en"
    });
    setPrompt(transcript)
    sendMessage
    resetTranscript()
  };

  const listenStop=()=>{
    resetTranscript()
    SpeechRecognition.stopListening
    setPrompt("")
  }

  return (
    <div className="bg-gray-700/50 text-gray-400 rounded-md shadow-xl p-2 h-14 w-3/5 text-md mb-5">
        <form onSubmit={sendMessage} className="p-2 space-x-5 flex">
          <input type="text" 
                value={prompt}
                onChange={(e)=>setPrompt(e.target.value)}
                placeholder="Send a message..."
                className="bg-transparent focus:outline-none flex-1 
                disabled:cursor-not-allowed disabled:text-gray-300"
                disabled={!session}
          />
          <button 
           disabled={!prompt || !session}
           type="submit"
           className="text-white font-bold hover:opacity-30 cursor-pointer"
           >
            <PaperAirplaneIcon className="h-4 w-4 -rotate-45 "/>
          </button>
          <div className="hidden space-x-3 md:flex">
            <button type="button" onClick={resetTranscript}>
            <ArrowPathIcon className="w-5 h-5 hover:text-green-700"/>
            </button>
            <button type="button" onClick={listenContinuously}  >
            <MicrophoneIcon className="w-5 h-5 hover:animate-ping" />
            </button>
            <button type="button" onClick={listenStop}>
            <StopIcon className="w-5 h-5 hover:text-red-700"/>
            </button>
          </div>
      </form>
        <div className="md:hidden">
            <ModelSelection />
        </div>
    </div>
  )
}

export default ChatInput