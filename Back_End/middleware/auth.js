const {getUser} = require('../Auth');

async function restrictToLoggedinUserOnly(req,res,next)
{
    const tkn = req.cookies?.token;
    if(!tkn)
    {
        return res.redirect('/login');
    }
    const user = getUser(tkn);
    if(!user) return res.redirect('/login');

    req.user = user;//don't know the meaning?
    next();
}

module.exports = {
    restrictToLoggedinUserOnly
}