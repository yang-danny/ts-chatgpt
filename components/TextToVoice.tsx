import { SpeakerWaveIcon } from "@heroicons/react/24/outline";

type Props = {
    text: string;
}

function TextToVoice({text}: Props) {
 const msg = new SpeechSynthesisUtterance()
  const speechHandler = (msg:any) => {
    msg.text = text
    window.speechSynthesis.speak(msg)
  }
  return (
    <>
      <button onClick={() => speechHandler(msg)}>
        <SpeakerWaveIcon className="w-5 h-5 animate-pulse hover:scale-110" />
        </button>
    </>
  )
}

export default TextToVoice