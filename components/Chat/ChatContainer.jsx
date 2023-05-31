import React, { useEffect, useState } from "react";
import ChatFeed from "./ChatFeed";
import ChatInput from "./ChatInput";
import ChatLayout from "./ChatLayout";
import Chat from "./Chat";


import {
  useHMSStore,
  selectHMSMessages,
  useHMSActions,
} from "@100mslive/react-sdk";



const ChatContainer = () => {
  const hmsActions = useHMSActions();
  const storeMessages = useHMSStore(selectHMSMessages);
  const [chatInput, setChatInput] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const sendMessage = () => {
    hmsActions.sendBroadcastMessage(chatInput);
    setChatInput("");
  };
  useEffect(() => {
    const el = document.getElementById("chat-feed");
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [storeMessages]);

  console.log(storeMessages,"messages mmmmmmmmmm");

  return (
    <ChatLayout>
      <ChatFeed>
        {storeMessages.map((m) => (
          <Chat key={m.id} msg={m} />
        ))}
     
      </ChatFeed>
      <ChatInput
        value={chatInput}
        onChange={ (e) => setChatInput(e.target.value)}
        onKeyPress={() => {
          sendMessage();
        }}
        onClick={() => {sendMessage()}}
      />

    </ChatLayout>
  );
};

export default ChatContainer;
