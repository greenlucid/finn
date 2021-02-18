/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { NewPatient, Patient, Gender, Entry, NewEntry, HealthCheckEntry, OccupationalHealthcareEntry, HospitalEntry,
HealthCheckRating } from './types';

export const makeRandomId = (): string => {
  return String(Math.floor(Math.random()*1000000));
};


const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (text: any): string => {
  if (!text || !isString(text)) {
    throw new Error('Incorrect or missing string: ' + text);
  }
  return text;
};

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name: ' + name);
  }
  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn: ' + ssn);
  }
  return ssn;
};

const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender);
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation: ' + occupation);
  }
  return occupation;
};

const isBaseEntry = (object: any): boolean => {
  if (typeof object === 'object' && object !== null) {
    if (
      isString(object.id) &&
      isString(object.description) &&
      isString(object.date) &&
      isString(object.specialist)
    ) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

const isBaseNewEntry = (object: any): boolean => {
  if (typeof object === 'object' && object !== null) {
    if (
      isString(object.description) &&
      isString(object.date) &&
      isString(object.specialist)
    ) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

const isHealthCheckRating = (check: any): check is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(check);
};

const parseHealthCheckRating = (check: any): HealthCheckRating => {
  if (check === undefined || check === null || !isHealthCheckRating(check)) {
    throw new Error('Incorrect or missing check: ' + check);
  }
  return check;
};

const isHealthCheckEntry = (object: any): object is HealthCheckEntry => {
  if (isBaseEntry(object) && object.type === 'HealthCheck' && isHealthCheckRating(object.healthCheckRating)) {
    return true;
  } else {
    return false;
  }
};

const isNewHealthCheckEntry = (object: any): object is Omit<HealthCheckEntry, 'id'> => {
  if (isBaseNewEntry(object) && object.type === 'HealthCheck' && isHealthCheckRating(object.healthCheckRating)) {
    return true;
  } else {
    return false;
  }
};

const isHospitalEntry = (object: any): object is HospitalEntry => {
  return (isBaseEntry(object) && object.type === 'Hospital');
};

const isNewHospitalEntry = (object: any): object is Omit<HospitalEntry, 'id'> => {
  return (isBaseNewEntry(object) && object.type === 'Hospital');
};

const isOccupationalHealthcareEntry = (object: any): object is OccupationalHealthcareEntry => {
  return (isBaseEntry(object) && object.type === 'OccupationalHealthcare' && isString(object.employerName));
};

const isNewOccupationalHealthcareEntry = (object: any): object is Omit<OccupationalHealthcareEntry, 'id'> => {
  return (isBaseNewEntry(object) && object.type === 'OccupationalHealthcare' && isString(object.employerName));
};

const isEntry = (object: any): object is Entry => {
  return (isHealthCheckEntry(object) || isHospitalEntry(object) || isOccupationalHealthcareEntry(object));
};

const isEntryArray = (array: any): array is Entry[] => {
  if (Array.isArray(array) && array.filter(a => !isEntry(a)).length === 0) {
    return true;
  } else {
    return false;
  }
};

export const parseEntry = (object: any): Entry => {
  if (isHealthCheckEntry(object)) {
    const entry: HealthCheckEntry = {
      id: parseString(object.id),
      description: parseString(object.description),
      date: parseDate(object.date),
      specialist: parseString(object.specialist),
      diagnosisCodes: object.diagnosisCodes,
      type: 'HealthCheck',
      healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
    };
    return entry;
  } else if (isHospitalEntry(object)) {
    const entry: HospitalEntry = {
      id: parseString(object.id),
      description: parseString(object.description),
      date: parseDate(object.date),
      specialist: parseString(object.specialist),
      diagnosisCodes: object.diagnosisCodes,
      type: 'Hospital',
      discharge: object.discharge
    };
    return entry;
  } else if (isOccupationalHealthcareEntry(object)) {
    const entry: OccupationalHealthcareEntry = {
      id: parseString(object.id),
      description: parseString(object.description),
      date: parseDate(object.date),
      specialist: parseString(object.specialist),
      diagnosisCodes: object.diagnosisCodes,
      type: 'OccupationalHealthcare',
      employerName: parseString(object.employerName),
      sickLeave: object.sickLeave
    };
    return entry;
  } else {
    console.log(object);
    throw new Error('Object is not an Entry');
  }
};

export const parseNewEntry = (object: any): NewEntry => {
  if (isNewHealthCheckEntry(object)) {
    const entry: Omit<HealthCheckEntry, 'id'> = {
      description: parseString(object.description),
      date: parseDate(object.date),
      specialist: parseString(object.specialist),
      diagnosisCodes: object.diagnosisCodes,
      type: 'HealthCheck',
      healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
    };
    return entry;
  } else if (isNewHospitalEntry(object)) {
    const entry: Omit<HospitalEntry, 'id'> = {
      description: parseString(object.description),
      date: parseDate(object.date),
      specialist: parseString(object.specialist),
      diagnosisCodes: object.diagnosisCodes,
      type: 'Hospital',
      discharge: object.discharge
    };
    return entry;
  } else if (isNewOccupationalHealthcareEntry(object)) {
    const entry: Omit<OccupationalHealthcareEntry, 'id'> = {
      description: parseString(object.description),
      date: parseDate(object.date),
      specialist: parseString(object.specialist),
      diagnosisCodes: object.diagnosisCodes,
      type: 'OccupationalHealthcare',
      employerName: parseString(object.employerName),
      sickLeave: object.sickLeave
    };
    return entry;
  } else {
    console.log(object);
    throw new Error('Object is not a NewEntry');
  }
};

const parseEntries = (entries: any): Entry[] => {
  if (!entries || !isEntryArray(entries)) {
    throw new Error('Incorrect or missing entries: ' + entries);
  }
  return entries;
};

export const parseNewPatient = (object: any): NewPatient => {
  if (!object) {
    throw new Error('object is null or undefined');
  }
  const entries = isEntryArray(object.entries) ? parseEntries(object.entries) : [];
  const newPatient: NewPatient = {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: parseEntries(entries)
  };
  return newPatient;
};

const parseId = (id: any): string => {
  if (!id || !isString(id)) {
    throw new Error('Incorrect or missing gender: ' + id);
  }
  return id;
};

export const parsePatient = (object: any): Patient => {
  const newPatient: NewPatient = parseNewPatient(object);
  const id: string = parseId(object.id);
  const patient: Patient = {...newPatient, id};
  return patient;
};