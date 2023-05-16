import { DocumentData } from "firebase/firestore"
import TextToVoice from "./TextToVoice"
import Image from 'next/image';
type Props = {
    message: DocumentData
}

const Message = ({message}: Props) => {
const isChatGPT=message.user.name==="ChatGPT"
  return (
    <div className={`py-5 rounded-md text-white ${isChatGPT && "bg-[#434654]"}`}>
      <div className="flex space-x-5 px-10 max-w-2xl mx-auto">
        <Image src={message.user.avatar} alt="user avatar"  width={8}
      height={8}className="w-8 h-8 rounded-md" />
        <p className="text-sm pt-1">{message.text}</p>
        <TextToVoice text={message.text}/>
      </div>
    </div>
  )
}

export default Message