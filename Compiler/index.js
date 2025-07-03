const express = require('express');
const app = express();
const PORT = 5000;
const {generateFile} = require('./generateFile')
const {generateInputFile} = require('./generateInputFile')
const cors = require('cors');
const {executeCpp} = require('./executeCpp')
const {generateAiResponse} = require('./generateAiResponse')
const removeMarkdown = require('remove-markdown');


app.use(express.urlencoded({extended:false}));
app.use(cors());
app.use(express.json());



app.get('/',(req,res)=>{
    res.send('Hello duniya!')
});

app.post('/run', async(req,res)=>{
    
    const {language = 'cpp',code, input} = req.body;

    if(code === undefined)
    {
        return res.status(404).json({
            success : 'false',
            error : 'empty code body'
        })
    }

    try {
       const filePath = generateFile(language,code);
       const inputFile = generateInputFile(input);
       const output = await executeCpp(filePath,inputFile);
       res.json({output});


    } catch (err) {

        return res.status(500).json({
            success : 'false',
            error : err.message
        })
        
    }

     

})

app.post('/ai-review',async (req,res)=>{
    const {code} = req.body;
    if(code === undefined)
    {
        return res.status(404).json({
            success : 'false',
            error : 'empty code body'
        });
    }
    try {
        const aiResponse = await generateAiResponse(code);
        res.json({
            success : true,
            aiResponse : removeMarkdown(aiResponse)
        })
        
    } catch (error) {
        console.error('Error executing code : ', error.message);
        
    }

})







app.listen(PORT,()=>console.log(`Server is listining on port ${PORT}`)
)





