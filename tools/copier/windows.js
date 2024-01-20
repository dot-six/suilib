'use strict';

const fs = require('fs').promises;
const path = require('path');

const baseDir = path.join(__dirname, '../../dest');
const targetDir = path.join(__dirname, '../../third_party');

exports.move = async function move(spinner) {
  spinner.start('Moving SDL files...');
  await fs.rm(targetDir, { recursive: true, force: true });
  await fs.mkdir(targetDir, { recursive: true });

  const srcLibDir = path.join(baseDir, 'lib', 'x64');
  const destLibDir = path.join(targetDir, '/sdl/platform/win/lib');
  const moves = [];
  const libs = await fs.readdir(srcLibDir);
  await fs.mkdir(destLibDir, { recursive: true });
  for (const lib of libs) {
    if (lib.endsWith('.dll') || lib.endsWith('.lib')) {
      moves.push(
        fs.rename(path.join(srcLibDir, lib), path.join(destLibDir, lib)));
    }
  }

  const srcIncludes = path.join(baseDir, 'include');
  const destIncludes = path.join(targetDir, 'include');
  const incls = await fs.readdir(srcIncludes);
  await fs.mkdir(destIncludes, { recursive: true });
  for (const h of incls) {
    moves.push(fs.rename(path.join(srcIncludes, h), path.join(destIncludes, h)));
  }

  await Promise.all(moves);

  spinner.stop(`[sdl] SDL files moved to ${destLibDir}.`);
};
