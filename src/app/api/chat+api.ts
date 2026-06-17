import { matrix } from "@/constats/matrix";
import { Output, streamText } from "ai";
import { z } from "zod";

export async function POST(req: Request) {
  const context = await req.json();
  const schema = z.object({
    content: z.array(matrix),
  });

  console.log("context---", context);

  const result = streamText({
    model: "anthropic/claude-3-haiku",
    system: `You are an expert Tic-Tac-Toe player. Predict next move and keeping and returning the array with the previous moves..`,
    output: Output.object({ schema }),
    prompt: context,
  });
  return result.toTextStreamResponse();
}
