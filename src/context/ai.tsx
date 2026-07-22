import { matrix } from "@/constats/matrix";
import {
  Experimental_UseObjectHelpers,
  experimental_useObject as useObject,
} from "@ai-sdk/react";
import { fetch as expoFetch } from "expo/fetch";
import {
  createContext,
  use,
  useEffect,
  useRef,
  useState,
  type PropsWithChildren,
} from "react";
import z from "zod";
import { generateAPIUrl } from "../../utils";

const schema = z.object({ content: matrix });

type AiObject = z.infer<typeof schema>;

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
};

type AiContextValue = Experimental_UseObjectHelpers<AiObject, any> & {
  messages: ChatMessage[];
  clearMessages: () => void;
};

const AiContext = createContext<AiContextValue | null>(null);

export function useAi() {
  const value = use(AiContext);
  if (!value) {
    throw new Error("useAi must be wrapped in a <AiProvider />");
  }
  return value;
}

export function AiProvider({ children }: PropsWithChildren) {
  const result = useObject({
    api: generateAPIUrl("/api/chat"),
    schema,
    fetch: expoFetch,
  });
  const { object, isLoading, submit } = result;

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const idCounter = useRef(0);
  const nextId = () => `${Date.now()}-${idCounter.current++}`;

  const submitWithHistory: typeof submit = (input) => {
    setMessages((prev) => [
      ...prev,
      { id: nextId(), role: "user", text: input },
    ]);
    submit(input);
  };

  useEffect(() => {
    if (!isLoading && object?.content) {
      setMessages((prev) => [
        ...prev,
        {
          id: nextId(),
          role: "assistant",
          text: JSON.stringify(object.content),
        },
      ]);
    }
  }, [object, isLoading]);

  const value: AiContextValue = {
    ...result,
    submit: submitWithHistory,
    messages,
    clearMessages: () => setMessages([]),
  };

  return <AiContext.Provider value={value}>{children}</AiContext.Provider>;
}
