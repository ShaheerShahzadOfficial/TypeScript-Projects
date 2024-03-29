import inquirer from 'inquirer';
import chalk from 'chalk';
// Interface for user data
interface UserData {
  userId: string;
  pin: number;
  balance: number;
}

// Function to generate random user data
function generateUserData(): UserData {
  return {
    userId: Math.random().toString(36).substring(2, 7).toUpperCase(),
    pin: Math.floor(Math.random() * 9000) + 1000,
    balance: Math.floor(Math.random() * 100000) + 1000,
  };
}

const userData = generateUserData();


// Login function using inquirer
async function login(): Promise<boolean> {
  const { credentials } = await inquirer.prompt({
    type: 'input',
    name: 'credentials',
    message: `Enter user ID and PIN (separated by a space):`,
  });
  const [enteredUserId, enteredPin] = credentials.split(' ');
  console.log(enteredUserId, "enteredUserId", enteredPin)
  return enteredUserId == userData.userId && enteredPin == userData.pin.toString();
}

// ATM functionalities (replace with your actual implementations)
function checkBalance(): void {
  console.log(`Your current balance is ${userData.balance}.`);
  wantContinue()
}

const checkAmount = async () => {
  const { amount } = await inquirer.prompt({
    type: 'number',
    name: 'amount',
    message: 'Enter the amount to withdraw:',
  });

  if (isNaN(amount)) {
    console.log('Please enter a valid number.');
    return false
  } else if (amount <= 0) {
    console.log('Please enter an amount greater than 0.');
    return false
  } else if (amount > userData.balance - 20) {
    console.log('Your Withdrawal Amount should be 20 less than your current balance.');
    return false
  } else {
    return amount
  }
}

async function withdrawCash() {

  let amount = false


  while (!amount) {
    amount = await checkAmount();
  }


  if (typeof amount === 'number') {
    userData.balance -= amount;
    console.log('Withdrawal successful!', `Your new balance is ${userData.balance}.`);
    wantContinue()
  }

}

const checkAmountForDeposit = async () => {
  const { amount } = await inquirer.prompt({
    type: 'number',
    name: 'amount',
    message: 'Enter the amount to Deposit:',
  });

  if (isNaN(amount)) {
    console.log('Please enter a valid number.');
    return false
  } else if (amount <= 0) {
    console.log('Please enter an amount greater than 0.');
    return false
  } else {
    return amount
  }
}

async function depositCash() {

  let amount = false


  while (!amount) {
    amount = await checkAmountForDeposit();
  }


  if (typeof amount === 'number') {
    userData.balance += amount;
    console.log('Deposit successful!', `Your new balance is ${userData.balance}.`);
    wantContinue()
  }


}


// Main program flow
async function main() {
  console.log(`Your randomly generated user ID is: ${userData.userId}`);
  console.log(`Your randomly generated PIN is: ${userData.pin}`); // Remove for security in real applications

  let loggedIn = false;
  while (!loggedIn) {
    loggedIn = await login();
    if (!loggedIn) {
      console.log('Invalid credentials. Please try again.');
    }
  }

  console.log('Login successful!');





  promptQuestions()




}

const promptQuestions = async () => {
  const { action } = await inquirer.prompt({
    type: 'list',
    name: 'action',
    message: 'Select an action:',
    choices: ['Check Balance', 'Withdraw Cash', 'Deposit Cash', 'Exit'],
  })



  switch (action) {
    case 'Check Balance':
      checkBalance();
      break;
    case 'Withdraw Cash':
      withdrawCash();
      break;
    case 'Deposit Cash':
      depositCash();
      break;
    case 'Exit':
      console.log('Exiting ATM.');
      return;
  }
}
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
  console.log(chalk.green('Thanks for using my ATM Good Bye !'));
  return;
}
main();