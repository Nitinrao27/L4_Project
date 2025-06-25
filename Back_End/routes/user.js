const express = require('express');
//import handler functions.
const {HandleSignUp,HandleLogin,injectQues,HandleAddQuestion,HandleDeletionOfQues,HandleUpdateQues} = require('../controllers/user')

const {restrictToLoggedinUserOnly} = require('../middleware/auth')


const router = express.Router();


router.post('/',HandleSignUp);
router.post('/login',HandleLogin);
router.get('/Question',restrictToLoggedinUserOnly,injectQues)
//post request on /Question route to create questions.
router.post('/Question',HandleAddQuestion);
router.route('/Question/:id')
.patch(HandleUpdateQues)
.delete(HandleDeletionOfQues)




module.exports = router;