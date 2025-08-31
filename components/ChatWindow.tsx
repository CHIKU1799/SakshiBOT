
import React, { useEffect, useRef } from 'react';
import { Chat, Message, MessageAuthor, ChatType } from '../types';
import ChatInput from './ChatInput';
import MessageComponent from './Message';

interface ChatWindowProps {
  chat: Chat | undefined;
  onSendMessage: (message: string) => void;
  isAiLoading: boolean;
  onToggleSakshi: (chatId: string, isActive: boolean) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ chat, onSendMessage, isAiLoading, onToggleSakshi }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat?.messages]);

  if (!chat) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        Select a chat to start talking
      </div>
    );
  }

  const isGroup = chat.type === ChatType.GROUP;

  return (
    <div className="flex-1 flex flex-col bg-gray-900 h-full">
      <header className="p-4 bg-gray-800 border-b border-gray-700 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">{chat.name}</h2>
        {isGroup && (
          <div className="flex items-center">
            <span className={`mr-2 text-sm ${chat.sakshiIsActive ? 'text-green-400' : 'text-gray-400'}`}>
              Sakshi is {chat.sakshiIsActive ? 'active' : 'inactive'}
            </span>
            <label htmlFor="sakshi-toggle" className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" id="sakshi-toggle" className="sr-only peer" 
                checked={chat.sakshiIsActive}
                onChange={(e) => onToggleSakshi(chat.id, e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-focus:ring-4 peer-focus:ring-indigo-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>
        )}
      </header>

      <div className="flex-1 overflow-y-auto p-4">
        {chat.messages.map((msg) => (
          <MessageComponent key={msg.id} message={msg} />
        ))}
        {isAiLoading && <MessageComponent message={{id: 'loading', author: MessageAuthor.SAKSHI, text: '...'}} />}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput onSendMessage={onSendMessage} isLoading={isAiLoading} isDisabled={!chat.sakshiIsActive}/>
    </div>
  );
};

export default ChatWindow;
