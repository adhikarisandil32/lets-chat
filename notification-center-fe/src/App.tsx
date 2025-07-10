import { useRef, useState, type FormEvent } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3375");

function App() {
  const inputMessageRef = useRef<HTMLInputElement | null>(null);
  const conversations = useRef<string[]>([]);
  const [, setTriggerRerender] = useState<boolean>(false);

  socket.on("message", (msg: string) => {
    conversations.current.push(msg);
    setTriggerRerender((prev) => {
      console.log({ prev, next: !prev });
      return !prev;
    });
  });

  const handleSend = (e: FormEvent) => {
    e.preventDefault();
    if (!inputMessageRef.current?.value.trim()) return;

    const message = inputMessageRef.current.value;

    socket.emit("message", message);
    inputMessageRef.current.value = "";
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="space-y-4 w-80 relative">
        <div className="border-2 border-black h-90 overflow-auto w-full">
          <h2 className="text-center font-bold bg-gray-100 sticky top-0">Conversation Box</h2>
          <div className="px-2">
            {conversations.current?.map((conversation, idx) => (
              <div key={idx}>{conversation}</div>
            ))}
          </div>
        </div>

        <form
          className="flex w-full flex-wrap gap-1"
          onSubmit={handleSend}
        >
          <input
            ref={inputMessageRef}
            type="text"
            placeholder="Enter message"
            className="border border-black rounded-sm w-full px-1"
          />
          <button className="border border-black rounded-sm px-4 w-fit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default App;
