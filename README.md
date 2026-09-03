# TimeTrack

> Billable time tracker for freelancers.

## Install

```bash
npm install -g @arc2898/timetrack
```

## Commands

```bash
timetrack start <project>     # Start tracking a project
timetrack start client-a -t design -n "Homepage redesign"
timetrack stop                # Stop current session
timetrack status              # Show active session
timetrack list                # List recent sessions
timetrack list -p client-a    # Filter by project
timetrack list -d 30          # Last 30 days
timetrack export              # Export to CSV
timetrack export -f json -o report.json
```

## Features

- Track time by project with tags
- Notes per session
- Export to CSV or JSON
- Filter by project or date range
- Stored in `~/.timetrack/sessions.json`

## License

MIT
## Development

Run `npm ci`, `npm run build`, and `npm test` before publishing changes. Use a temporary project name and note when manually checking session start, stop, list, and export flows.
