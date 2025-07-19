//main file.
const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const Ques = require('./models/question')
const tests = require('./models/test_cases')
const dotenv = require("dotenv");
dotenv.config();


const PORT = 3000;

//import routers
const userRoute = require('./routes/user');
const oauthreq = require('./routes/requests');
const oauthcred = require('./routes/oauth');

//connect to mongo.
const {connectToDb} = require('./connect');

 connectToDb(process.env.MONGO_URI).then(()=> console.log('connected to mongodb successfully'));

 //some middleware stuff.
 app.use(cors({
  origin: 'https://onlinejudge-ecru.vercel.app',
  credentials: true,
}))
 app.use(express.json());
 app.use(express.urlencoded({extended:false}));
 app.use(cookieParser());


 //it's to to establis routes.
 //go in routes and controller function.

 app.use('/',userRoute);
 app.use('/auth/google',oauthcred);
 app.use('/request-google',oauthreq);




 const axios = require('axios');

// submit logic
app.post('/submit', async (req, res) => {
  try {
    const { questionId, code, language = 'cpp' } = req.body;
    if (!questionId || !code) {
      return res.status(400).json({ error: 'questionId and code are required.' });
    }

    // 1. Validate question ID
    const question = await Ques.findById(questionId);
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }

    // 2. Fetch test cases
    const testCases = await tests.find({ questionId });
    if (!testCases.length) {
      return res.status(404).json({ error: 'No test cases found for this question.' });
    }

    // 3. Loop over each test case and call the compiler container via HTTP
    for (let i = 0; i < testCases.length; i++) {
      const { input, expectedOutput } = testCases[i];

      try {
        // Call your compiler server's /run endpoint
        const response = await axios.post(`${process.env.COMPILER_URL}/run`, {
          code,
          input,
          language
        });

        const stdout = response.data.output;
        const actual = stdout.trim().replace(/\s+/g, ' ');
        const expected = expectedOutput.trim().replace(/\s+/g, ' ');

        if (actual !== expected) {
          return res.json({
            verdict: 'Wrong Answer',
            failedCase: i + 1,
            expected,
            actual
          });
        }

      } catch (err) {
        if (err.response && err.response.data && err.response.data.error === 'Time Limit Exceeded') {
          return res.json({
            verdict: 'Time Limit Exceeded',
            failedCase: i + 1
          });
        }
        return res.json({
          verdict: 'Compilation Error',
          message: err.response?.data?.error || err.message
        });
      }
    }

    // 4. All test cases passed
    return res.json({ verdict: 'Accepted' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
});




app.listen(PORT,()=>{
    console.log(`Server is Listening on PORT ${PORT}`);
    
})

