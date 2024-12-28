import { Link } from 'react-router-dom'
import './homepage.css'
import { TypeAnimation } from 'react-type-animation'
import { useState } from 'react';
import { useAuth } from '@clerk/clerk-react';

const Homepage = () => {

  const [typingStatus, setTypingStatus] = useState('Human1');
  // const { getToken } = useAuth();

  // const test = async () => {
  //   const token = await getToken();

  //   await fetch('http://localhost:3000/api/test', {
  //   method: 'GET',
  //   credentials: 'include',
  //   headers: {
  //     'Authorization': `Bearer ${token}`
  //     }
  //   });
  // };

  return (
    <div className='homepage'>
      <img src="/orbital.png" alt="" className='orbital'/>
      <div className='left'>
        <h1>JK AI</h1>
        <h2>Making Tomorrow Today with AI</h2>
        <h3>
          JK AI is a powerful generative AI tool to help you create amazing content.
          Expand your creativity with a touch of AI.
        </h3>
        <Link to='/dashboard'>Get Started</Link>
        {/* <button onClick={test}>TEST BACKEND AUTH</button> */}
      </div>
      <div className='right'>
        <div className="imgContainer">
          <div className="bgContainer">
            <div className="bg"></div>
          </div>
          <img src="/bot2.png" alt="" />
          <div className='typeChats'>
            <img src={typingStatus === "Human1" ? "/human1.jpeg" :
                      typingStatus === "Human2" ? "/human2.jpeg" : "/bot2.png"
            } alt="" />
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed out once, initially
                'Human: We produce food for Mice',
                2000, () => {
                  setTypingStatus('Bot');
                },
                'Bot: We produce food for Hamsters',
                2000, () => {
                  setTypingStatus('Human2');
                },
                'Human2: We produce food for Guinea Pigs',
                2000, () => {
                  setTypingStatus('Bot');
                },
                'Bot: We produce food for Chinchillas',
                2000, () => {
                  setTypingStatus('Human1');
                },
              ]}
              wrapper="span"
              repeat={Infinity}
              cursor={true}
              omitDeletionAnimation={true}
            />
          </div>
        </div>
      </div>
      <div className="terms">
        <img src="/logo.png" alt="" />
        <div className="links">
          <Link to='/'>Terms of Service</Link>
          <span>|</span>
          <Link to='/'>Privacy Policy</Link>
        </div>
      </div>
    </div>
  )
}

export default Homepage