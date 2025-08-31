
export enum MessageAuthor {
  USER = 'user',
  SAKSHI = 'sakshi',
  SYSTEM = 'system',
}

export interface Message {
  id: string;
  author: MessageAuthor;
  text: string;
}

export enum ChatType {
  DIRECT_MESSAGE = 'dm',
  GROUP = 'group',
  ANONYMOUS_ROOM = 'anonymous_room',
}

export interface Chat {
  id: string;
  name: string;
  type: ChatType;
  messages: Message[];
  sakshiIsActive: boolean;
  systemInstruction: string;
}
