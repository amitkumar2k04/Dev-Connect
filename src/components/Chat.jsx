import { useParams } from "react-router";
import { FaPaperPlane } from "react-icons/fa";
import { useEffect, useState } from "react";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import { BASE_URL } from "../utils/constaints";
import axios from "axios";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const fetchChatMessages = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });

    console.log(chat.data.messages);

    const chatMessages = chat?.data?.messages.map((msg) => {
      const { senderId, text } = msg;
      return {
        firstName: senderId?.firstName,
        lastName: senderId?.lastName,
        photoUrl: msg?.senderId?.photoUrl,
        text,
      };
    });
    setMessages(chatMessages);
  };
  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    if (!userId) {
      return;
    }
    const socket = createSocketConnection();
    // As soon as the page loaded, the socket connection is made and joinChat event is emitted
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, lastName, photoUrl, text }) => {
      //   console.log(firstName + " :  " + text);
      setMessages((messages) => [...messages, { firstName, lastName, photoUrl, text }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  return (
    <div className="w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
      {/* Chat Header */}
      <h1 className="p-5 border-b border-gray-600">Chat</h1>
      {/* Chat Messages Section */}
      <div className="flex-1 overflow-scroll p-5">
        {messages.map((msg, index) => {
          return (
            <div
              key={index}
              className={
                user.firstName === msg.firstName
                  ? "chat chat-end"
                  : "chat chat-start"
              }
            >
                {/* <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img
                        alt="photoUrl"
                        src={msg.photoUrl}
                      />
                    </div>
                  </div> */}
              <div className="chat-header">
                {`${msg.firstName}  ${msg.lastName}`}
                <time className="text-xs opacity-50"> 12:45 </time>
              </div>
              <div className="chat-bubble">{msg.text}</div>
              <div className="chat-footer opacity-50">Delivered</div>
            </div>
          );
        })}
      </div>
      {/* Chat Input Section */}
      <div className="p-5 border-t border-gray-600 flex items-center gap-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border border-gray-500 text-white rounded p-2"
        ></input>
        <button
          onClick={sendMessage}
          className="ml-3 p-3 bg-blue-600 hover:bg-blue-700 rounded-lg"
        >
          <FaPaperPlane size={20} />
        </button>
      </div>
    </div>
  );
};

export default Chat;

//   return (
//     <div className="w-screen mt-16 h-screen flex justify-center items-center text-white">
//       <div className="w-11/12 md:w-3/4 lg:w-1/2 h-4/5 flex flex-col border border-white rounded-lg bg-black bg-opacity-50 shadow-lg">
//         {/* Chat Header */}
//         <div className="border border-b-white">
//           <div className="flex p-3 gap-x-2 items-center">
//             <img
//                 // src={target.photoUrl}
//               className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full object-cover"
//               alt="User Profile"
//             />

//             {/* <p className="text-xl font-Whitney font-bold">{target.firstName}</p> */}
//             <p></p>
//           </div>
//         </div>

//         {/* Chat Messages Section */}
//         <div className="flex-1 overflow-y-auto p-4 space-y-3">
//           {messages.map((msg, index) => {
//             return (
//               <>
// {/* <div
//   className={
//     user.firstName === msg.firstName
//       ? "chat chat-end"
//       : "chat chat-start"
//   }
// > */}
//                   <div className="chat-image avatar">
//                     <div className="w-10 rounded-full">
//                       <img
//                         alt="Tailwind CSS chat bubble component"
//                           src={msg.photoUrl}
//                       />
//                     </div>
//                   </div>
//                   <div className="chat-header">
//                     {`${msg.firstName}` + " " + `${msg.lastName}`}
//                     <time className="text-xs opacity-50"> 12:45</time>
//                   </div>
//                   <div className="chat-bubble rounded-xl"> { msg.text }</div>
//                   <div className="chat-footer opacity-50">Delivered</div>
//                 </div>
//               </>
//             );
//           })}
//         </div>

//         {/* Chat Input Section */}
//         <div className="p-4 border-t border-gray-700 flex items-center">
//           <input
//             type="text"
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//             placeholder="Type a message..."
//             className="flex-1 bg-gray-800 text-white rounded-lg p-3 outline-none"
//           />
//           <button
//             onClick={sendMessage}
//             className="ml-3 p-3 bg-blue-600 hover:bg-blue-700 rounded-lg"
//           >
//             <FaPaperPlane size={20} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chat;
