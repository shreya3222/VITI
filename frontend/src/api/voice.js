import api from "./client";

export const parseVoiceTranscript = async (transcript) => {
  const res = await api.post("/voice/parse", { transcript });
  return res.data;
};
