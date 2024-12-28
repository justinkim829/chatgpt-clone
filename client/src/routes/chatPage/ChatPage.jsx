import './chatpage.css'
import NewPrompt from '../../components/newPrompt/NewPrompt';

const ChatPage = () => {

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
        </div>
      </div>
    </div>
  )
}

export default ChatPage