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

    return new Promise((resolve,reject)=> {

        exec(`cd ${dr} && g++ ${filepath} -o ${outpath} && ${outpath} < ${inputFile}`,(error,stdout,stderr)=>{
            if(error){
                reject({error,stderr});
            }
            resolve(stdout);

        })

    })

}
module.exports = {
    executeCpp
}