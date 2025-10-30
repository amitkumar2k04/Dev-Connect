import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { createSocketConnection } from "../utils/socket";
import { BASE_URL } from "../utils/constants";
import { Smile, Paperclip, Send, X, Circle, ArrowLeft, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const emojis = ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇"];

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [targetUser, setTargetUser] = useState(null);
  const [isOnline, setIsOnline] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const socketRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchChatMessages = async () => {
    try {
      const chat = await axios.get(`${BASE_URL}/chat/${targetUserId}`, {
        withCredentials: true,
      });
      const chatMessages = chat?.data?.messages.map((msg) => {
        const { senderId, text, createdAt, imageUrl, status } = msg;
        return {
          firstName: senderId?.firstName,
          lastName: senderId?.lastName,
          profilePic: senderId?.photoUrl,
          text,
          imageUrl,
          sender: senderId?._id === userId ? "me" : "other",
          timestamp: new Date(createdAt),
          status,
        };
      });
      setMessages(chatMessages);
      scrollToBottom();
    } catch (error) {
      console.error("Failed to load messages:", error);
    }
  };

  const fetchTargetUser = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/info/${targetUserId}`, {
        withCredentials: true,
      });
      setTargetUser(res.data);
    } catch (err) {
      console.error("Error fetching target user info:", err);
    }
  };

  useEffect(() => {
    fetchChatMessages();
    fetchTargetUser();
  }, []);

  useEffect(() => {
    if (!userId) return;
    const socket = createSocketConnection();
    socketRef.current = socket;

    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    // ✅ FIX: Prevent duplicate messages — only add if sender is NOT me
    socket.on("messageReceived", (data) => {
      const { firstName, lastName, text, imageUrl } = data;

      // Skip adding if it's from current user (already added optimistically)
      if (firstName === user.firstName) return;

      setMessages((prev) => [
        ...prev,
        {
          firstName,
          lastName,
          text,
          imageUrl,
          sender: "other",
          timestamp: new Date(),
          status: "delivered",
        },
      ]);
      scrollToBottom();
    });

    socket.on("userStatus", ({ userId: id, status }) => {
      if (id === targetUserId) setIsOnline(status === "online");
    });

    socket.on("typing", ({ typingUserId }) => {
      if (typingUserId === targetUserId) {
        setIsTyping(true);
        setTimeout(() => setIsTyping(false), 1500);
      }
    });

    socket.on("messageSeen", ({ messageId }) => {
      setMessages((prev) =>
        prev.map((msg, index) =>
          index === messageId ? { ...msg, status: "seen" } : msg
        )
      );
    });

    return () => socket.disconnect();
  }, [userId, targetUserId]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    const socket = socketRef.current;

    // Emit to socket
    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });

    // ✅ Optimistically update local message list
    setMessages((prev) => [
      ...prev,
      {
        firstName: user.firstName,
        lastName: user.lastName,
        text: newMessage,
        sender: "me",
        timestamp: new Date(),
        status: "sent",
      },
    ]);

    setNewMessage("");
    scrollToBottom();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    } else {
      socketRef.current?.emit("typing", { typingUserId: userId, targetUserId });
    }
  };

  const handleEmojiClick = (emoji) => {
    setNewMessage((prev) => prev + emoji);
    setShowEmojiPicker(false);
  };

  const formatTime = (timestamp) =>
    new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="w-full max-w-4xl h-[80vh] bg-gray-900 rounded-2xl shadow-2xl border border-gray-800 flex flex-col overflow-hidden">
        <div className="bg-gray-800 px-6 py-4 flex items-center gap-4 border-b border-gray-700">
          <button
            onClick={() => navigate("/feed")}
            className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-gray-700 transition"
          >
            <ArrowLeft size={20} />
          </button>
          {targetUser?.photoUrl && (
            <div className="flex items-center gap-3">
              <img
                src={targetUser.photoUrl}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h2 className="text-white font-semibold text-lg">
                  {targetUser.firstName} {targetUser.lastName}
                </h2>
                <span className={`text-xs ${isOnline ? "text-green-400" : "text-gray-400"}`}>
                  {isOnline ? "Online" : "Offline"}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-950">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-md ${msg.sender === "me" ? "order-2" : "order-1"}`}>
                <div
                  className={`px-4 py-3 rounded-2xl ${
                    msg.sender === "me"
                      ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white"
                      : "bg-gray-800 text-gray-200 border border-gray-700"
                  }`}
                >
                  {msg.imageUrl && (
                    <img
                      src={msg.imageUrl}
                      alt="attachment"
                      className="mb-2 max-h-60 rounded-xl"
                    />
                  )}
                  <p>{msg.text}</p>
                </div>
                <div
                  className={`text-xs text-gray-500 mt-1 ${msg.sender === "me" ? "text-right" : "text-left"}`}
                >
                  {formatTime(msg.timestamp)}
                  {msg.sender === "me" && (
                    <span className="ml-1 inline-block">
                      {msg.status === "seen" ? (
                        <Check size={12} />
                      ) : (
                        <Circle size={8} className="text-gray-400 fill-current" />
                      )}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-800 px-4 py-3 rounded-2xl border border-gray-700 flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="bg-gray-800 border-t border-gray-700 p-4 relative">
          <AnimatePresence>
            {showEmojiPicker && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-20 right-4 bg-gray-800 border border-gray-600 rounded-xl p-4 shadow-xl z-10 w-64 h-48 overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-white font-medium">Emojis</h3>
                  <button
                    onClick={() => setShowEmojiPicker(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X size={16} />
                  </button>
                </div>
                <div className="grid grid-cols-6 gap-2">
                  {emojis.map((emoji, index) => (
                    <button
                      key={index}
                      onClick={() => handleEmojiClick(emoji)}
                      className="text-xl hover:bg-gray-700 rounded-lg p-1"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-end gap-3">
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={() => {}} />
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type a message..."
                className="w-full bg-gray-700 rounded-xl px-4 py-2 pr-12 text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-600"
                rows={1}
              />
              <button
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <Smile size={20} />
              </button>
            </div>
            <button
              onClick={sendMessage}
              disabled={!newMessage.trim()}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 mb-2 rounded-xl disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
