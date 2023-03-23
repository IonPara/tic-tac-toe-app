import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

function Help({ theme }) {
  const [show, setShow] = useState(false);

  return (
    <>
      <Alert className="help-alert" show={show} variant="success">
        <Alert.Heading>Tic Tac Toe</Alert.Heading>
        <p>
          The player who succeeds in placing three of their marks in a
          horizontal, vertical, or diagonal row is the winner. It is a solved
          game, with a forced draw assuming best play from both players.
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShow(false)} variant="outline-success">
            Close
          </Button>
        </div>
      </Alert>

      {
        <Button className={`bg-${theme.X}`} onClick={() => setShow(true)}>
          Help
        </Button>
      }
    </>
  );
}

export default Help;
