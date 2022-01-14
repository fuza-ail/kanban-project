const pool = require("../config/db");

class BoardController {
  static async getBoards(req, res, next) {
    const { id } = req.user;
    
    try {
      const selectBoards = `
      SELECT 
      m.user_id as user_id,
      b.owner_id,
      b.id as board_id, 
      b.name,
      b.description
      FROM members as m
      JOIN boards as b 
      ON b.id = m.board_id
      WHERE m.user_id = $1
      `;

      const boards = await pool.query(selectBoards, [id]);

      res.status(200).json({
        status: 200,
        data: boards.rows
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async createBoard(req, res, next) {
    const { name, description } = req.body;
    const ownerId = req.user.id;

    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      // insert to board table
      const insertBoard = "INSERT INTO boards (name, owner_id,description) values($1,$2,$3) RETURNING id";
      const boardRes = await client.query(insertBoard, [name, ownerId, description]);

      // insert to members table
      const insertMember = "INSERT INTO members (user_id,board_id) values($1,$2)";
      await client.query(insertMember, [ownerId, boardRes.rows[0].id]);

      client.query("COMMIT");

      res.status(201).json({
        status: 201,
        data: {
          id: boardRes.rows[0].id 
        }
      });
    } catch (err) {
      await client.query("ROLLBACK");
      next(err);
    }
  }

  static async deleteBoard(req, res, next) {}

  static async updateBoard(req, res, next) {}
}

module.exports = { BoardController };