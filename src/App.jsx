import React from "react";
import { useState, useEffect, useRef } from "react";
import Square from "./components/Squares";
import Help from "./components/Alert";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { CSSTransition } from "react-transition-group";

const squaresArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const winningPositions = [
  [1, 2, 3],
  [1, 4, 7],
  [1, 5, 9],
  [2, 5, 8],
  [3, 5, 7],
  [3, 6, 9],
  [4, 5, 6],
  [7, 8, 9],
];

function App() {
  const counter = useRef({
    X: 0,
    O: 0,
    played: 0,
  });
  const nodeRef = useRef(null);

  const gameObj = {
    turn: 0,
    nextPlayer: counter.current.played % 2 ? "O" : "X",
    winner: false,
    crossLinePosition: null,
  };

  const [squares, setSquares] = useState(squaresArray);
  const [game, setGame] = useState(gameObj);
  const [theme, setTheme] = useState({
    X: "warning",
    O: "danger",
  });

  const [font, setFont] = useState(gameObj);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (game.turn === 9 && !game.winner) {
      setGame({ ...game, winner: "Draw" });
    }

    squares.map((square) => {
      winningPositions.map((position, index) => {
        if (
          squares[position[0] - 1] === square &&
          squares[position[1] - 1] === square &&
          squares[position[2] - 1] === square
        ) {
          setGame({ ...game, winner: square, crossLinePosition: index });
          return;
        }
      });
    });
  }, [game.turn]);

  useEffect(() => {
    if (game.winner === "X") {
      counter.current.X += 1;
    } else if (game.winner === "O") {
      counter.current.O += 1;
    }
  });

  const handleReset = () => {
    counter.current.played += 1;
    setGame(gameObj);
    setSquares(squaresArray);
  };

  const winner =
    game.winner === "Draw" ? (
      "Draw"
    ) : (
      <span className="grow">
        Winner:{" "}
        <span
          className={
            game.winner === "X"
              ? `player text-${theme.X}`
              : `player text-${theme.O}`
          }
        >
          {game.winner}
        </span>
      </span>
    );

  const nextPlayer = !game.winner && (
    <span className="grow">
      Next player:{" "}
      <span
        className={
          game.nextPlayer === "X"
            ? `player text-${theme.X}`
            : `player text-${theme.O}`
        }
      >
        {game.nextPlayer}
      </span>
    </span>
  );

  let crossLine;

  switch (game.crossLinePosition) {
    case 0:
      crossLine = "cross-line-hor";
      break;
    case 1:
      crossLine = "cross-line-vert";
      break;
    case 2:
      crossLine = "cross-line-diag cross-line-l-diag";
      break;
    case 3:
      crossLine = "cross-line-vert cross-line-m-vert";
      break;
    case 4:
      crossLine = "cross-line-diag";
      break;
    case 5:
      crossLine = "cross-line-vert cross-line-b-vert";
      break;
    case 6:
      crossLine = "cross-line-hor cross-line-m-hor";
      break;
    case 7:
      crossLine = "cross-line-hor cross-line-b-hor";
      break;
  }

  const crossLineColor =
    game.winner === "O" ? `bg-${theme.O}` : `bg-${theme.X}`;

  return (
    <div className="App centered">
      <div className={`game-container grow ${font}`}>
        <h1>Tic Tac Toe</h1>
        <div className="btn-container">
          <Help theme={theme} />
          <button
            className={`btn bg-${theme.O} text-white reset`}
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
        <div className="score centered">
          <span className={"X text-" + theme.X}>
            X: <span className="num">{counter.current.X} </span>
          </span>
          <span className={"O text-" + theme.O}>O: {counter.current.O}</span>
        </div>
        <div className="status-container">
          <div className="status">
            {nextPlayer}
            {game.winner && winner}
          </div>
        </div>
        <div className={"squares-container"}>
          <span
            className={
              game.crossLinePosition !== null
                ? `absolute ${crossLineColor} ${crossLine}`
                : "absolute"
            }
          ></span>
          <Square
            squares={squares}
            setSquares={setSquares}
            game={game}
            setGame={setGame}
            theme={theme}
          />
        </div>
        <div className="themes-container">
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="w-100 btn bg-danger"
          >
            Change Theme
          </button>
          <CSSTransition
            nodeRef={nodeRef}
            in={open}
            unmountOnExit
            timeout={500}
            classNames="theme-primary"
          >
            <div ref={nodeRef}>
              <div className="themes">
                <div
                  onClick={() => setTheme({ X: "warning", O: "danger" })}
                  className="theme"
                >
                  <span className="X">X</span> <span className="O">O</span>
                </div>
                <div
                  onClick={() => setTheme({ X: "primary", O: "danger" })}
                  className="theme"
                >
                  <span className="text-primary">X</span>{" "}
                  <span className="text-danger">O</span>
                </div>
                <div
                  onClick={() => setTheme({ X: "success", O: "info" })}
                  className="theme"
                >
                  <span className="text-success">X</span>{" "}
                  <span className="text-info">O</span>
                </div>
                <div
                  onClick={() => setTheme({ X: "info", O: "warning" })}
                  className="theme"
                >
                  <span className="text-info">X</span>{" "}
                  <span className="text-warning">O</span>
                </div>
              </div>
            </div>
          </CSSTransition>
        </div>
      </div>
    </div>
  );
}

export default App;
