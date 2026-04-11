import chalk from 'chalk';
import { getActiveSession, formatDuration } from '../lib/store.js';

export function status() {
  const session = getActiveSession();
  if (!session) {
    console.log(chalk.gray('No active session. Run `timetrack start <project>` to begin.'));
    return;
  }
  const elapsed = Date.now() - session.startTime;
  console.log(chalk.cyan('Currently tracking:'));
  console.log(`  Project: ${chalk.white(session.project)}`);
  console.log(`  Tag:     ${chalk.white(session.tag)}`);
  console.log(`  Started: ${chalk.gray(new Date(session.startTime).toLocaleString())}`);
  console.log(`  Elapsed: ${chalk.yellow(formatDuration(elapsed))}`);
  if (session.note) console.log(`  Note:    ${chalk.gray(session.note)}`);
}