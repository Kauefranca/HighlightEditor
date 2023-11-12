const util = require('util');
const exec = util.promisify(require('child_process').exec);
const path = require('path');
const prompt = require('prompt-sync')({ sigint: true });

const ffmpegTrimmer = (videoPath, start, end, outputPath) => `ffmpeg -ss ${start} -to ${end} -i "${videoPath}" -c copy "${outputPath}" -y`;

const isTime = (input) => input.test(/^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/gm);

const getInput = (text) => {
    while (true) {
        let answer = prompt(`${text}: `);
        if (isTime) return answer;
    };
};

const videoPath = (process.argv.slice(2, process.argv.length)).join(' ');

;(async() => {
    const ignore = prompt('Deseja pular esse vídeo?(s/n): ');
    if (ignore == 's') {
        await exec(`taskkill /im vlc.exe /F`);
        process.exit(0);
    };

    const start = getInput('Começo do clipe');
    const end = getInput('Fim do clipe');
    const name = prompt('Nome do clipe: ');
    
    const outputPath = path.join(__dirname, 'trimmed', `${name}.mp4`);

    await exec(`taskkill /im vlc.exe /F`);
    await exec(`${ffmpegTrimmer(videoPath, start, end, outputPath)}`);

    process.exit(0);
})();