import { ChatWrap } from "../../components/Chat/ChatWrap/ChatWrap";

const NoChat = () => {
  return <div>Выберите чат</div>;
};

export const ChatPage = () => {
  return <ChatWrap Component={NoChat} />;
};
