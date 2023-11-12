const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fs = require('fs');
const path = require('path');
const { homedir } = require('os');

const VLC_PATH = path.join('C:/', 'Program Files', 'VideoLAN', 'VLC', 'vlc.exe');
const VIDEOS_PATH = path.join(homedir(), 'Videos');
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const allVideosPath = [];

// Remover não diretórios da lista.
const parentFolder = fs.readdirSync(VIDEOS_PATH)
    .filter((a) => !a.includes('.'));

parentFolder.forEach((folder) => {
    let dir = fs.readdirSync(path.join(VIDEOS_PATH, folder))
        .filter((a) => a.endsWith('.mp4'));
    
    dir.forEach((file) => {
        allVideosPath.push(path.join(VIDEOS_PATH, folder, file));
    });
});

;(async () => {
    for (let videoPath of allVideosPath) {
        await sleep(500);

        exec(`"${VLC_PATH}" "${videoPath}"`)
        .catch((err) => undefined);


        await sleep(500);
        await exec(`start cmd.exe /C node "${path.join(__dirname, 'getInput.js')}" ${videoPath}`);
    };
})();
