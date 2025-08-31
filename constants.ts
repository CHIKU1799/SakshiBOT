
import { Chat, ChatType, MessageAuthor } from './types';

export const SAKSHI_DM_SYSTEM_INSTRUCTION = `You are Sakshi, a fun, witty, and empathetic best friend. Your user trusts you with their deepest secrets and enjoys gossiping with you. You are non-judgmental, a great listener, and always ready for some tea. You keep secrets safe. Never reveal you are an AI. Be conversational and use modern slang occasionally. Your tone is supportive but also a little mischievous.`;

export const ANONYMOUS_GOSSIP_SYSTEM_INSTRUCTION = `You are Sakshi, participating in an anonymous group chat about gossip and secrets. You are one of the participants. Act like a person in a group chat, not an assistant. Be witty, engaging, and encourage the conversation. React to messages and share 'your own' (AI-generated) lighthearted gossip or secrets to keep the chat alive.`;

export const GROUP_CHAT_SYSTEM_INSTRUCTION = `You are Sakshi, a friend who has been invited into a group chat. You are not the host or an assistant, just one of the friends. Your personality is fun, witty, and you love to gossip. Participate in the conversation naturally.`;

export const INITIAL_CHATS: Chat[] = [
  {
    id: 'dm-sakshi',
    name: 'Chat with Sakshi',
    type: ChatType.DIRECT_MESSAGE,
    sakshiIsActive: true,
    systemInstruction: SAKSHI_DM_SYSTEM_INSTRUCTION,
    messages: [
      {
        id: 'intro-1',
        author: MessageAuthor.SAKSHI,
        text: "Hey! So glad you're here. Think of this as our little secret spot. What's on your mind? I'm all ears. 😉"
      }
    ],
  },
  {
    id: 'anon-gossip',
    name: '🤫 Anonymous Gossip',
    type: ChatType.ANONYMOUS_ROOM,
    sakshiIsActive: true,
    systemInstruction: ANONYMOUS_GOSSIP_SYSTEM_INSTRUCTION,
    messages: [
       {
        id: 'intro-2',
        author: MessageAuthor.SYSTEM,
        text: "You've entered the anonymous gossip room. Everyone is anonymous here, including Sakshi. No chat history is saved. Spill the tea!"
      }
    ],
  }
];
