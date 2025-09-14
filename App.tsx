import './index.css';
import React, { useState, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import CreateGroupModal from './components/CreateGroupModal';
import { Chat, Message, MessageAuthor, ChatType } from './types';
import { INITIAL_CHATS, GROUP_CHAT_SYSTEM_INSTRUCTION } from './constants';
import { streamChatResponse } from './services/geminiService';

const App: React.FC = () => {
  const [chats, setChats] = useState<Chat[]>(INITIAL_CHATS);
  const [activeChatId, setActiveChatId] = useState<string>('dm-sakshi');
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const activeChat = chats.find((c) => c.id === activeChatId);

  const addMessageToChat = (chatId: string, message: Message) => {
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === chatId ? { ...chat, messages: [...chat.messages, message] } : chat
      )
    );
  };

  const updateLastMessageInChat = (chatId: string, textChunk: string) => {
     setChats((prevChats) =>
      prevChats.map((chat) => {
        if (chat.id === chatId) {
          const lastMessage = chat.messages[chat.messages.length - 1];
          if (lastMessage && lastMessage.author === MessageAuthor.SAKSHI) {
            const updatedMessages = [...chat.messages];
            updatedMessages[updatedMessages.length - 1] = {
              ...lastMessage,
              text: lastMessage.text === '...' ? textChunk : lastMessage.text + textChunk,
            };
            return { ...chat, messages: updatedMessages };
          }
        }
        return chat;
      })
    );
  };

  const handleSendMessage = useCallback(async (messageText: string) => {
    if (!activeChat || !activeChat.sakshiIsActive) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      author: MessageAuthor.USER,
      text: messageText,
    };
    addMessageToChat(activeChat.id, userMessage);
    setIsAiLoading(true);
    
    const sakshiPlaceholder: Message = {
      id: `sakshi-${Date.now()}`,
      author: MessageAuthor.SAKSHI,
      text: '...',
    };
    addMessageToChat(activeChat.id, sakshiPlaceholder);

    await streamChatResponse(
      activeChat.id,
      activeChat.systemInstruction,
      messageText,
      (chunk) => {
        updateLastMessageInChat(activeChat.id, chunk);
      },
      (errorMsg) => {
        const lastMessage = activeChat.messages[activeChat.messages.length - 1];
        if (lastMessage?.id === sakshiPlaceholder.id) {
            setChats(prev => prev.map(c => c.id === activeChat.id ? {...c, messages: c.messages.slice(0, -1)}: c));
        }
        addMessageToChat(activeChat.id, { id: `err-${Date.now()}`, author: MessageAuthor.SYSTEM, text: errorMsg });
      }
    );
    
    setIsAiLoading(false);
  }, [activeChat]);

  const handleCreateGroup = (name: string) => {
    const newGroup: Chat = {
      id: `group-${Date.now()}`,
      name,
      type: ChatType.GROUP,
      messages: [{id: 'group-intro', author: MessageAuthor.SYSTEM, text: `Group "${name}" created.`}],
      sakshiIsActive: true,
      systemInstruction: GROUP_CHAT_SYSTEM_INSTRUCTION,
    };
    setChats([...chats, newGroup]);
    setActiveChatId(newGroup.id);
  };

  const handleToggleSakshi = (chatId: string, isActive: boolean) => {
    setChats(chats.map(chat => 
      chat.id === chatId 
        ? {
            ...chat, 
            sakshiIsActive: isActive,
            messages: [...chat.messages, {
                id: `sys-${Date.now()}`,
                author: MessageAuthor.SYSTEM,
                text: `Sakshi is now ${isActive ? 'active' : 'inactive'} in this group.`
            }]
          } 
        : chat
    ));
  };


  return (
    <div className="flex h-screen w-full antialiased text-gray-200 bg-gray-900">
      <Sidebar
        chats={chats}
        activeChatId={activeChatId}
        onSelectChat={setActiveChatId}
        onNewGroup={() => setIsModalOpen(true)}
      />
      <ChatWindow
        chat={activeChat}
        onSendMessage={handleSendMessage}
        isAiLoading={isAiLoading}
        onToggleSakshi={handleToggleSakshi}
      />
      {isModalOpen && (
        <CreateGroupModal
          onClose={() => setIsModalOpen(false)}
          onCreateGroup={handleCreateGroup}
        />
      )}
    </div>
  );
};

export default App;
