const jwt = require("jsonwebtoken");
require("dotenv").config();

const pool = require("../config/db");

function authenticate(req, res, next) {
  try {
    const accessToken = req.headers.access_token;

    if (!accessToken) {
      throw {
        status: 404,
        message: "Access token not found"
      };
    }

    jwt.verify(
      accessToken, 
      process.env.TOKEN_KEY, 
      async (err, decoded)=>{
        if (err) {
          throw {
            status: 400,
            message: "Access token invalid"
          };
        }
        
        const user = await pool.query("SELECT id,email FROM users WHERE id = $1", [decoded.id]);
        const userData = user.rows[0];

        if (userData) {
          req.user = decoded;
          next();
        } else {
          throw {
            status: 404,
            message: "User not found"
          };
        }
      });
  } catch (err) {
    next(err);
  }
}

module.exports = { authenticate };