import chalk from 'chalk';
import { stopSession, formatDuration } from '../lib/store.js';

export function stop() {
  const session = stopSession();
  if (!session) {
    console.log('No active session to stop.');
    return;
  }
  console.log(chalk.green(`Stopped: ${session.project}`));
  console.log(chalk.cyan(`Duration: ${formatDuration(session.duration!)}`));
  console.log(chalk.gray(`Logged to ${session.project} [${session.tag}]`));
}