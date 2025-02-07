import { Link } from 'react-router-dom'
import './chatList.css'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@clerk/clerk-react';

const ChatList = () => {

  const { getToken } = useAuth();

  const { isPending, error, data } = useQuery({
    queryKey: ['userChats'],
    queryFn: async () =>
      fetch(`${import.meta.env.VITE_API_URL}/api/userchats`, {
        method: 'GET',
        credentials: 'include',
        headers: {
        'Authorization': `Bearer ${await getToken()}`
        }
      }).then((res) =>
        res.json(),
      ),
  })

  return (
    <div className='chatList'>
      <span className="title">DASHBOARD</span>
      <Link to='/dashboard'>Create a new Chat</Link>
      <Link to='/'>Explore JK AI</Link>
      <Link to='/'>Contact</Link>
      <hr />
      <span className='title'>RECENT CHATS</span>
      <div className="list">
        {isPending ? "Loading..." : error ? "Something went wrong" :
        data?.map((chat) => (
          <Link key={chat._id} to={`/dashboard/chats/${chat._id}`}>
            {chat.title}
          </Link>
        ))}
      </div>
      <hr />
      <div className="upgrade">
        <img src="/logo.png" alt="" />
        <div className="texts">
          <span>Upgrade to JK AI Pro</span>
          <span>Get unlimited access to all features</span>
        </div>
      </div>
    </div>
  )
}

export default ChatList