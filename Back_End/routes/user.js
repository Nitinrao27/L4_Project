const express = require('express');
//import handler functions.
const {HandleSignUp,HandleLogin,injectQues,HandleAddQuestion,HandleDeletionOfQues,HandleUpdateQues,getQuestionDetails,handleTestCases} = require('../controllers/user')

const {restrictToLoggedinUserOnly} = require('../middleware/auth')


const router = express.Router();


router.post('/',HandleSignUp);
router.post('/login',HandleLogin);
router.get('/Question',restrictToLoggedinUserOnly,injectQues)
//post request on /Question route to create questions.
router.post('/Question',HandleAddQuestion);
router.post('/tests',handleTestCases)
router.route('/Question/:id')
.get(getQuestionDetails)
.patch(HandleUpdateQues)
.delete(HandleDeletionOfQues)




module.exports = router;