import { State, Action } from "./state";
import { Entry, Patient } from "../types";

export type PatientAction =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "ADD_ENTRY";
      id: Patient['id'];
      payload: Entry;
    };

export const setPatientList = (payload: Patient[]): PatientAction => ({
  type: "SET_PATIENT_LIST",
  payload
});

export const addPatient = (payload: Patient): PatientAction => ({
  type: "ADD_PATIENT",
  payload
});

export const addEntry = (payload: Entry, id: Patient['id']): PatientAction => ({
  type: "ADD_ENTRY",
  id,
  payload
});

export const patientReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "ADD_ENTRY":
      const foundPatient = state.patients[action.id];
      const newPatientWithEntry = {...foundPatient, entries: [ ...foundPatient.entries, action.payload ]};
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.id]: newPatientWithEntry
        }
      };
    default:
      return state;
  }
};
