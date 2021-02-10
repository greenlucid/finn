type Rating = 1 | 2 | 3;

interface ExerciseMetric {
  nDays: number;
  trainingDays: number;
  target: number;
  calculatedAverage: number;
  targetReached: boolean;
  rating: Rating;
  text: string;
}

export const calculateExercises = (hoursPerDay: Array<number>, targetDailyHours: number): ExerciseMetric => {
  const nDays = hoursPerDay.length;
  const trainingDays = hoursPerDay.filter(d => d > 0 ? true : false).length;
  const target = targetDailyHours;
  const calculatedAverage = hoursPerDay.reduce((acc, item) => acc + item, 0) / nDays;
  const targetReached = calculatedAverage >= target;
  let rating: Rating;
  let text;
  if (!targetReached) {
    rating = 1;
    text = 'Target average training hours are not met';
  } else if (trainingDays >= nDays / 1.5) {
    rating = 2;
    text = 'Target hours are met, but training days should be distributed more evenly';
  } else {
    rating = 3;
    text = 'This training schedule is suitable';
  }
  const metric: ExerciseMetric = { nDays, trainingDays, target, calculatedAverage, targetReached, rating, text};
  return metric;
};
/*
interface ScheduleValues {
  hoursPerDay: Array<number>;
  target: number
}

const parseScheduleArguments = (args: Array<string>): ScheduleValues => {
  if (args.length < 2) throw new Error('Not enough arguments');
  if (args.filter(a => isNaN(Number(a)) ? true : false).length !== 0 ) {
    throw new Error('There are non-numbers in the arguments');
  }

  const target = Number(args[0]);
  const hoursPerDay: Array<number> = args.slice(1).map(a => Number(a));

  const schedule:ScheduleValues = { target, hoursPerDay };
  return schedule;
};

try {
  const realArgs = process.argv.slice(2);
  const { target, hoursPerDay } = parseScheduleArguments(realArgs);
  const metric = calculateExercises(hoursPerDay, target);
  console.log(metric);
} catch(error) {
  console.log(error);
}
*/