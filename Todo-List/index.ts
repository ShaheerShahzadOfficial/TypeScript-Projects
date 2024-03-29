import inquirer from 'inquirer';
import chalk from 'chalk';
// Interface for user data
interface TODOLIST {
  todo: string
  completed: boolean
}
const pendingtodoList: TODOLIST[] = [];
const completedTodoList: TODOLIST[] = [];

// Function to generate random user data
async function AddTodo() {

  const { title } = await inquirer.prompt({
    type: 'input',
    name: 'title',
    message: 'Enter a new todo:',
  })

  pendingtodoList.push({
    todo: title,
    completed: false
  })

  console.log(chalk.green('Todo added successfully!'))

  wantContinue()
}


const ViewTodo = async () => {
  if (pendingtodoList.length == 0 && completedTodoList.length == 0) {
    console.log(chalk.red('No todos found.'))
  } else {
    console.log(chalk.redBright('Pending Todos:'))
    for (let i = 0; i < pendingtodoList.length; i++) {
      console.log(chalk.cyanBright(`Todo ${i + 1}:`), chalk.blue(pendingtodoList[i].todo), chalk.magentaBright('Not Completed'))
    }
    console.log(chalk.greenBright('Completed Todos:'))
    for (let i = 0; i < completedTodoList.length; i++) {
      console.log(chalk.cyanBright(`Todo ${i + 1}:`), chalk.blue(completedTodoList[i].todo), chalk.magentaBright('Completed'))
    }
  }

  wantContinue()
}


const MarkTODO = async () => {
  if (pendingtodoList.length == 0) {
    console.log(chalk.red('No todos found.'))
  } else {
    const { todoIndex } = await inquirer.prompt({
      type: 'list',
      name: 'todoIndex',
      message: 'Select a todo to mark as completed:',
      choices: pendingtodoList.map((todo, index) => `${index + 1}. ${todo.todo}`),
    })

    const Index = Number(todoIndex?.split('.')[0])
    completedTodoList.push({
      todo: pendingtodoList[Index - 1].todo,
      completed: true
    })
    pendingtodoList.splice(Index - 1, 1)
    console.log(chalk.green('Todo marked as completed successfully!'))
  }

  wantContinue()
}

// Main program flow
async function main() {
  promptQuestions()
}

const promptQuestions = async () => {
  const { action } = await inquirer.prompt({
    type: 'list',
    name: 'action',
    message: 'Select an action:',
    choices: ['Create Todo', "View Todos", "Mark Todo as Completed", 'Exit'],
  })



  switch (action) {
    case 'Create Todo':
      AddTodo();

      break;
    case 'View Todos':
      ViewTodo();
      break;
    case 'Mark Todo as Completed':
      MarkTODO();
      break;
    case 'Exit':
      console.log('Exiting Todo List.');
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
  console.log(chalk.greenBright('Thanks for using my TodoList Good Bye !'));
  return;
}
main();