import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, UIMessage } from "ai";
import { fetch as expoFetch } from "expo/fetch";
import { createContext, use, type PropsWithChildren } from "react";
import { generateAPIUrl } from "../../utils";

const AiContext = createContext<{
  messages?: UIMessage[];
  error?: Error;
  sendMessage?: any;
} | null>(null);

export function useAi() {
  const value = use(AiContext);
  if (!value) {
    throw new Error("useAi must be wrapped in a <AiProvider />");
  }
  return value;
}

export function AiProvider({ children }: PropsWithChildren) {
  const { messages, error, sendMessage } = useChat({
    transport: new DefaultChatTransport({
      fetch: expoFetch as unknown as typeof globalThis.fetch,
      api: generateAPIUrl("/api/chat"),
    }),
    onError: (error) => console.error(error, "ERROR"),
  });
  return (
    <AiContext.Provider
      value={{
        messages,
        error,
        sendMessage,
      }}
    >
      {children}
    </AiContext.Provider>
  );
}
