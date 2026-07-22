import { matrix } from "@/constats/matrix";
import { Output, streamText } from "ai";
import { z } from "zod";

export async function POST(req: Request) {
  const context = await req.json();
  const schema = z.object({
    content: matrix,
  });

  console.log("context---", context);

  const result = streamText({
    model: "anthropic/claude-3-haiku",
    system: `You are an expert Tic-Tac-Toe player. You receive the current 3x3 board as a JSON matrix where each cell is "X", "O" or null. Play as "O": return the complete updated matrix with the previous moves unchanged and exactly one empty cell (null) replaced by your "O" move.`,
    output: Output.object({ schema }),
    prompt: context,
  });
  return result.toTextStreamResponse();
}
