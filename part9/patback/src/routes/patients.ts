/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import express from 'express';

import patientService from '../services/patientService';
import { parseNewPatient, parseNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  const patients = patientService.getAllVisiblePatients();
  return res.json(patients);
});

router.get('/:id', (req, res) => {
  const patient = patientService.getPatient(req.params.id);
  if (!patient) {
    return res.status(404).json({ error: `Patient with id:${req.params.id} not found `});
  }
  return res.json(patient);
});

router.post('/', (req, res) => {
  try {
    const newPatient = parseNewPatient(req.body);
    const patient = patientService.addPatient(newPatient);
    return res.json(patient);
  } catch(e) {
    return res.status(400).json({ error: e.message });
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const newEntry = parseNewEntry(req.body);
    const id = req.params.id;
    const entry = patientService.addEntryToPatient(newEntry, id);
    return res.json(entry);
  } catch(e) {
    return res.status(400).json({ error: e.message });
  }
});

export default router;