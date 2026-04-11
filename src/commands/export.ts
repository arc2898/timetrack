import { getSessions } from '../lib/store.js';
import { writeFileSync } from 'fs';

export function exportCmd(options: { format: string; output?: string; project?: string }) {
  const sessions = getSessions(options.project, 365);
  let content: string;

  if (options.format === 'csv') {
    const header = 'id,project,tag,note,startTime,endTime,duration';
    const rows = sessions.map(s =>
      `"${s.id}","${s.project}","${s.tag}","${s.note}",${s.startTime},${s.endTime || ''},${s.duration || ''}`
    );
    content = [header, ...rows].join('\n');
  } else {
    content = JSON.stringify(sessions, null, 2);
  }

  if (options.output) {
    writeFileSync(options.output, content);
    console.log(`Exported ${sessions.length} sessions to ${options.output}`);
  } else {
    console.log(content);
  }
}