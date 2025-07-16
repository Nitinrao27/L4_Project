const fs = require('fs')
const path = require('path')
const {exec}  = require('child_process')

const outputPath = path.join(__dirname,"outputs");//C:\Users\nitin\OneDrive\Desktop\OJ_PROJECT\Compiler\outputs.

if(!fs.existsSync(outputPath))
{
    fs.mkdirSync(outputPath,{recursive: true});
}


const executeCpp = async(filepath,inputFile)=>{

    const jobId = path.basename(filepath).split('.')[0];//to extract first unique id of our code file.
    const outpath = path.join(outputPath,`${jobId}.out`);
    const dr = path.dirname(outputPath);

    return new Promise((resolve, reject) => {
  exec(
    `cd ${dr} && g++ "${filepath}" -o "${outpath}" && "${outpath}" < "${inputFile}"`,
    { timeout: 50000 },
    (error, stdout, stderr) => {
      // Always clean up binary after attempt
      if (fs.existsSync(outpath)) fs.unlinkSync(outpath);

      if (error) {
        if (error.killed) {
          return reject({ error, stderr: "Time Limit Exceeded" });
        }

        const filtered = stderr
          .split('\n')
          .filter(line => line.toLowerCase().includes('error:'))
          .join('\n')
          .trim();

        const minimalError = filtered || stderr.split('\n').slice(0, 10).join('\n');
        return reject({ error, stderr: minimalError });
      } else {
        resolve(stdout);
      }
    }
  );
});

}
module.exports = {
    executeCpp
}