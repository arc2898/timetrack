import chalk from 'chalk';
import { getSessions, formatDuration, formatDurationHours } from '../lib/store.js';

export function list(options: { project?: string; days: string }) {
  const days = parseInt(options.days);
  const sessions = getSessions(options.project, days);

  if (sessions.length === 0) {
    console.log(`No sessions in the last ${days} days.`);
    return;
  }

  const totalMs = sessions.reduce((sum, s) => sum + (s.duration || 0), 0);
  const projects: Record<string, number> = {};

  console.log(chalk.cyan(`Sessions (last ${days} days):\n`));
  sessions.forEach(s => {
    const date = new Date(s.startTime).toLocaleDateString();
    const time = new Date(s.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    console.log(`${chalk.gray(date)} ${time}  ${chalk.white(s.project.padEnd(15))} ${chalk.yellow(s.tag.padEnd(10))} ${chalk.dim(formatDuration(s.duration || 0))}`);
    projects[s.project] = (projects[s.project] || 0) + (s.duration || 0);
  });

  console.log(chalk.cyan('\nTotals:'));
  for (const [project, ms] of Object.entries(projects)) {
    console.log(`  ${project}: ${chalk.yellow(formatDurationHours(ms))}h`);
  }
  console.log(chalk.cyan(`\nTotal: ${chalk.bold(formatDurationHours(totalMs))}h`));
}