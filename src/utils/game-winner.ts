export function calculateWinner(squares: (string | null)[][]) {
  const coordsWinner = [
    [
      [0, 0],
      [0, 1],
      [0, 2],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [2, 0],
      [2, 1],
      [2, 2],
    ],
    [
      [0, 0],
      [1, 1],
      [2, 2],
    ],
    [
      [0, 2],
      [1, 1],
      [2, 0],
    ],
    [
      [0, 0],
      [1, 0],
      [2, 0],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [0, 2],
      [1, 2],
      [2, 2],
    ],
  ];

  const winningCombo = coordsWinner.find((combo) => {
    const [a, b, c] = combo;
    const valueA = squares[a[0]][a[1]];
    const valueB = squares[b[0]][b[1]];
    const valueC = squares[c[0]][c[1]];
    return valueA === valueB && valueB === valueC && valueA !== null;
  });

  const winner = winningCombo
    ? squares[winningCombo[0][0]][winningCombo[0][1]]
    : null;

  return winner;
}
