import { useEffect, useState } from "react";
import { startSession, endSession } from "./useSession";
import { useKeystrokes } from "./useKeystrokes";

export default function Editor() {
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    startSession().then(setSessionId);
    return () => {
      if (sessionId) endSession(sessionId);
    };
  }, []);

  const { handleKeyDown } = useKeystrokes(sessionId || "");

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [sessionId, handleKeyDown]);

  if (!sessionId) return <p>Starting session...</p>;

  return (
    <textarea
      className="w-full h-screen bg-slate-900 p-6 text-lg outline-none"
      placeholder="Start typing..."
    />
  );
}
