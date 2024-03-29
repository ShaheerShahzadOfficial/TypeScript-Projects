import chalk from 'chalk';
import inquirer from 'inquirer';

interface ICustomer {
  First_Name: string;
  Last_Name: string;
  gender: string;
  age: number;
  phone: string;
  balance: number;
}

const Customer: ICustomer[] = []

const wantContinue = async (): Promise<void | undefined> => {
  const { wantContinue } = await inquirer.prompt({
    type: 'confirm',
    name: 'wantContinue',
    message: 'Would you like to continue?',
    default: true
  });
  if (wantContinue) {
    return main();
  }
  console.log(chalk.green('Thanks for using my ATM Good Bye !'));
  return;
}

class Bank {

  addCustomer(customer: ICustomer) {
    Customer.push(customer);
    console.log(chalk.greenBright(`Customer is created successfully`));
    wantContinue()
  }

  removeCustomer(customer: ICustomer) {
    const index = Customer.indexOf(customer);
    if (index > -1) {
      Customer.splice(index, 1);
      console.log(chalk.greenBright(`Customer is removed successfully`));
      wantContinue()
    }
  }

  deposit(customer: ICustomer, amount: number) {
    const index = Customer.indexOf(customer);
    if (index > -1) {
      Customer[index].balance += amount;
      console.log(chalk.greenBright("Amount deposited successfully"));
      console.log(chalk.blueBright(`Your new balance is ${Customer[index].balance}`));
      wantContinue()
    }
  }

  withdraw(customer: ICustomer, amount: number) {
    const index = Customer.indexOf(customer);

    if (index > -1) {
      if (customer?.balance === 0) {
        console.log(chalk.redBright("Your balance is zero, please add some money"));
      }

      if (amount > customer?.balance) {
        console.log(chalk.redBright("Insufficient Balance"));
      }
      Customer[index].balance -= amount;
      console.log(chalk.greenBright("Amount withdrawn successfully"));
      console.log(chalk.blueBright(`Your new balance is ${Customer[index].balance}`));
      wantContinue()
    }
  }

}

const AddCustomer = async (bank: Bank) => {

  const answers = await inquirer.prompt([
    {
      name: 'firstName',
      message: 'Enter your first name',
      type: 'input',
      validate(input) {
        if (!input) {
          return 'Please enter your first name';
        }
        return true;
      },
    },
    {
      name: 'lastName',
      message: 'Enter your last name',
      type: 'input',
      validate(input) {
        if (!input) {
          return 'Please enter your last name';
        }
        return true;
      },
    },
    {
      name: 'gender',
      message: 'Enter your gender',
      type: 'list',
      choices: ['Male', 'Female']
    },
    {
      name: 'age',
      message: 'Enter your age',
      type: 'number',
      validate(input) {
        if (!input) {
          return 'Please enter your age';
        }
        if (input <= 0) {
          return 'Please enter a valid amount';
        }
        return true;
      },
    },
    {
      name: 'phone',
      message: 'Enter your phone number',
      type: 'input',
      validate(input) {
        if (!input) {
          return 'Please enter your phone number';
        }
        return true;
      },
    },
  ]);

  const customer: ICustomer = {
    First_Name: answers.firstName,
    Last_Name: answers.lastName,
    gender: answers.gender,
    age: answers.age,
    phone: answers.phone,
    balance: 0
  };

  bank.addCustomer(customer);

}


const withdrawCashAmount = async (bank: Bank) => {

  const { customer } = await inquirer.prompt({
    type: 'list',
    name: 'customer',
    message: 'Select customer?',
    choices: Customer.map((customer, index) => `${index + 1} ${customer.First_Name} ${customer.phone}`),
  });

  const SelectedCustomer = Customer[(parseInt(customer.split(' ')[0]) - 1)]

  const { amount } = await inquirer.prompt({
    type: 'number',
    name: 'amount',
    message: 'Enter the amount to withdraw:',
  });

  bank.withdraw(SelectedCustomer, amount);

}


const depositCashAmount = async (bank: Bank) => {

  const { customer } = await inquirer.prompt({
    type: 'list',
    name: 'customer',
    message: 'Select customer?',
    choices: Customer.map((customer, index) => `${index + 1} ${customer.First_Name} ${customer.phone}`),
  });

  const SelectedCustomer = Customer[(parseInt(customer.split(' ')[0]) - 1)]
  console.log(SelectedCustomer)
  const { amount } = await inquirer.prompt({
    type: 'number',
    name: 'amount',
    message: 'Enter the amount to Deposit:',
  });

  bank.deposit(SelectedCustomer, amount);

}

const removeCustomer = async (bank: Bank) => {
  const { customer } = await inquirer.prompt({
    type: 'list',
    name: 'customer',
    message: 'Select customer?',
    choices: Customer.map((customer, index) => `${index + 1} ${customer.First_Name} ${customer.phone}`),
  });

  const SelectedCustomer = Customer[(parseInt(customer.split(' ')[0])-1)]

  bank.removeCustomer(SelectedCustomer);

}


async function main() {
  const bank = new Bank();

  const { choice } = await inquirer.prompt({
    type: 'list',
    name: 'choice',
    message: 'Which task do you want to perform:',
    choices: [
      'Add Customer',
      'Remove Customer',
      'Deposit',
      'Withdraw',
      'Exit'
    ]
  });


  switch (choice) {
    case 'Add Customer':
      AddCustomer(bank)
      break;
    case 'Remove Customer':
      removeCustomer(bank)
      break;
    case 'Deposit':
      depositCashAmount(bank)
      break;
    case 'Withdraw':
      withdrawCashAmount(bank)
      break;
    case 'Exit':
      break

    default:
      break;
  }


}

main();
