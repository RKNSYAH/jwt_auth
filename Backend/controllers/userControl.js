const bcrypt = require("bcryptjs");
const user = require("../models/users");
const jwt = require("jsonwebtoken");
exports.getUser = async (req, res) => {
  try {
    const data = await user.findAll({ attributes: ["id", "name", "email"] });
    res.json(data);
  } catch (error) {
    console.error(error);
  }
};
exports.createUser = async (req, res) => {
  try {
    const payload = req.body;
    
    if (!payload.email || !payload.password || !payload.confirmPassword || !payload.name)
      return res.status(406).json({ msg: "Values cannot be empty" });
    if (payload.password !== payload.confirmPassword)
      return res.status(406).json({ msg: "Passwords do not match" });

    const hashed = bcrypt.hashSync(payload.password, 10);

    payload["password"] = hashed;

    const data = await user.create(payload);
    res.json(data);
  } catch (error) {
    console.error(error);
  }
};
exports.login = async (req, res) => {
  try {
    const payload = req.body;
    const data = await user.findOne({ where: { email: payload.email } });

    if (!data) return res.status(404).json({ msg: "User not found" });

    const checkPass = bcrypt.compareSync(payload.password, data.password);
    if (!checkPass) return res.status(406).json({ msg: "Wrong password" });
    const accessToken = jwt.sign(
      { userId: data.id, nama: data.name, email: data.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "60s" }
    );
    payload["refresh_token"] = jwt.sign(
      { userId: data.id, nama: data.name, email: data.email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    data.update({ refresh_token: payload.refresh_token });
    res.cookie("refreshToken", payload.refresh_token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({token: accessToken});
  } catch (error) {
    console.error(error);
  }
};
exports.logout = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.jsonStatus(204);
        const data = await user.findOne({ where: { refresh_token: refreshToken } });
        if (!data) return res.jsonStatus(204);
        await data.update({ refresh_token: null });
      
        res.clearCookie("refreshToken");
        return res.jsonStatus(200);
        
    } catch (error) {
        console.error(error);
    }
};
