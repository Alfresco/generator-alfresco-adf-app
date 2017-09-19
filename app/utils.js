const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readDir = promisify(fs.readdir);
const stat = promisify(fs.stat);

class Utils {

  async fileExists(targetPath) {
    try {
      let stats = await stat(targetPath);
      return stats !== null;
    } catch (err) {
      if (err.code === 'ENOENT') {
        console.log('File not found', targetPath);
      }
      return false;
    }
  }

  isPackageValid(json) {
    return json && json.name && json.version;
  }

  async getBluprints() {
    const result = [];
    const dir = path.join(__dirname, 'templates');

    try {
      const entries = await readDir(dir);

      for (let entryName of entries) {
        const packagePath = path.join(dir, entryName, 'package.json');
        const exists = await this.fileExists(packagePath);

        if (exists) {
          const packageInfo = require(packagePath);

          if (this.isPackageValid(packageInfo)) {
            result.push({
              name: packageInfo.name,
              version: packageInfo.version,
              displayName: `${packageInfo.name} (${packageInfo.version}): ${packageInfo.description || ''}`,
              path: path.join(dir, entryName)
            });
          }
        }
      }
    } catch (err) {
      console.log(err);
    }

    return result;
  }

}

module.exports = new Utils();
