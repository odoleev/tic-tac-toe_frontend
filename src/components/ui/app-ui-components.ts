import styled from "styled-components";
import {glow} from "../../styles/animations";

export const WelcomeText = styled.h1`
  font-size: 80px;
  color: #fff;
  font-family: 'Rubik', sans-serif;
  text-align: center;
  -webkit-animation: 1s ${glow} ease-in-out infinite alternate;
  -moz-animation: 1s ${glow} ease-in-out infinite alternate;
  animation: 1s ${glow} ease-in-out infinite alternate;
`;

export const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;