const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fs = require('fs');
const path = require('path');

const VIDEOS_PATH = path.join(__dirname, 'trimmed');

// Remover não diretórios da lista.
const parentFolder = fs.readdirSync(VIDEOS_PATH)
    .filter((a) => a.endsWith('.mp4'));

;(async () => {
    for (let videoPath of parentFolder) {
        let video = path.join(VIDEOS_PATH, videoPath);
        let outputPath = path.join(__dirname, 'compressed', videoPath);

        console.log('Comprimindo o arquivo: ' + video);

        await exec(`ffmpeg -i "${video}" -vcodec hevc_nvenc "${outputPath}" -y`);
    };
})();
