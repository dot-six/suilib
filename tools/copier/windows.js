'use strict';

const fs = require('fs').promises;
const path = require('path');

const baseDir = path.join(__dirname, '../../dest');
const targetDir = path.join(__dirname, '../../third_party/sdl/platform/win');

exports.move = async function move(spinner) {
  spinner.start('Moving SDL files...');
  await fs.rm(targetDir, { recursive: true, force: true });
  await fs.mkdir(targetDir, { recursive: true });

  const srcLibDir = path.join(baseDir, '');
  const destLibDir = path.join(targetDir, '');
  const moves = [];
  const libs = await fs.readdir(srcLibDir);
  await fs.mkdir(destLibDir, { recursive: true });
  for (const lib of libs) {
    if (lib.endsWith('.dll')) {
      moves.push(
        fs.rename(path.join(srcLibDir, lib), path.join(destLibDir, lib)));
    }
  }
  await Promise.all(moves);

  spinner.stop(`[sdl] SDL files moved to ${destLibDir}.`);
};
