export interface AnimalProps {
  id: number;
  name: string;
  img: string;
}

export type ResultState = {
  score: number;
  message: string;
  errors: number;
};

export enum ActionKind {
  Increase = "INCREASE",
  Decrease = "DECREASE",
  Reset = "RESET",
  Timeout = "TIMEOUT",
}

export type Action = {
  type: ActionKind;
  payload: number;
};

export const increaseAction: Action = {
  type: ActionKind.Increase,
  payload: 10,
};

export const decreaseAction: Action = {
  type: ActionKind.Decrease,
  payload: -5,
};

export const timeoutAction: Action = {
  type: ActionKind.Timeout,
  payload: -5,
};

export const resetAction: Action = {
  type: ActionKind.Reset,
  payload: 0,
};

export const initialValue: ResultState = {
  score: 0,
  message: "",
  errors: 5,
};
