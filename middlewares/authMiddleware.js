const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    jwt.verify(token, process.env.JWT_KEY, (err, decode) => {
      if (err) {
        console.log(err);
        return res.status(401).send({
          message: "Auth Failed",
          success: false,
          err,
        });
      } else {
        req.body.userId = decode.userId;
        next();
      }
    });
  } catch (error) {
    res.status(500).send({
      message: "Error in the middleWare",
      success: false,
    });
  }
};
