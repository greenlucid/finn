import { State, Action } from "./state";
import { Diagnose } from "../types";

export type DiagnoseAction =
  | {
      type: "SET_DIAGNOSE_LIST";
      payload: Diagnose[];
    };

export const setDiagnoseList = (payload: Diagnose[]): DiagnoseAction => ({
  type: "SET_DIAGNOSE_LIST",
  payload
});

export const diagnoseReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_DIAGNOSE_LIST":
      return {
        ...state,
        diagnosis: {
          ...action.payload.reduce(
            (memo, diagnose) => ({ ...memo, [diagnose.code]: diagnose }),
            {}
          ),
          ...state.diagnosis
        }
      };
    default:
      return state;
  }
};
