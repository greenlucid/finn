/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { NewPatient, Patient, Gender } from './types';

export const makeRandomId = (): string => {
  return String(Math.floor(Math.random()*1000000));
};


const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect of missing name: ' + name);
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
    throw new Error('Incorrect of missing ssn: ' + ssn);
  }
  return ssn;
};

const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender);
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect of missing gender: ' + gender);
  }
  return gender;
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect of missing occupation: ' + occupation);
  }
  return occupation;
};

export const parseNewPatient = (object: any): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation)
  };
  return newPatient;
};

const parseId = (id: any): string => {
  if (!id || !isString(id)) {
    throw new Error('Incorrect of missing gender: ' + id);
  }
  return id;
};

export const parsePatient = (object: any): Patient => {
  const newPatient: NewPatient = parseNewPatient(object);
  const id: string = parseId(object.id);
  const patient: Patient = {...newPatient, id};
  return patient;
};