const pool = require("../config/db");

class MemberController {
  static async addMember(req, res, next) {
    const { boardId, email } = req.body;

    try {
      const user = await pool.query("SELECT id,email FROM users WHERE email = $1", [email]);
      
      if (user.rows[0]) {
        const member = await pool.query("SELECT id, user_id from members WHERE user_id = $1 AND board_id = $2", [user.rows[0].id, boardId]);

        if (member.rows[0]) {
          throw {
            status: 400,
            message: "User have been added"
          };
        } else {
          await pool.query("INSERT INTO members (user_id,board_id) VALUES ($1,$2)", [user.rows[0].id, boardId]);

          res.status(201).json({
            status: 201,
            data: {
              email: user.rows[0].email
            }
          });
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

  static deleteMember(req, res, next) {
    
  }
}

module.exports = { MemberController };