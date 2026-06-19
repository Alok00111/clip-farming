const fs = require('fs');
let svg = '<svg xmlns="http://www.w3.org/2000/svg" width="1500" height="1400">';
for (let r = 0; r < 7; r++) {
  for (let c = 0; c < 15; c++) {
    const x = c * 100 + 50;
    const y = r * 200 + 100;
    const color = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    // Draw a simple person
    svg += `<circle cx="${x}" cy="${y-40}" r="30" fill="${color}"/>`;
    svg += `<rect x="${x-25}" y="${y-10}" width="50" height="80" fill="${color}" rx="10"/>`;
    svg += `<rect x="${x-15}" y="${y+70}" width="10" height="40" fill="${color}" rx="5"/>`;
    svg += `<rect x="${x+5}" y="${y+70}" width="10" height="40" fill="${color}" rx="5"/>`;
  }
}
svg += '</svg>';
fs.mkdirSync('public/images/peeps', { recursive: true });
fs.writeFileSync('public/images/peeps/all-peeps.svg', svg);
