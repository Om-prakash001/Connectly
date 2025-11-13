import {useChatStore} from "../store/useChatStore.js"
import {useEffect} from "react"
import ChatHeader from "./ChatHeader.jsx"
import MessageInput from "./MessageInput.jsx"
import MessageSkeleton from "./MessageSkeleton.jsx"

const ChatContainer = () => {
  const {messages, getMessages, isMessagesLoading, selectedUser} = useChatStore();

  useEffect(() => {
    getMessages(selectedUser._id)
  }, [selectedUser._id, getMessages])
  
  if(isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <ChatHeader/>

      <p>messags...</p>

      <MessageInput />

    </div>
  )
}

export default ChatContainer