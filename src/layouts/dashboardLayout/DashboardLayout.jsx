import { useAuth } from '@clerk/clerk-react'
import './dashboardLayout.css'
import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import ChatList from '../../components/chatList/ChatList';

const DashboardLayout = () => {

  const {userID, isLoaded} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && !userID) {
    navigate('/sign-in');
    }
    // maybe add isLoaded to the dependency array
  }, [userID, navigate]);

  if (!isLoaded) {
    return 'Loading...';
  }

  return (
    <div className='dashboardLayout'>
      <div className="menu"><ChatList /></div>
      <div className="content"><Outlet /></div>
    </div>
  )
}

export default DashboardLayout