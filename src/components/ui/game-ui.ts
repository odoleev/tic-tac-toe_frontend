import styled from "styled-components";
import {glowButton, glowCells} from "../../styles/animations";

export const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const RestartButton = styled.button`
  outline: none;
  background-color:  #453a94;
  color: #fff;
  max-width: 200px;
  font-family: 'Rubik', sans-serif;
  font-size: 15px;
  border: 2px solid transparent;
  padding: 4px 18px;
  margin-top: 1em;
  cursor: pointer;
  z-index: 100;

  &:hover {
    animation: 1s ${glowButton} ease-in-out infinite alternate;
`;

export const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'Rubik', sans-serif;
  position: relative;
`;

export const RowContainer = styled.div`
  width: 100%;
  display: flex;
`;

interface ICellProps {
    borderTop?: boolean;
    borderRight?: boolean;
    borderLeft?: boolean;
    borderBottom?: boolean;
}

export const Cell = styled.div<ICellProps>`
  width: 13em;
  height: 9em;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  animation: 1s ${glowCells} ease-in-out infinite alternate;
  border-top: ${({ borderTop }) => borderTop && '1px solid transparent'};
  border-left: ${({ borderLeft }) => borderLeft && '1px solid transparent'};
  border-bottom: ${({ borderBottom }) =>
    borderBottom && '1px solid transparent'};
  border-right: ${({ borderRight }) => borderRight && '1px solid transparent'};

  &:hover {
    background-color: #f43b47;
    animation: 1s ${glowCells} ease-in-out infinite alternate;
  }
`;

export const PlayPrevent = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 99;
  cursor: default;
`;

export const X = styled.span`
  font-size: 100px;
  color: #f43b47;
  &::after {
    content: 'X';
  }
`;

export const O = styled.span`
  font-size: 100px;
  color: #453a94;
  &::after {
    content: 'O';
  }
`;