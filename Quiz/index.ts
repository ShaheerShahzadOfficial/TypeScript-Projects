import inquirer from 'inquirer';

interface Question {
  type: 'list';
  name: string;
  message: string;
  choices: string[];
}

const questions: Question[] = [
  {
    type: 'list',
    name: 'question1',
    message: 'What is the capital of France?',
    choices: ['London', 'Paris', 'Berlin', 'Madrid'],
  },
  {
    type: 'list',
    name: 'question2',
    message: 'Inside which HTML element do we put the JavaScript?',
    choices: ['<js>', '<scripting>', '<script>', '<javascript>'],
  },
  {
    type: 'list',
    name: 'question3',
    message: 'What is a correct syntax to output "Hello World" in Python?',
    choices: ['p("Hello world")', 'echo("Hello World")', 'System.out.println("Hello World")', 'print("Hello World")'],
  },
  {
    type: 'list',
    name: 'question4',
    message: 'Which SQL statement is used to create a new table in the database?',
    choices: ['CREATE TABLE', 'CREATE DATABASE', 'ADD TABLE', 'NEW TABLE'],
  },
];

function calculateScore(answers: any, correctAnswers: string[]): number {
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    if (answers[questions[i].name] === correctAnswers[i]) {
      score++;
    }
  }
  return score;
}

async function main() {
  const correctAnswers = ['Paris', '<script>', 'print("Hello World")', 'CREATE TABLE'];
  const answers = await inquirer.prompt(questions);

  const score = calculateScore(answers, correctAnswers);

  console.log(`You answered ${score} out of ${questions.length} questions correctly.`);

  if (score === questions.length) {
    console.log('Congratulations! You got a perfect score.');
  } else if (score > questions.length / 2) {
    console.log('Good job! You did well.');
  } else {
    console.log("Don't worry, keep practicing!");
  }
}

main();
