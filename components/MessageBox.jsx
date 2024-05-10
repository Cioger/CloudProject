import { useEffect, useRef } from "react";

const MessageBox = (props) => {
  const messageEndRef = useRef(null);
  const { chatMessages } = props;

  useEffect(() => {
    messageEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  return (
    <div className="h-[25rem] overflow-auto px-4">
      <ul className="divide-y divide-gray-200">
        <li className="py-3">
          <div className="text-green-800 font-bold">NoteBuddy:</div>
          <div>Hi, I'm NoteBuddy. How can I help you?</div>
        </li>
        {chatMessages.map((message, index) => (
          <li key={index} className="py-3">
            <div
              className={`${
                message.role === "user" ? "text-blue-800" : "text-green-800"
              } font-bold`}
            >
              {message.role === "user" ? "You:" : "NoteBuddy:"}
            </div>
            <div>{message.content}</div>
          </li>
        ))}
      </ul>
      <div ref={messageEndRef}></div>
    </div>
  );
};

export default MessageBox;
