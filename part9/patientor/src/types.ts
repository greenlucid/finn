export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Diagnose['code'][];
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave?: { startDate: string; endDate: string };
}

export interface HospitalEntry extends BaseEntry {
  type: 'Hospital';
  discharge?: { date: string; criteria: string };
}

export type Entry = HealthCheckEntry | OccupationalHealthcareEntry | HospitalEntry;

export interface EntryGeneral {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Diagnose['code'][];
  type: 'HealthCheck' | 'Hospital' | 'OccupationalHealthcare';
  healthCheckRating: HealthCheckRating;
  employerName: string;
  sickLeave?: { startDate: string; endDate: string };
  discharge?: { date: string; criteria: string };
}

export type NewEntry = Omit<HealthCheckEntry, 'id'> | Omit<OccupationalHealthcareEntry, 'id'> | Omit<HospitalEntry, 'id'>;

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export type NewPatient = Omit<Patient, 'id'>;

export type PublicPatient = Omit<Patient, 'ssn'>;