const router = require("express").Router();
const jwt = require("jsonwebtoken");
const pool = require("../config/db");
require("dotenv").config();

const { checkPassword, hashPassword } = require("../helpers/bcrypt");


router.post("/api/v1/login", async(req, res, next)=>{
  try {
    const { email, password } = req.body;

    const user = await pool.query("SELECT id,email,password FROM users WHERE email = $1", [email]);
    const userData = user.rows[0];

    if (userData) {
      isPasswordCorrect = checkPassword(password, userData.password);
      if (isPasswordCorrect) {
        const token = jwt.sign({
          id: userData.id,
          email: userData.email
        }, process.env.TOKEN_KEY);

        res.status(200).json({
          status: 200,
          data: {
            id: userData.id,
            email: userData.email,
            access_token: token
          }
        });
      }

      res.status(400).json({
        status: 400,
        message: "Password incorrect"
      });
    }

    res.status(404).json({
      status: 404,
      message: "User not found"
    });
  } catch (err) {
    console.error(err);
  }
});

router.post("/api/v1/register", async(req, res)=>{
  try {
    const { email, password } = req.body;
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
    console.log(err);
  }
});

module.exports = router;