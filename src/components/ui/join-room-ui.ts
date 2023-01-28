import styled, {css} from "styled-components";
import {glowButton} from "../../styles/animations";

export const EnterTitle = styled.h4`
  font-size: 18px;
  color: #fff;
  font-family: 'Rubik', sans-serif;
`;

export const JoinRoomContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2em;
`;

export const RoomIdInput = styled.input`
  height: 30px;
  width: 20em;
  font-size: 17px;
  outline: none;
  border: 1px solid #453a94;
`;

export const JoinButton = styled.button`
  outline: none;
  background-color: ${(props) => (props.disabled ? 'gray' : '#453a94')};
  color: #fff;
  font-family: 'Rubik', sans-serif;
  font-size: 15px;
  border: 2px solid transparent;
  padding: 4px 18px;
  margin-top: 1em;
  cursor: ${(props) => !props.disabled && 'pointer'};

  &:hover {
    ${(props) =>
    !props.disabled &&
    css`
        animation: 1s ${glowButton} ease-in-out infinite alternate;
      `}
  }
`;