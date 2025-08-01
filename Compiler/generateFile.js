const fs = require('fs');
const path = require('path');
const { v4: uuid } = require('uuid');

const dirCodes = path.join(__dirname,"codes");//C:\Users\nitin\OneDrive\Desktop\OJ_PROJECT\Compiler\codes.

if(!fs.existsSync(dirCodes))
{
    fs.mkdirSync(dirCodes,{recursive: true});
}




const generateFile = (language,code)=>{
    const jobId = uuid();
    const fileName = `${jobId}.${language}`;
    const filePath = path.join(dirCodes,fileName);
    fs.writeFileSync(filePath,code);
    return filePath;
 }

module.exports = {
    generateFile
}