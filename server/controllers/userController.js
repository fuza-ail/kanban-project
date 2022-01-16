const jwt = require("jsonwebtoken");

const { checkPassword, hashPassword } = require("../helpers/bcrypt");
const pool = require("../config/db");

class UserController {
  static async login(req, res, next) {
    const { email, password } = req.body;

    try {
      const user = await pool.query("SELECT id,email,password FROM users WHERE email = $1", [email]);
      const userData = user.rows[0];
  
      if (userData) {
        const isPasswordCorrect = checkPassword(password, userData.password);

        if (isPasswordCorrect) {
          const token = jwt.sign({
            id: userData.id,
            email: userData.email
          }, process.env.TOKEN_KEY);
  
          res.status(200).json({
            status: 200,
            data: {
              email: userData.email,
              access_token: token
            }
          });
        } else {
          throw {
            status: 400,
            message: "Password incorrect"
          };
        }
      } else {
        throw {
          status: 404,
          message: "User not found"
        };
      }
    } catch (err) {
      next(err);
    }
  }

  static async register(req, res, next) {
    const { email, password } = req.body;

    try {
      const hashedPassword = hashPassword(password);
      
      await pool.query("INSERT INTO users (email,password) VALUES ($1, $2)", [email, hashedPassword]);
  
      const user = await pool.query("SELECT id,email FROM users WHERE email = $1", [email]);
  
      const token = jwt.sign({
        id: user.id,
        email: user.email
      }, process.env.TOKEN_KEY);
  
      res.status(201).json({
        status: 201,
        data: {
          email: user.rows[0].email,
          access_token: token
        }
      });
    } catch (err) {
      next(err);
    }
  }

  static async authenticate( req, res, next) {
    const token = req.headers.access_token;
    const user = req.user;

    if (user) {
      res.status(200).json({
        status: 200,
        data: {
          email: user.email,
          access_token: token
        }
      });
    }
  }
}

module.exports = { UserController };