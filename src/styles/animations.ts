import { keyframes } from 'styled-components';

export const glow = keyframes`
  from {
    text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #f43b47,
    0 0 40px #f43b47, 0 0 50px #f43b47, 0 0 60px #f43b47, 0 0 70px #f43b47;
  }
  to {
    text-shadow: 0 0 20px #fff, 0 0 30px #453a94, 0 0 40px #453a94,
    0 0 50px #453a94, 0 0 60px #453a94, 0 0 70px #453a94, 0 0 80px #453a94;
  }
}`;

export const glowButton = keyframes`
  from {
    box-shadow: 0 0 10px #f43b47, 0 0 20px #f43b47, 0 0 30px #f43b47,
    0 0 40px #f43b47;
  }
  to {
    box-shadow: 0 0 20px #453a94, 0 0 30px #453a94, 0 0 40px #453a94,
    0 0 50px #453a94;
  }
}`

export const glowCells = keyframes`
  from {
    box-shadow: 0 0 10px #f43b47, 0 0 20px #f43b47, 0 0 30px #f43b47 inset;
  }
  to {
    box-shadow: 0 0 20px #453a94, 0 0 30px #453a94, 0 0 40px #453a94 inset;
  }
}`