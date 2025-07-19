const express = require("express");
const router = express.Router();

const dotenv = require("dotenv");
dotenv.config();
const { OAuth2Client } = require("google-auth-library");

router.post("/", async function (req, res) {
  //deal with cors
  res.header("Accesss-Control-Allow-Origin", "https://onlinejudge-ecru.vercel.app");
  //as we are using simple : http.
  res.header("Referrer-Policy", "no-referrer-when-downgrade");
  const redirectUrl = "https://l4-project-back-end.onrender.com/auth/google/callback";

  const oAuth2Client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    redirectUrl
  );

  const authorizeUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid",
    prompt: "consent",
  });

  res.json({ url: authorizeUrl });
});

module.exports = router;
