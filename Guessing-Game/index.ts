#!/usr/bin/env node

import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';
import inquirer from 'inquirer';
async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow('Welcome to Guessing Game!');
  console.log(`${chalk.bgBlue('Hint: Number is between 1 and 100.')}`)
  rainbowTitle.stop();
}



export function validateVal() {
  return (val: string) => {
    const isValid = Boolean(val);
    return isValid || 'Please enter a number';
  };
}

export function presentAnswer(result: number) {
  console.log(`${chalk.bgBlue('Answer')}: ${result}`);
}

export const sleep = (ms: number = 2000) => new Promise(resolve => setTimeout(resolve, ms));

export const wantContinue = async (): Promise<void | undefined> => {
  const { wantContinue } = await inquirer.prompt({
    type: 'confirm',
    name: 'wantContinue',
    message: 'Would you like to continue?',
    default: true
  });
  if (wantContinue) {
    return promptQuestions();
  }
  console.log(chalk.green('Thanks for playing my game!', ` Your total score is: ${score} out of ${questions} questions`));
  return;
}

const randomNumber = () => {
  return Math.floor(Math.random() * 100) + 1
}

let score = 0
let questions = 0
export const performCalculation = ({
  first_num,
}: {
  first_num: number
}) => {
  if (first_num === randomNumber()) {
    console.log(chalk.green('Congratulations! You guessed it right!'));
    score++
    questions++
    return wantContinue();
  } else {
    console.log(chalk.red('Oops! You guessed it wrong!', `${randomNumber()} is the correct answer`));
    questions++
    return wantContinue();
  }
};



export default async function promptQuestions() {
  const answers = await inquirer.prompt({
    type: 'input',
    name: 'first_num',
    message: 'Enter a first number:',
    filter: (val: string) => Number(val),
    validate: validateVal()
  },);
  return performCalculation(answers.first_num as { first_num: number });
}

await welcome();
await promptQuestions();