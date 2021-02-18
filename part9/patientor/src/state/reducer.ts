import { diagnoseReducer } from './diagnoseReducer';
import { patientReducer } from './patientReducer';
import { State, Action } from './state';

type Reducer = (state: State, action: Action) => State;
const reducers: Reducer[] = [diagnoseReducer, patientReducer];

export const reducer = (state: State, action: Action): State => {
  let transformingState = {...state};
  reducers.forEach(r => {
    transformingState = r(transformingState, action);
  });
  return transformingState;
};