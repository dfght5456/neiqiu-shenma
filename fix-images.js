const fs = require('fs');
const path = 'c:/Users/li12320/Desktop/nq/frontend/public/content.json';
let content = fs.readFileSync(path, 'utf8');

const replacements = {
  '/uploads/微信图片_20251127025139_150_2.jpg': '/uploads/img1.jpg',
  '/uploads/微信图片_20251127025140_151_2.jpg': '/uploads/img2.jpg',
  '/uploads/微信图片_20251127025142_152_2.jpg': '/uploads/img3.jpg',
  '/uploads/微信图片_20251127025143_153_2.jpg': '/uploads/img4.jpg',
  '/uploads/微信图片_20251127025145_154_2.jpg': '/uploads/img5.jpg',
  '/uploads/微信图片_20251127025146_155_2.jpg': '/uploads/img6.jpg',
  '/uploads/微信图片_20251127025149_156_2.jpg': '/uploads/img7.jpg'
};

let count = 0;
for (const [oldPath, newPath] of Object.entries(replacements)) {
  const regex = new RegExp(oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
  const matches = content.match(regex);
  if (matches) count += matches.length;
  content = content.replace(regex, newPath);
}

fs.writeFileSync(path, content, 'utf8');
console.log('Done! Replaced', count, 'occurrences');