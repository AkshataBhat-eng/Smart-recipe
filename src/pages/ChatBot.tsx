import { useRef, useState, useEffect } from "react";
import ChatMessage from "../components/ChatMessage";
import LoadingSpinner from "../components/LoadingSpinner";
import PrimaryButton from "../components/PrimaryButton";
import axios from "axios";

interface Message {
    role: "user" | "assistant";
    content: string;
}

const ChatBot = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const chatEndRef = useRef<HTMLDivElement | null>(null);



    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const newMessage: Message = { role: "user", content: input };
        const updatedMessages = [...messages, newMessage];
        setMessages((prev) => [...prev, newMessage]);
        setInput("");
        setLoading(true);
        axios.post("http://localhost:8000/api/chat/", {
            messages: updatedMessages,
        })
            .then((res: any) => {
                const reply = res.data.reply;
                setMessages([...updatedMessages, { role: "assistant", content: reply }]);
            })
            .catch((err: any) => {
                console.error("Chat error:", err);
                setMessages([
                    ...updatedMessages,
                    { role: "assistant", content: "⚠️ Something went  wrong!" },
                ])
            })
            .finally(() => {
                setLoading(false);
            })
    };

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center">
                💬 Smart Cooking ChatBot
            </h1>

            <div className="border rounded-lg p-4 h-[60vh] sm:h-[70vh] overflow-y-auto bg-white mb-4 shadow">
                {messages.map((msg, index) => (
                    <ChatMessage key={index} role={msg.role} content={msg.content} />
                ))}
                {loading && <LoadingSpinner />}
                <div ref={chatEndRef} />
            </div>

            <form
                onSubmit={handleSend}
                className="flex flex-col sm:flex-row gap-3 sm:gap-2"
            >
                <input
                    className="flex-1 p-3 border rounded-lg text-sm sm:text-base"
                    type="text"
                    placeholder="Ask something about cooking..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <PrimaryButton type="submit">
                    Send
                </PrimaryButton>
            </form>
        </div>
    );
};

export default ChatBot;