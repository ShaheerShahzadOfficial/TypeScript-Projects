import inquirer from 'inquirer';

// Define an interface for currency conversion rates
interface ConversionRates {
  [fromCurrency: string]: { [toCurrency: string]: number };
}

// Conversion rates (example values)
const conversionRates: ConversionRates = {
  PKR: {
    INR: 0.30,
    USD: 0.0036,
    EUR: 0.0033,
    TRY: 0.12,
  },
  INR: {
    PKR: 0.30,
    USD: 0.013,
    EUR: 0.011,
    TRY: 0.21,
  },
  USD: {
    EUR: 0.92,
    TRY: 32.16,
    PKR: 278.25,
    INR: 83.41,
  },
  TRY: {
    PKR: 8.65,
    INR: 2.59,
    USD: 0.031,
    EUR: 0.029,
  },
  EUR: {
    TRY: 34.84,
    PKR: 301.53,
    USD: 1.08,
    INR: 90.39,
  },
};

function convertCurrency(amount: number, fromCurrency: string, toCurrency: string): number {
  if (fromCurrency !== toCurrency && conversionRates[fromCurrency] && conversionRates[fromCurrency][toCurrency]) {
    return amount * conversionRates[fromCurrency][toCurrency];
  } else {
    throw new Error(`Conversion between ${fromCurrency} and ${toCurrency} is not supported`);
  }
}

// Inquirer prompts
const questions = [
  {
    type: 'number',
    name: 'amount',
    message: 'Enter amount:',
  },
  {
    type: 'list',
    name: 'fromCurrency',
    message: 'Select from currency:',
    choices: ['PKR', 'INR', 'USD', 'EUR', 'TRY'],
  },
  {
    type: 'list',
    name: 'toCurrency',
    message: 'Select to currency:',
    choices: ['PKR', 'INR', 'USD', 'EUR', 'TRY'],
  },
];

inquirer.prompt(questions).then((answers) => {
  const { amount, fromCurrency, toCurrency } = answers;
  try {
    const convertedAmount = convertCurrency(amount, fromCurrency, toCurrency);
    console.log(`${amount} ${fromCurrency} is equivalent to ${convertedAmount.toFixed(2)} ${toCurrency}`);
  } catch (error) {
    console.error(error.message);
  }
})
.catch((error) => {
  console.error('Error occurred:', error);
});
