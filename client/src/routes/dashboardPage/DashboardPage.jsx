import { useMutation, useQueryClient } from '@tanstack/react-query';
import './dashboardPage.css'
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const { userId } = useAuth();
  const QueryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (text) => {
      return fetch(`${import.meta.env.VITE_API_URL}/api/chats`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({ userId, text }),
        body: JSON.stringify({ text }),
      }).then(res => res.json());
    },
    onSuccess: (id) => {
      // Invalidate and refetch
      QueryClient.invalidateQueries({ queryKey: ['userChats'] });
      navigate(`/dashboard/chats/${id}`);
    },
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    const textInput = e.target.textInput.value;
    const text = textInput;
    if (!textInput) return;

    mutation.mutate(text);

    // await fetch("http://localhost:3000/api/chats", {
    //   method: "POST",
    //   credentials: "include",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   // body: JSON.stringify({ userId, text }),
    //   body: JSON.stringify({ text }),
    // });
  }

  return (
    <div className='dashboardPage'>
      <div className="texts">
        <div className="logo">
          <img src="/logo.png" alt="" />
          <h1>JK AI</h1>
        </div>
        <div className="options">
          <div className="option">
            <img src="/chat.png" alt="" />
            <span>Create a New Chat</span>
          </div>
          <div className="option">
            <img src="/image.png" alt="" />
            <span>Analyze Images</span>
          </div>
          <div className="option">
            <img src="/code.png" alt="" />
            <span>Help me with my Code</span>
          </div>
        </div>
      </div>

      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <input type="text" name="textInput" placeholder='Ask me anything...'/>
          <button>
            <img src="/arrow.png" alt="" />
          </button>
        </form>
      </div>
    </div>
  )
}

export default DashboardPage