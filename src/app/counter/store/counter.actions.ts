import { createAction, props } from "@ngrx/store";

export const ADD = createAction("[Counter] ADD", props<{ val: number }>());
export const SUBTRACT = createAction(
  "[Counter] SUBTRACT",
  props<{ val: number }>()
);
export const SAVE_VALUES = createAction(
  "[Counter] SAVE_VALUES",
  props<{ val: number; email: string }>()
);
export const DELETE = createAction(
  "[Counter] DELETE",
  props<{ val: number }>()
);
export const RESET = createAction("[Counter] RESET");
