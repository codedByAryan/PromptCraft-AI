import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import PromptBox from "../components/PromptBox";
import { useAuth } from "../context/AuthContext";

const ChatPage = () => {
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const { logout } = useAuth();
  const navigate = useNavigate();

  const fetchChats = async () => {
    try {
      const { data } = await API.get("/chats");
      setChats(data.chats);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSingleChat = async (chatId) => {
    try {
      const { data } = await API.get(`/chats/${chatId}`);
      setActiveChatId(chatId);
      setMessages(data.chat.messages);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNewChat = async () => {
    try {
      const { data } = await API.post("/chats");
      setActiveChatId(data.chat._id);
      setMessages([]);
      fetchChats();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSend = async (prompt) => {
    try {
      setLoading(true);

      const { data } = await API.post("/ai/generate", {
        prompt,
        chatId: activeChatId,
      });

      setActiveChatId(data.chat._id);
      setMessages(data.chat.messages);
      fetchChats();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to generate response");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    fetchChats();
  }, []);


  const handleDeleteChat = async (chatId) => {
  try {
    await API.delete(`/chats/${chatId}`);

    // UI update
    setChats((prev) => prev.filter((chat) => chat._id !== chatId));

    // agar active chat delete hui
    if (activeChatId === chatId) {
      setActiveChatId(null);
      setMessages([]);
    }
  } catch (error) {
    alert("Failed to delete chat");
  }
};

  return (
    <div className="flex h-screen overflow-hidden bg-[#343541] text-white">
      <Sidebar
        chats={chats}
        activeChatId={activeChatId}
        onSelectChat={fetchSingleChat}
        onNewChat={handleNewChat}
        onLogout={handleLogout}
         onDeleteChat={handleDeleteChat}
      />

      <main className="flex flex-1 flex-col">
        <ChatWindow messages={messages} loading={loading} />
        <PromptBox onSend={handleSend} loading={loading} />
      </main>
    </div>
  );
};

export default ChatPage;