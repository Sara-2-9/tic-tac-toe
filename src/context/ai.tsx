import {
  Experimental_UseObjectHelpers,
  experimental_useObject as useObject,
} from "@ai-sdk/react";
import { createContext, use, type PropsWithChildren } from "react";
import z from "zod";

const AiContext = createContext<Experimental_UseObjectHelpers<
  {
    content: unknown;
  },
  any
> | null>(null);

export function useAi() {
  const value = use(AiContext);
  if (!value) {
    throw new Error("useAi must be wrapped in a <AiProvider />");
  }
  return value;
}

export function AiProvider({ children }: PropsWithChildren) {
  const result = useObject({
    api: "/api/chat",
    schema: z.object({ content: z.string() }),
  });

  return <AiContext.Provider value={result}>{children}</AiContext.Provider>;
}
