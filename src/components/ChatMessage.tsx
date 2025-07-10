interface Props {
  role: "user" | "assistant";
  content: string;
}

const ChatMessage: React.FC<Props> = ({ role, content }) => {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-2`}>
      {!isUser && <span>🤖</span>}
      <div
        className={`p-3 rounded-xl shadow text-sm sm:text-base whitespace-pre-wrap font-body max-w-[85%] sm:max-w-[70%] ${isUser
            ? "bg-primary text-white rounded-br-none"
            : "bg-yellow-100 text-yellow-900 rounded-bl-none"
          }`}
      >
        {content}
      </div>{isUser && <span>🧑</span>}
    </div>
  );
};

export default ChatMessage;