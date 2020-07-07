import {AppState} from '../../store/app.reducer';
import * as CounterActions from './counter.actions';
import {Counter} from '../counter.model';

export interface State {
  counter: number;
  savedValues: Counter[];
}

export interface CounterState extends AppState {
  counter: State;
}

export const initialState: State = {
  counter: 0,
  savedValues: []
};

export function counterReducer(state: State = initialState,
                               action: CounterActions.counterActions) {
  switch (action.type) {
    case CounterActions.ADD:
      return {
        ...state,
        counter: state.counter + action.payload
      };
    case CounterActions.SUBTRACT:
      return {
        ...state,
        counter: state.counter - action.payload
      };
    case CounterActions.SAVE_VALUES:
      const id = state.savedValues.length;
      const { value, email } = action.payload;
      const updatedObj: Counter = { id, value, email };
      return {
        ...state,
        savedValues: [...state.savedValues, {...updatedObj}]
      };
    case CounterActions.DELETE:
      return {
        ...state,
        savedValues: state.savedValues.filter((val, index) => index !== action.payload)
      };
    case CounterActions.RESET:
      return {
        ...state,
        savedValues: [],
        counter: 0
      };
    default:
      return {...state};
  }
}
