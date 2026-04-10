const fs = require('fs');
const path = require('path');

function fixFiles(dir) {
    const items = fs.readdirSync(dir);
    for (const item of items) {
        const p = path.join(dir, item);
        if (fs.statSync(p).isDirectory()) {
            fixFiles(p);
        } else if (p.endsWith('.ts')) {
            let c = fs.readFileSync(p, 'utf8');
            if (c.includes('`')) {
                // Replace ALL backticks with single quotes
                let fixed = c.replace(/`/g, "'");
                fs.writeFileSync(p, fixed, 'utf8');
                console.log('Fixed', p);
            }
        }
    }
}

fixFiles('C:/Users/Hung/MajorProject/Quiz-frontend/src');