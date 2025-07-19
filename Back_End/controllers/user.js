
const User = require('../models/user');
const {setUser} = require('../Auth');
const Ques  = require('../models/question')
const tests = require('../models/test_cases')

async function HandleSignUp(req, res) {
  try {
    const { username, email, password } = req.body;

    await User.create({
      UserName: username,
      Email: email,
      Password: password,
    });
    return res.status(201).json({ msg: "signup Successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" }); 
  }
}

async function HandleLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ Email : email,
    Password : password
   }); 


  if (!user) {
    return res.status(404).json({msg : 'no user found!'}); 
    // OR return res.redirect('/')
  }
  //creating jwt token.
  const token = setUser(user);
  res.cookie('token', token, {
  httpOnly: true,
  secure: true,            // Required on HTTPS
  sameSite: 'None',        // Required for cross-origin cookies
});

  return res.status(200).json({msg : 'logged In successfully'}); 
  // OR return res.redirect('/Dashboard')
}

async function injectQues(req,res)
{
  const ques = await Ques.find();
  return res.status(200).json({ques : ques, name : req.user.UserName});

}
async function HandleAddQuestion(req, res) {
  try {
    const { Title, Description, Input, Output_Guide ,TestCases } = req.body;

    await Ques.create({ Title, Description,Input,Output_Guide,TestCases }); 

    return res.status(201).json({ msg: "Question added successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" }); 
  }
}

async function HandleUpdateQues(req, res) {
  try {
    const updates = req.body; // Whatever fields you send
    const updated = await Ques.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });
    if (!updated) {
      return res.status(404).json({ msg: "Question not found" });
    }
    res.status(200).json({ msg: "Updated Successfully"});
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function HandleDeletionOfQues(req, res) {
  try {
    const deleted = await Ques.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ msg: "Question not found" });
    }
    res.status(200).json({ msg: "Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getQuestionDetails(req,res){

  const qs = await Ques.findById(req.params.id);
  res.json(qs);

}
async function handleTestCases(req, res) {
  try {
    const { questionId, testCases } = req.body;

    if (!Array.isArray(testCases) || testCases.length === 0) {
      return res.status(400).json({ error: "testCases array is required." });
    }

    // Prepare documents to insert
    const documents = testCases.map(tc => ({
      questionId,
      input: tc.input,
      expectedOutput: tc.expectedOutput
    }));

    await tests.insertMany(documents);

    return res.status(201).json({ msg: "Test cases added successfully" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}





module.exports = {
    HandleSignUp,
    HandleLogin,
    injectQues,
    HandleAddQuestion,
    HandleDeletionOfQues,
    HandleUpdateQues,
    getQuestionDetails,
    handleTestCases

}