import api from "../api/axios";

export const startSession = async () => {
  const res = await api.post("/sessions/start");
  return res.data.sessionId;
};

export const endSession = async (sessionId: string) => {
  await api.post("/sessions/end", { sessionId });
};
