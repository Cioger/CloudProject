import { useState } from "react";
import MessageBox from "./MessageBox";
import { askChat } from "@/utils/chatFunctions";
import { useRouter } from "next/router";

const ChatComponent = () => {
  const router = useRouter();
  const [chatMessages, setChatMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState("");

  const filterChatHistory = (chatHistory) => {
    let filteredChatHistory = [];

    for (let i = 0; i < chatHistory.length; i++) {
        const currMessage = chatHistory[i];
        const nextMessage = chatHistory[i + 1];

        if (i == chatHistory.length - 1 || (currMessage.type !== 'error' && nextMessage?.type !== 'error' && currMessage.role !== nextMessage?.role)) {
            filteredChatHistory.push(currMessage);
        }
    }

    return filteredChatHistory;
  }

  const handleBack = () => {
    router.push("/");
  }

  const handleKeyDown = async (e) => {
    if (e.key !== 'Enter' || userInput.length === 0) return;

    const currentMessages = {
        role: 'user',
        content: userInput
    }
  


    const currentChatHistory = [...chatMessages, currentMessages];
    const filteredChatHistory = filterChatHistory(currentChatHistory);

    setChatMessages(currentChatHistory);

    try {
        setIsLoading(true);
        const response = await askChat({ type: 'user', messages: filteredChatHistory});

        setUserInput('');
        setIsLoading(false);

        setChatMessages([...currentChatHistory, response.message]);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-5xl w-full mx-auto my-10">
      <div className="border rounded-lg border-gray-300">
        <div className="text-center text-2xl font-bold py-2 border-b border-gray-300">
          NoteBuddy
        </div>
        <MessageBox chatMessages={chatMessages} />
        <input
          type="text"
          id="default-input"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          disabled={isLoading}
          onKeyDown={handleKeyDown}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <button
            type="button"
            onClick={handleBack}
            className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Back
      </button>
    </div>
  );
};

export default ChatComponent;
