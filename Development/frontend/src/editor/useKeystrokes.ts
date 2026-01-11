export const useKeystrokes = (sessionId: string) => {
  let lastTime = 0;

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key === "v") {
      e.preventDefault(); // prevent paste
      return;
    }

    const now = performance.now();
    const delta = lastTime ? now - lastTime : 0;
    lastTime = now;

    fetch("http://localhost:5000/api/keystrokes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId,
        keyType: "down",
        delta,
      }),
    });
  };

  return { handleKeyDown };
};
