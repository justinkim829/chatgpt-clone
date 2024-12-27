import { useEffect, useRef } from 'react'
import './chatpage.css'
import NewPrompt from '../../components/newPrompt/NewPrompt';

const ChatPage = () => {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className='chatPage'>
      <div className="wrapper">
        <div className="chat">
          <div className="message">Test Message</div>
          <div className="message user">Test Message from Usersest Message from Usersest Message from Usersest Message from Usersest Message from Usersest Message from Usersest Message from Users</div>
          <div className="message">Test Message</div>
          <div className="message user">Test Message from Users</div>
          <div className="message">Test Message</div>
          <div className="message user">Test Message from Usersest Message from Usersest Message from Usersest Message from Usersest Message from Usersest Message from Usersest Message from Users</div>
          <div className="message">Test Message</div>
          <div className="message user">Test Message from Users</div>
          <div className="message">Test Message</div>
          <div className="message user">Test Message from Usersest Message from Usersest Message from Usersest Message from Usersest Message from Usersest Message from Usersest Message from Users</div>
          <div className="message">Test Message</div>
          <div className="message user">Test Message from Users</div>
          <div className="message">Test Message</div>
          <div className="message user">Test Message from Users</div>
          <div className="message">Test Message</div>
          <div className="message user">Test Message from Usersest Message from Usersest Message from Usersest Message from Usersest Message from Usersest Message from Usersest Message from Users</div>
          <div className="message">Test Message</div>
          <div className="message user">Test Message from Users</div>
          <NewPrompt />
          <div ref={endRef}></div>
        </div>
      </div>
    </div>
  )
}

export default ChatPage