const express = require('express');
const app = express();
const PORT = 5000;
const {generateFile} = require('./generateFile')
const cors = require('cors');
const {executeCpp} = require('./executeCpp')

app.use(express.urlencoded({extended:false}));
app.use(cors());
app.use(express.json());



app.get('/',(req,res)=>{
    res.send('Hello duniya!')
});

app.post('/run', async(req,res)=>{
    
    const {language = 'cpp',code} = req.body;

    if(code === undefined)
    {
        return res.status(404).json({
            success : 'false',
            error : 'empty code body'
        })
    }

    try {
       const filePath = generateFile(language,code);
       const output = await executeCpp(filePath);
       res.json({output});


    } catch (err) {

        return res.status(500).json({
            success : 'false',
            error : err.message
        })
        
    }

     

})







app.listen(PORT,()=>console.log(`Server is listining on port ${PORT}`)
)





