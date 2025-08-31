
import React from 'react';
import { Message, MessageAuthor } from '../types';
import { BotIcon, UserIcon } from './Icons';

interface MessageProps {
  message: Message;
}

const MessageComponent: React.FC<MessageProps> = ({ message }) => {
  const isUser = message.author === MessageAuthor.USER;
  const isSakshi = message.author === MessageAuthor.SAKSHI;
  const isSystem = message.author === MessageAuthor.SYSTEM;

  if (isSystem) {
    return (
      <div className="text-center my-4">
        <p className="text-xs text-gray-400 italic px-4 py-1 bg-gray-800 rounded-full inline-block">{message.text}</p>
      </div>
    );
  }

  const authorName = isUser ? 'You' : 'Sakshi';
  const bubbleClasses = isUser
    ? 'bg-indigo-600 text-white rounded-br-none'
    : 'bg-gray-700 text-gray-200 rounded-bl-none';
  const containerClasses = isUser ? 'justify-end' : 'justify-start';
  const icon = isUser ? <UserIcon /> : <BotIcon />;
  const iconContainerClasses = isUser ? 'ml-3' : 'mr-3';
  const iconColor = isUser ? 'text-indigo-400' : 'text-purple-400';

  return (
    <div className={`flex items-end my-3 ${containerClasses}`}>
      {!isUser && (
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${iconContainerClasses} ${iconColor} bg-gray-800 flex-shrink-0`}>
          {icon}
        </div>
      )}
      <div className={`px-4 py-3 rounded-2xl max-w-md md:max-w-lg ${bubbleClasses}`}>
        <p className="text-sm break-words">{message.text}</p>
      </div>
       {isUser && (
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${iconContainerClasses} ${iconColor} bg-gray-800 flex-shrink-0`}>
          {icon}
        </div>
      )}
    </div>
  );
};

export default MessageComponent;
