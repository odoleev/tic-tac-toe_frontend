import React, { useContext, useState } from "react";
import gameContext from "../../gameContext";
import gameService from "../../services/gameService";
import socketService from "../../services/socketService";
import {EnterTitle, JoinButton, JoinRoomContainer, RoomIdInput } from "../ui";

export function JoinRoom() {
  const [roomName, setRoomName] = useState("");
  const [isJoining, setJoining] = useState(false);

  const { setInRoom } = useContext(gameContext);

  const handleRoomNameChange = (e: React.ChangeEvent<any>) => {
    const value = e.target.value;
    setRoomName(value);
  };

  const joinRoom = async (e: React.FormEvent) => {
    e.preventDefault();

    const socket = socketService.socket;
    if (!roomName || roomName.trim() === "" || !socket) return;

    setJoining(true);

    const joined = await gameService
      .joinGameRoom(socket, roomName)
      .catch((err) => {
        alert(err);
      });

    if (joined) setInRoom(true);

    setJoining(false);
  };

  return (
    <form onSubmit={joinRoom}>
      <JoinRoomContainer>
        <EnterTitle>Enter Room ID to Join the Game</EnterTitle>
        <RoomIdInput
          placeholder="Room ID"
          value={roomName}
          onChange={handleRoomNameChange}
        />
        <JoinButton type="submit" disabled={isJoining}>
          {isJoining ? "Joining..." : "Join"}
        </JoinButton>
      </JoinRoomContainer>
    </form>
  );
}
