import React, {useEffect, useState} from "react";
import "./App.css";
import socketService from "./services/socketService";
import {JoinRoom} from "./components/joinRoom/JoinRoom";
import GameContext, {IGameContextProps} from "./gameContext";
import {Game} from "./components/game/Game";
import {XorOEnum} from "./types/game.types";
import {MainContainer, WelcomeText } from "./components/ui";

function App() {
  const [isInRoom, setInRoom] = useState(false);
  const [playerSymbol, setPlayerSymbol] = useState<XorOEnum>(XorOEnum.X);
  const [isPlayerTurn, setPlayerTurn] = useState(false);
  const [isGameStarted, setGameStarted] = useState(false);

  const connectSocket = async () => {
     await socketService
      .connect(process.env.REACT_APP_SERVER_URL!)
      .catch((err) => {
        console.log("Error: ", err);
      });
  };

  useEffect(() => {
    connectSocket();

  }, []);



  const gameContextValue: IGameContextProps = {
    isInRoom,
    setInRoom,
    playerSymbol,
    setPlayerSymbol,
    isPlayerTurn,
    setPlayerTurn,
    isGameStarted,
    setGameStarted,
  };

  return (
    <GameContext.Provider value={gameContextValue}>
        <WelcomeText>Welcome to Tic-Tac-Toe</WelcomeText>
        <MainContainer>
          {!isInRoom && <JoinRoom />}
          {isInRoom && <Game />}
        </MainContainer>
    </GameContext.Provider>
  );
}

export default App;
