import { useEffect, useRef, useState } from 'react';
import './newPrompt.css'
import Upload from '../upload/Upload';
import { IKImage } from 'imagekitio-react';
import model from '../../lib/gemini';
import Markdown from 'react-markdown';

const NewPrompt = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [img, setImg] = useState({
    isLoading: false,
    error: "",
    dbData: {},
    aiData: {},
  });

  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "Hello" }],
      },
      {
        role: "model",
        parts: [{ text: "Great to meet you. What would you like to know?" }],
      },
    ],
  });

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [question, answer, img.dbData]);

  const add = async (textInput) => {
    setQuestion(textInput);
    const result = await chat.sendMessageStream(Object.entries(img.aiData).length ?
                                              [img.aiData, textInput] : [textInput]);
    let accText = ""
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      console.log(chunkText);
      accText += chunkText;
      setAnswer(accText);
    }
    // const response = result.response.text();
    setImg({
      isLoading: false,
      error: "",
      dbData: {},
      aiData: {},
    });
  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    const textInput = e.target.textInput.value;
    if (!textInput) return;

    add(textInput);
  }

  return (
    <>
      {/* add new chat */}
      {img.isLoading && <div className="loading">Image Loading...</div>}
      {img.dbData?.filePath && (
        <IKImage
          urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
          path={img.dbData?.filePath}
          width="380"
          transformation={ [{ width: 380 }] }
        />
      )}
      {question && <div className = "message user">{question}</div>}
      {answer && <div className = "message"><Markdown>{answer}</Markdown></div>}
      <div className="endChat" ref={endRef}></div>
      <form className='newForm' onSubmit={handleSubmit}>
        <Upload setImg={setImg}/>
        <input id="file" type="file" multiple={false} hidden/>
        <input type="text" name='textInput' placeholder='Ask me anything...'/>
        <button>
          <img src="/arrow.png" alt="" />
        </button>
      </form>
    </>
  )
}

export default NewPrompt