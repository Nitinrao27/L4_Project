const express = require("express");
const router = express.Router();
const User = require('../models/user')
const {setUser} = require('../Auth')

const dotenv = require("dotenv");
dotenv.config();
const { OAuth2Client } = require("google-auth-library");

async function getUserData(access_token) {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
  );
  const data = await response.json();
  console.log("data", data);
  return data;
}
router.get("/callback", async (req, res) => {
  const code = req.query.code;
  try {
    const redirectUrl = "https://l4-project-back-end.onrender.com/auth/google/callback";
    const oAuth2Client = new OAuth2Client(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      redirectUrl
    );

    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);

    const userInfo = await getUserData(tokens.access_token);

    // Find or create user in your MongoDB
    let user = await User.findOne({ googleId: userInfo.sub });
    if (!user) {
      user = await User.create({
        googleId: userInfo.sub,
        UserName: userInfo.name,
        Email: userInfo.email
      });
    }

    // Generate your own JWT
    const myToken = setUser({ _id: user._id, UserName: user.UserName });

    //  Set cookie or redirect with token
    res.cookie('token', myToken, { httpOnly: true, sameSite: 'lax' });
    res.redirect('https://onlinejudge-ecru.vercel.app/Question');

  } catch (error) {
    console.error(error);
    res.status(500).send("Error signing in with Google");
  }
});


module.exports = router;
