const jwt = require('jsonwebtoken');
const secret = '#secret#27@pass#';

function setUser(user)
{
    return jwt.sign({
        _id : user._id,
        UserName : user.UserName
    },secret);
};

function getUser(token)
{
    if(!token)return null;
    try {
        return jwt.verify(token,secret);
        
    } catch (error) {
        return null;
        
    }
}

module.exports = {
    setUser,
    getUser
}