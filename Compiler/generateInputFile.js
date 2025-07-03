const fs = require('fs');
const path = require('path');
const { v4: uuid } = require('uuid');

const dirInputs = path.join(__dirname,"inputs");//C:\Users\nitin\OneDrive\Desktop\OJ_PROJECT\Compiler\codes.

if(!fs.existsSync(dirInputs))
{
    fs.mkdirSync(dirInputs,{recursive: true});
}




const generateInputFile = (input)=>{

    const jobID = uuid();
    const inputFileName = `${jobID}.txt`
    const inputFilePath = path.join(dirInputs,inputFileName);
    fs.writeFileSync(inputFilePath,input);
    return inputFilePath;
    
 }

module.exports = {
    generateInputFile
}