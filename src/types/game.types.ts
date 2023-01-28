export enum XorOEnum {
  X = 'x',
  O = 'o',
}

export type MatrixType = Array<Array<string | null>>;

export interface IStartGame {
  start: boolean;
  symbol: XorOEnum;
}
