import React, { createContext, useContext, useReducer } from "react";
import { Diagnose, Patient } from "../types";
import { DiagnoseAction } from "./diagnoseReducer";
import { PatientAction } from "./patientReducer";

export type State = {
  patients: { [id: string]: Patient };
  diagnosis: { [code: string]: Diagnose };
};

export type Action = PatientAction | DiagnoseAction;

const initialState: State = {
  patients: {},
  diagnosis: {}
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState
]);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider: React.FC<StateProviderProps> = ({
  reducer,
  children
}: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);