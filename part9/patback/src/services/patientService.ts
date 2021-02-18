/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { PublicPatient, Patient, NewPatient, Entry, NewEntry } from '../types';
import patientsData from '../../data/patients';
import { makeRandomId, parsePatient, parseEntry } from '../utils';

const patients: Patient[] = patientsData.map(p => parsePatient(p));

const removeSensibleData = (patient: Patient): PublicPatient => {
  const visiblePatient = {...patient, ssn: undefined};
  return visiblePatient;
};

const getAllPatients = (): Patient[] => {
  return patients;
};

const getAllVisiblePatients = (): PublicPatient[] => {
  return patients.map(p => removeSensibleData(p));
};

const getPatient = (id: string): Patient | undefined => {
 const patient = patients.find(p => p.id === id);
 if (!patient) {
   return undefined;
 } else {
   return patient;
 }
};

const addPatient = (newPatient: NewPatient): Patient => {
  const patient: Patient = {...newPatient, id: makeRandomId(), entries: []};
  patients.push(patient);
  return patient;
};

const addEntryToPatient = (newEntry: NewEntry, id: Patient['id']): Entry => {
  const patient: Patient | undefined = getPatient(id);
  if (!patient) {
    throw new Error(`No patient with id ${id} has been found`);
  }
  const entry = {...newEntry, id: makeRandomId()};
  console.error(entry);
  try {
    patient.entries.push(parseEntry(entry));
    return entry;
  } catch(e) {
    throw new Error(e.message);
  }
};

export default {
  getAllPatients,
  getAllVisiblePatients,
  addPatient,
  getPatient,
  addEntryToPatient
};