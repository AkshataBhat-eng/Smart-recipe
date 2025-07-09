import { useState } from "react";
import ChatMessage from "../components/ChatMessage";
import LoadingSpinner from "../components/LoadingSpinner";
import PrimaryButton from "../components/PrimaryButton";

interface Message {
    role: "user" | "assistant";
    content: string;
}

const ChatBot = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const newUserMessage: Message = { role: "user", content: input };
        setMessages((prev) => [...prev, newUserMessage]);
        setInput("");
        setLoading(true);

        try {
            const response = await fetch("http://localhost:8000/api/chat/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: [...messages, newUserMessage] }),
            });

            const data = await response.json();
            const aiMessage: Message = { role: "assistant", content: data.reply };
            setMessages((prev) => [...prev, aiMessage]);
        } catch (err) {
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: "Sorry, something went wrong." },
            ]);
        }

        setLoading(false);
    };

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