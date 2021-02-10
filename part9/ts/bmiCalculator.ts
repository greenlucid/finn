type BmiResult = 'Obese' | 'Overweight' | 'Normal' | 'Underweight';



const bmi = (height: number, weight: number): number => {
  const meters = height / 100;
  const result = weight / meters ** 2;
  return result;
};

export const calculateBmi = (height: number, weight: number): BmiResult => {
  const index = bmi(height, weight);
  if (index > 30) return 'Obese';
  else if (index > 25) return 'Overweight';
  else if (index > 18.5) return 'Normal';
  else return 'Underweight';
};
/*
interface BmiValues {
  height: number;
  weight: number;
}

const parseBmiArguments = (args: Array<string>): BmiValues => {  
  if (args.length < 2) throw new Error('Not enough arguments');
  if (args.length > 2) throw new Error('Too many arguments');
  if ( !isNaN(Number(args[0])) && !isNaN(Number(args[1])) ) {
    return {
      height: Number(args[0]),
      weight: Number(args[1])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

try {
  const realArgs = process.argv.slice(2);
  const { height, weight } = parseBmiArguments(realArgs);
  console.log( calculateBmi(height, weight) );
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}
*/