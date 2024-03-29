import inquirer from 'inquirer';

import { DateTime } from 'luxon';

async function createCountdownTimer() {
  const { targetDate, targetTime } = await inquirer.prompt([
    {
      type: 'input',
      name: 'targetDate',
      message: 'Enter the target date (YYYY-MM-DD): ',
      validate: (input) => {
        return /^\d{4}-\d{2}-\d{2}$/.test(input) || 'Invalid date format (YYYY-MM-DD)';
      },
    },
    {
      type: 'input',
      name: 'targetTime',
      message: 'Enter the target time (HH:mm): ',
      validate: (input) => {
        return /^\d{2}:\d{2}$/.test(input) || 'Invalid time format (HH:mm)';
      },
    },
  ]);

  const targetDateTime = DateTime.fromISO(`${targetDate}T${targetTime}`);

  const currentDateTime = DateTime.local();

  const duration = targetDateTime.diff(currentDateTime);

  if (duration.as('milliseconds') < 0) {
    console.log('Target date and time have already passed.');
    return; 
  }
  
  const intervalId = setInterval(() => {
    const remainingDuration = targetDateTime.diff(DateTime.local());

    const days = Math.floor(remainingDuration.as('days'));
    const hours = Math.floor(remainingDuration.as('hours')) % 24;
    const minutes = Math.floor(remainingDuration.as('minutes')) % 60;
    const seconds = Math.floor(remainingDuration.as('seconds')) % 60;

    console.clear();

    console.log(`Countdown Timer: ${days}d ${hours}h ${minutes}m ${seconds}s`);

    // Check if timer has reached zero
    if (remainingDuration.as('milliseconds') <= 0) {
      console.clear();
      clearInterval(intervalId);
      console.log('Target date and time reached!');
    }
  }, 1000); 
}

createCountdownTimer();