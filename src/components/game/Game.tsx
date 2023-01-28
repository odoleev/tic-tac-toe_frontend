import React, { useContext, useEffect, useState } from "react";
import gameContext from "../../gameContext";
import gameService from "../../services/gameService";
import socketService from "../../services/socketService";
import {MatrixType, XorOEnum} from "../../types/game.types";
import {initialMatrix} from "../../assets/initialMatrix";
import {Cell, EnterTitle, Flex, GameContainer, O, PlayPrevent, RestartButton, RowContainer, X } from "../ui";

export function Game() {
  const [matrix, setMatrix] = useState<MatrixType>([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);
  const [isGameFinished, setIsGameFinished] = useState<boolean>(false);
  const [finishTitle, setFinishTitle] = useState<string>('')

  const {
    playerSymbol,
    setPlayerSymbol,
    setPlayerTurn,
    isPlayerTurn,
    setGameStarted,
    isGameStarted,
  } = useContext(gameContext);

  const checkGameState = (matrix: MatrixType) => {
    for (let i = 0; i < matrix.length; i++) {
      let row = [];
      for (let j = 0; j < matrix[i].length; j++) {
        row.push(matrix[i][j]);
      }

      if (row.every((value) => value && value === playerSymbol)) {
        return [true, false];
      } else if (row.every((value) => value && value !== playerSymbol)) {
        return [false, true];
      }
    }

    for (let i = 0; i < matrix.length; i++) {
      let column = [];
      for (let j = 0; j < matrix[i].length; j++) {
        column.push(matrix[j][i]);
      }

      if (column.every((value) => value && value === playerSymbol)) {
        return [true, false];
      } else if (column.every((value) => value && value !== playerSymbol)) {
        return [false, true];
      }
    }

    if (matrix[1][1]) {
      if (matrix[0][0] === matrix[1][1] && matrix[2][2] === matrix[1][1]) {
        if (matrix[1][1] === playerSymbol) return [true, false];
        else return [false, true];
      }

      if (matrix[2][0] === matrix[1][1] && matrix[0][2] === matrix[1][1]) {
        if (matrix[1][1] === playerSymbol) return [true, false];
        else return [false, true];
      }
    }

    if (matrix.every((m) => m.every((v) => v !== null))) {
      return [true, true];
    }

    return [false, false];
  };

  const updateGameMatrix = (column: number, row: number, symbol: XorOEnum) => {
    const newMatrix = [...matrix];

    if (newMatrix[row][column] === null || newMatrix[row][column] === "null") {
      newMatrix[row][column] = symbol;
      setMatrix(newMatrix);
    }

    if (socketService.socket) {
      gameService.updateGame(socketService.socket, newMatrix);
      const [currentPlayerWon, otherPlayerWon] = checkGameState(newMatrix);
      if (currentPlayerWon && otherPlayerWon) {
        gameService.gameWin(socketService.socket, "The Game is a TIE!");
        setFinishTitle(`It's a tie`);
        setIsGameFinished(true)
      } else if (currentPlayerWon && !otherPlayerWon) {
        gameService.gameWin(socketService.socket, "You Lost!");
        setFinishTitle(`You won`);
        setIsGameFinished(true)
      }

      setPlayerTurn(false);
    }
  };

  const handleGameUpdate = () => {
    if (socketService.socket)
      gameService.onGameUpdate(socketService.socket, (newMatrix) => {
        setIsGameFinished(false);
        setMatrix(newMatrix);
        checkGameState(newMatrix);
        setPlayerTurn(true);
      });
  };

  const handleGameStart = () => {
    if (socketService.socket)
      gameService.onStartGame(socketService.socket, (options) => {
        setGameStarted(true);
        setPlayerSymbol(options.symbol);
        if (options.start) setPlayerTurn(true);
        else setPlayerTurn(false);
      });
  };

  const handleGameWin = () => {
    if (socketService.socket)
      gameService.onGameWin(socketService.socket, (message) => {
        console.log("Here", message);
        setIsGameFinished(true)
        setPlayerTurn(false);
        setFinishTitle(message);
      });
  };

  const handleRestart = () => {
    if(socketService.socket) {
      setIsGameFinished(false);
      gameService.updateGame(socketService.socket, initialMatrix)
      console.log(matrix)
      setMatrix(initialMatrix)
      console.log(matrix)
      handleGameStart();
    }
  }

  useEffect(() => {
    handleGameUpdate();
    handleGameStart();
    handleGameWin();
  }, []);

  return (
    <GameContainer>
      {!isGameStarted && (
        <EnterTitle>Waiting for Other Player to Join the Game!</EnterTitle>
      )}
      {(!isGameStarted || !isPlayerTurn) && <PlayPrevent />}
      {isGameFinished && <Flex>
        <EnterTitle>{finishTitle}</EnterTitle>
      </Flex>}
      {matrix.map((row, rowIdx) => {
        return (
          <RowContainer>
            {row.map((column, columnIdx) => (
              <Cell
                borderRight={columnIdx < 2}
                borderLeft={columnIdx > 0}
                borderBottom={rowIdx < 2}
                borderTop={rowIdx > 0}
                onClick={() => matrix[rowIdx][columnIdx]
                    ? null
                    : updateGameMatrix(columnIdx, rowIdx, playerSymbol)
                }
              >
                {column && column !== "null" ? (
                  column === "x" ? (
                    <X />
                  ) : (
                    <O />
                  )
                ) : null}
              </Cell>
            ))}
          </RowContainer>
        );
      })}
      {isGameFinished &&
          <Flex>
            <RestartButton onClick={handleRestart}>Restart?</RestartButton>
          </Flex>
        }
    </GameContainer>
  );
}
