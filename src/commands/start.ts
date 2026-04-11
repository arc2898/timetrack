import chalk from 'chalk';
import { startSession } from '../lib/store.js';

export function start(project: string, options: { tag: string; note: string }) {
  const session = startSession(project, options.tag, options.note);
  console.log(chalk.green(`Started tracking: ${project} [${options.tag}]`));
  console.log(chalk.gray(`Session ID: ${session.id}`));
  console.log(chalk.gray('Run `timetrack stop` to end this session.'));
}