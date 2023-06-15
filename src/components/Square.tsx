import React from 'react';

interface SquareProps {
  value: string | null;

  onClick(): void;
}

function Square(props: SquareProps): React.ReactElement {
  return (
    <button className="square" onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
}

export default Square;
