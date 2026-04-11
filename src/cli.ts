import { Command } from 'commander';
import { start } from './commands/start.js';
import { stop } from './commands/stop.js';
import { status } from './commands/status.js';
import { list } from './commands/list.js';
import { exportCmd } from './commands/export.js';

const program = new Command();

program
  .name('timetrack')
  .description('Billable time tracker for freelancers')
  .version('1.0.0');

program
  .command('start <project>')
  .description('Start tracking time for a project')
  .option('-t, --tag <tag>', 'Add a tag', 'general')
  .option('-n, --note <note>', 'Add a note')
  .action(start);

program
  .command('stop')
  .description('Stop tracking current session')
  .action(stop);

program
  .command('status')
  .description('Show current tracking status')
  .action(status);

program
  .command('list')
  .description('List all tracked sessions')
  .option('-p, --project <name>', 'Filter by project')
  .option('-d, --days <number>', 'Days to go back', '7')
  .action(list);

program
  .command('export')
  .description('Export sessions to CSV or JSON')
  .option('-f, --format <format>', 'csv or json', 'csv')
  .option('-o, --output <file>', 'Output file')
  .option('-p, --project <name>', 'Filter by project')
  .action(exportCmd);

program.parse();