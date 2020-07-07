import {Action} from '@ngrx/store';

export const ADD = '[C] ADD';
export const SUBTRACT = '[C] SUBTRACT';
export const SAVE_VALUES = '[C] SAVE_VALUES';
export const DELETE = '[C] DELETE';
export const RESET = '[C] RESET';

export class Add implements Action {
  readonly type = ADD;
  constructor(public payload: number) {
  }
}

export class Subtract implements Action {
  readonly type = SUBTRACT;
  constructor(public payload: number) {
  }
}

export class SaveValues implements Action {
  readonly type = SAVE_VALUES;
  constructor(public payload: {value: number, email: string}) {
  }
}

export class Delete implements Action {
  readonly type = DELETE;
  constructor(public payload: number) {
  }
}

export class Reset implements Action {
  readonly type = RESET;
}

export type counterActions = Add | Subtract | SaveValues | Delete | Reset;
