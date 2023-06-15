import React, { useState } from 'react';
import Square from './Square';
import { WinnerStatus } from './models';
import {
  WINNING_COMBINATIONS,
  X_PLAYER_MARK,
  O_PLAYER_MARK,
} from './constants';

const ROW_SIZE: number = 3;
const COLUMN_AMOUNT: number = 3;

function Board(): React.ReactElement {
  const [squares, setSquares] = useState<string[]>(
    Array(ROW_SIZE * COLUMN_AMOUNT).fill(null)
  );
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const status = calculateStatus(squares, xIsNext);

  const renderRow = (j): React.ReactElement => {
    return (
      <div key={j} className="board-row">
        {[...Array(ROW_SIZE)].map((_e, i) => (
          <Square
            key={i}
            value={squares[calculateIndex(i, j)]}
            onClick={() => {
              if (
                calculateWinner(squares).isWinner ||
                squares[calculateIndex(i, j)]
              ) {
                return;
              }

              const squaresCopy = squares.slice();
              const index = calculateIndex(i, j);
              squaresCopy[index] = getNextPlayer(xIsNext);

              setSquares(squaresCopy);
              setXIsNext(!xIsNext);
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className="status">{status}</div>
      {[...Array(COLUMN_AMOUNT)].map((_e, i) => renderRow(i))}
    </div>
  );
}

function calculateWinner(squares: string[]): WinnerStatus {
  for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
    const [a, b, c] = WINNING_COMBINATIONS[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        isWinner: true,
        mark: squares[a],
      };
    }
  }

  return {
    isWinner: false,
  };
}

function calculateStatus(squares: string[], xIsNext: boolean): string {
  const winner = calculateWinner(squares);

  if (winner.isWinner) {
    return 'Winner: ' + winner.mark;
  }
  if (squares.every((el) => el !== null)) {
    return 'Draw!';
  }

  return 'Next player: ' + getNextPlayer(xIsNext);
}

function getNextPlayer(xIsNext: boolean): string {
  return xIsNext ? X_PLAYER_MARK : O_PLAYER_MARK;
}

function calculateIndex(i: number, j: number): number {
  return ROW_SIZE * j + i;
}

export default Board;
