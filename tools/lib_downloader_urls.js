'use strict';

const spidex = require('spidex');

const urls = {
  win32:
  'https://github.com/libsdl-org/SDL/releases/download/release-2.28.5/' +
    'SDL2-2.28.5-win32-x86.zip',
  win64:
  'https://github.com/libsdl-org/SDL/releases/download/release-2.28.5/' +
    'SDL2-2.28.5-win32-x64.zip',
};

exports.get = async function get() {
  let resolve;
  const promise = new Promise(res => {
    resolve = res;
  });

  spidex.get('https://ip.tool.lu/', (content, status) => {
    if (status !== 200) {
      console.warn(
        '[sdl] Failed to get ip address, fallback to original ' +
        'download URL.');
      resolve(urls);
      return;
    }

    // https://doc.fastgit.org/zh-cn/guide.html
    console.log(content);
    if (content.includes('中国')) {
      for (const key in urls) {
        if (!urls.hasOwnProperty(key)) {
          continue;
        }

        urls[key] = urls[key].replace(
          'https://github.com/',
          'https://download.fastgit.org/');
      }
    }

    resolve(urls);
  }).on('error', err => {
    console.warn(
      `[sdl] Cannot get your location with IP (${err.message})` +
      ', fallback to original download URL.');
    resolve(urls);
  });

  return promise;
};
