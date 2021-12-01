import { createReducer, on } from "@ngrx/store";

import { AppState } from "../../store/app.reducer";
import * as counterActions from "./counter.actions";
import { Counter } from "../counter.model";

export interface State {
  counter: number;
  savedValues: Counter[];
}

export interface CounterState extends AppState {
  counter: State;
}

export const initialState: State = {
  counter: 0,
  savedValues: [],
};

export const counterReducer = createReducer(
  initialState,
  on(counterActions.ADD, (state: State, { val }) => ({
    ...state,
    counter: state.counter + val,
  })),
  on(counterActions.SUBTRACT, (state: State, { val }) => ({
    ...state,
    counter: state.counter - val,
  })),
  on(counterActions.SAVE_VALUES, (state: State, { val, email }) => {
    const id = state.savedValues.length;
    const updatedObj: Counter = { id, value: val, email };
    return { ...state, savedValues: [...state.savedValues, { ...updatedObj }] };
  }),
  on(counterActions.DELETE, (state: State, { val }) => ({
    ...state,
    savedValues: state.savedValues.filter((value, index) => index !== val),
  })),
  on(counterActions.RESET, (state: State) => ({
    ...state,
    savedValues: [],
    counter: 0,
  }))
);
