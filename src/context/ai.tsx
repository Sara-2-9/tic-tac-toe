import { matrix } from "@/constats/matrix";
import {
  Experimental_UseObjectHelpers,
  experimental_useObject as useObject,
} from "@ai-sdk/react";
import { fetch as expoFetch } from "expo/fetch";
import { createContext, use, type PropsWithChildren } from "react";
import z from "zod";
import { generateAPIUrl } from "../../utils";

const schema = z.object({ content: matrix });

type AiObject = z.infer<typeof schema>;

const AiContext = createContext<Experimental_UseObjectHelpers<
  AiObject,
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
    api: generateAPIUrl("/api/chat"),
    schema,
    fetch: expoFetch,
  });

  return <AiContext.Provider value={result}>{children}</AiContext.Provider>;
}
