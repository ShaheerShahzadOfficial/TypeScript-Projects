import chalk from 'chalk';
import inquirer from 'inquirer';
import chalkAnimation from 'chalk-animation';


enum EnemyType {
  SKELETON = "Skeleton",
  ZOMBIE = "Zombie",
  VAMPIRE = "Vampire",
  WEREWOLF = "Werewolf",
  DEMON = "Demon",
  GIANT = "Giant",
}

interface IEnemy {
  type: EnemyType;
  health: number;
}

interface IPlayer {
  name: string;
  health: number;
  healPotion: number;
}

const maxHitPoint = 50
const maxEnemyHitPoint = 30

const createEnemy = (): IEnemy => {
  const enemyTypes: EnemyType[] = [
    EnemyType.SKELETON,
    EnemyType.ZOMBIE,
    EnemyType.VAMPIRE,
    EnemyType.WEREWOLF,
    EnemyType.DEMON,
    EnemyType.GIANT,
  ];
  const enemyType = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
  const health = Math.floor(Math.random() * 100) + 1;
  return { type: enemyType, health };
};


export const wantContinue = async (): Promise<void | undefined> => {
  const { wantContinue } = await inquirer.prompt({
    type: 'confirm',
    name: 'wantContinue',
    message: 'Would you like to continue?',
    default: true
  });
  if (wantContinue) {
    return startGame(player);
  }
  console.log(chalk.green('Thanks for using my Calculator!'));
  return;
}

const startGame = async (player: IPlayer): Promise<void> => {

  const enemy = createEnemy();
  console.log(
    `An enemy appeared: ${enemy.type} with ${enemy.health} health.`
  );
  console.log(`What do you want to do ${player.name}? Your HP is ${player.health}`);
  console.log("1. Fight");
  console.log("2. Heal yourself");
  console.log("3. Run away");

  const { action } = await inquirer.prompt({
    name: "action",
    type: "number",
    message: "Enter your choice: ",
  })

  switch (action) {
    case 1:
      fight(player, enemy);
      break;
    case 2:
      healSelf(player, enemy);
      break;
    case 3:
      runAway(player, enemy);
      break;
    default:
      console.log("Invalid choice");
      break;
  }

};


const EnemyAttack = () => {
  return Math.floor(Math.random() * maxEnemyHitPoint) + 2
}

const UserAttack = () => {
  return Math.ceil(Math.random() * maxHitPoint) + 10
}

const fight = (players: IPlayer, enemys: IEnemy): void => {

  if (enemys.health <= 0) {
    console.log(`You have defeated the ${enemys.type}.`);
  }

  while (players.health > 0 && enemys.health > 0) {

    if (players.health >= 0) {
      const userAttack = UserAttack()
      enemys.health = Number(enemys.health) - Number(userAttack)
      console.log(`The ${enemys.type} got attacked with ${userAttack}. ${enemys.type} health is reduced to ${enemys.health <= 0 ? 0 : enemys.health}.`);
    }

    if (enemys.health >= 0) {
      const enemyAttack = EnemyAttack()
      players.health = Number(players.health) - Number(enemyAttack)
      console.log(`You got attacked with ${enemyAttack}. Your health is reduced ${players.health <= 0 ? 0 : players.health}.`);
    }

    if (enemys.health <= 0) {
      console.log(chalk.greenBright(`You have defeated the ${enemys.type}.`));
      if (players.health <= 30) {
        console.log(chalk.blue("You have got a heal potion!"));
        players.healPotion += 1
      }
      wantContinue()
    }
    if (players.health <= 0) {
      console.log(chalk.red(`You have been defeated by the ${enemys.type}.`));
    }
  }

};

const healSelf = (players: IPlayer, enemys: IEnemy): void => {

  if (player.healPotion <= 0) {
    console.log("You don't have any heal potion left.");
    fight(players, enemys)
  }

  player.health = player.health + 50
  player.healPotion = player.healPotion - 1

  console.log(`You have healed yourself. Your health is now ${player.health}.`);
  fight(players, enemys)
};

const runAway = (players: IPlayer, enemys: IEnemy): void => {

  console.log(`You have dodged ${enemys.type}.`);
  startGame(players)

};

const player: IPlayer = {
  name: "Player",
  health: 100,
  healPotion: 4,
};


// when game starts, get a random enemy
// const enemy = createEnemy();
// console.log(
//   `An enemy appeared: ${enemy.type} with ${enemy.health} health.`
// );
// console.log("What do you want to do?");
// console.log("1. Fight");
// console.log("2. Heal yourself");
// console.log("3. Run away");



const main = async () => {
  chalkAnimation.rainbow("Welcome to the adventure game!").start();
  // console.log(chalk.greenBright("Welcome to the adventure game!"));
  const { name } = await inquirer.prompt({
    name: "name",
    type: "input",
    message: "What is your name?",
  })

  console.log(chalk.cyanBright(`Welcome ${name}!`));
  player.name = name

  startGame(player)
}


main()
