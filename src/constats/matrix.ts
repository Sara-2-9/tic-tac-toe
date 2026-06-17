import z from "zod";

export const matrixValue = z
  .enum(["X", "O"])
  .nullable()
  .describe('Accepted values ​​are "O" or "X"');

export const matrix = z.array(z.array(matrixValue));
