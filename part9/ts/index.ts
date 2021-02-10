import express from 'express';
import { json } from 'body-parser';

import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(json());

app.get('/', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (isNaN(height) || isNaN(weight)) {
    return res.status(400).json({ error: 'Needs numerical weight and height values' });
  }
  const bmi = calculateBmi(height, weight);
  const objectResponse = { height, weight, bmi };
  return res.json(objectResponse);
});

app.post('/exercises', (req, res) => {
  const target = Number(req.body.target); // eslint-disable-line @typescript-eslint/no-unsafe-member-access
  const dailyExercises = req.body.dailyExercises as Array<number>; // eslint-disable-line @typescript-eslint/no-unsafe-member-access
  if (isNaN(target) || dailyExercises.filter(a => isNaN(a)).length > 0) {
    return res.status(400).json({ error: 'Either target or dailyExercises do not contain numbers' });
  }
  const metric = calculateExercises(dailyExercises, target);
  return res.json(metric);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});