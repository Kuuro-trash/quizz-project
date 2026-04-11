const fs = require('fs');
const path = require('path');

const historyPath = 'C:\\Users\\Hung\\AppData\\Roaming\\Code\\User\\History';
let recoveredCount = 0;

// April 9, 2026 -> 1775700000000
const thresholdDate = 1775700000000;

function walkHistory() {
  const dirs = fs.readdirSync(historyPath).filter(d => fs.statSync(path.join(historyPath, d)).isDirectory());
  for (const dir of dirs) {
    const entriesPath = path.join(historyPath, dir, 'entries.json');
    if (!fs.existsSync(entriesPath)) continue;

    try {
      const data = JSON.parse(fs.readFileSync(entriesPath, 'utf8'));
      // Filter only MajorProject files
      if (!data.resource || !data.resource.toLowerCase().includes('majorproject/quiz-frontend')) continue;

      let targetPath = decodeURIComponent(data.resource.replace(/^file:\/\/\/?/, ''));
      // on windows it might be c%3a => C:.
      targetPath = targetPath.replace(/^([a-z])\w*:/i, (match) => match.toUpperCase());

      const entries = data.entries || [];
      if (entries.length === 0) continue;

      // Find the LATEST valid entry (skip empty scaffolds if any just in case)
      let validEntry = null;
      for (let i = entries.length - 1; i >= 0; i--) {
        const entry = entries[i];
        if (true) {
          const filePath = path.join(historyPath, dir, entry.id);
          if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf8');
            // If the content is just a scaffold, skip it (like empty class)
            // Scaffold length might be < 150 chars total
            if (content.length > 200) {
              validEntry = filePath;
              break;
            }
          }
        }
      }

      if (validEntry) {
        // Recover it!
        if (!fs.existsSync(path.dirname(targetPath))) {
          fs.mkdirSync(path.dirname(targetPath), {recursive: true});
        }
        fs.copyFileSync(validEntry, targetPath);
        console.log(`Recovered: ${targetPath}`);
        recoveredCount++;
      }

    } catch (err) {
      // Ignore parse err
    }
  }
}

walkHistory();
console.log(`\nSuccess! Recovered ${recoveredCount} files from VS Code Local History right before the wipe.`);