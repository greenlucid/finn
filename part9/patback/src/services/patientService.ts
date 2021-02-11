import { VisiblePatient, Patient, NewPatient } from '../types';
import patientsData from '../../data/patients.json';
import { makeRandomId, parsePatient } from '../utils';

const patients: Patient[] = patientsData.map(p => parsePatient(p));

const removeSensibleData = (patient: Patient): VisiblePatient => {
  const visiblePatient = {...patient, ssn: undefined };
  return visiblePatient;
};

const getAllPatients = (): Patient[] => {
  return patients;
};

const getAllVisiblePatients = (): VisiblePatient[] => {
  return patients.map(p => removeSensibleData(p));
};

const addPatient = (newPatient: NewPatient): Patient => {
  const patient: Patient = {...newPatient, id: makeRandomId()};
  patients.push(patient);
  return patient;
};

export default {
  getAllPatients,
  getAllVisiblePatients,
  addPatient
};