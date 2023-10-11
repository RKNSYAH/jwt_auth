const user = require("../models/users");
const jwt = require("jsonwebtoken");

exports.refreshToken = async (req, res) => {
  try {
    const refreshtoken = req.cookies.refreshToken;
    if (!refreshtoken) return res.sendStatus(401);
    const data = await user.findOne({ where: { refresh_token: refreshtoken } });
    if (!data) return res.sendStatus(403);
    jwt.verify(
      refreshtoken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decode) => {
        if (err) return res.sendStatus(403);
        const accessToken = jwt.sign(
          { userId: data.id, name: data.name, email: data.email },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "10s",
          }
        );
        res.send(accessToken)
      }
    );
  } catch (error) {
    console.error(error);
  }
};
