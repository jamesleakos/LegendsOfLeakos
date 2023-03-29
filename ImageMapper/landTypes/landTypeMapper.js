const fs = require('fs-extra');
const path = require('path');

async function buildNestedObject(dir, relativePath = '') {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  if (!entries.length) return [];
  let obj = {};

  for (const entry of entries) {
    if (entry.name === '.DS_Store') continue;
    if (entry.isFile() && !Array.isArray(obj)) obj = [];
    if (entry.isDirectory() && Array.isArray(obj))
      throw new Error(
        'Cannot mix files and directories in the same directory.'
      );

    const entryPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      obj[entry.name] = await buildNestedObject(
        entryPath,
        relativePath + '/' + entry.name
      );
    } else if (entry.isFile()) {
      obj.push(relativePath + '/' + entry.name);
    }
  }

  return obj;
}

(async () => {
  const rootDir = './images';
  const nestedObject = await buildNestedObject(rootDir);
  console.log(JSON.stringify(nestedObject, null, 2));
})();
