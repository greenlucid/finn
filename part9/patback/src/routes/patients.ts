/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import express from 'express';

import patientService from '../services/patientService';
import { parseNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  const patients = patientService.getAllVisiblePatients();
  return res.json(patients);
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

export default router;