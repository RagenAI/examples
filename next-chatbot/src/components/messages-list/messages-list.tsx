import { Message } from "../message/message";

export function MessagesList() {
  return (
    <div className="flex flex-col space-y-4 overflow-y-auto">
      <Message />
      <Message />
      <Message />
      <Message />
    </div>
  );
}
