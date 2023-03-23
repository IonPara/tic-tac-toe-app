import React from "react";
import { useState } from "react";

const Square = ({ squares, setSquares, game, setGame, theme }) => {
  const [hover, setHover] = useState(null);

  const handleClick = (index, game) => {
    if (game.turn < 9 && !game.winner) {
      let newArray = squares.map((square) => square);

      if (newArray[index] !== "X" && newArray[index] !== "O") {
        newArray[index] = game.nextPlayer;
        if (game.nextPlayer === "O") {
          setGame({ ...game, nextPlayer: "X", turn: game.turn + 1 });
        } else {
          setGame({ ...game, nextPlayer: "O", turn: game.turn + 1 });
        }
      }

      setSquares(newArray);
    }
  };

  return (
    <>
      {squares.map((square, index) => {
        return (
          <div
            onClick={() => handleClick(index, game)}
            onMouseOver={() => {
              setHover(index);
            }}
            onMouseOut={() => setHover(null)}
            className={
              hover === index && typeof square == "number"
                ? `square centered ${game.nextPlayer}-hover`
                : "square centered"
            }
            key={index}
          >
            {typeof square !== "number" && (
              <span
                className={
                  square === "X"
                    ? `symbol text-${theme.X}`
                    : `symbol text-${theme.O}`
                }
              >
                {square}
              </span>
            )}
          </div>
        );
      })}
    </>
  );
};

export default Square;
