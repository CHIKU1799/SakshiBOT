
import React from 'react';
import { Chat, ChatType } from '../types';
import { PlusIcon } from './Icons';

interface SidebarProps {
  chats: Chat[];
  activeChatId: string;
  onSelectChat: (id: string) => void;
  onNewGroup: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ chats, activeChatId, onSelectChat, onNewGroup }) => {
  return (
    <div className="bg-gray-800 w-72 flex flex-col h-full border-r border-gray-700">
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-2xl font-bold text-white">Sakshi-bot</h1>
        <p className="text-sm text-gray-400">Your AI best friend</p>
      </div>
      <nav className="flex-grow p-2 overflow-y-auto">
        <ul>
          {chats.map((chat) => (
            <li key={chat.id}>
              <button
                onClick={() => onSelectChat(chat.id)}
                className={`w-full text-left px-4 py-2.5 my-1 rounded-md transition-colors text-sm font-medium ${
                  activeChatId === chat.id
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                {chat.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={onNewGroup}
          className="w-full flex items-center justify-center px-4 py-2.5 bg-gray-700 text-gray-200 rounded-md hover:bg-gray-600 transition-colors font-semibold"
        >
          <PlusIcon />
          <span className="ml-2">New Group</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
