const pool = require("../config/db");

class GroupController {
  static async getGroups(req, res, next) {
    const { boardId } = req.params;

    try {
      const group = await pool.query(`
        SELECT 
        g.board_id,
        g.id as group_id, 
        g.status_name,
        g.color,
        g.created_at,
        g.updated_at,
        COALESCE(
          jsonb_agg(jsonb_build_object(
            'id',
            t.id,
            'title',
            t.title,
            'description',
            t.description,
            'created_at',
            t.created_at
          ))FILTER (WHERE t.title IS NOT NULL)
          ,'[]') as tasks
        FROM groups as g
        LEFT JOIN tasks as t
        ON t.group_id = g.id
        WHERE g.board_id = $1
        GROUP BY g.id
      `, [boardId]);

      const member = await pool.query(`
        SELECT
        m.user_id,
        m.board_id,
        u.email
        FROM members as m
        JOIN users as u
        ON u.id = m.user_id
        WHERE m.board_id = $1
      `, [boardId]);

      res.status(200).json({
        status: 200,
        data: {
          groups: group.rows,
          members: member.rows
        }
      });
    } catch (err) {
      next(err);
    }
  }

  static async createGroup(req, res, next) {
    const { board_id, status_name, color } = req.body;

    try {
      const group = await pool.query("INSERT INTO groups (board_id,status_name,color) values($1,$2,$3) RETURNING *", [board_id, status_name, color]);

      // const group = await pool.query("SELECT id,board_id,status_name,color,created_at,updated_at FROM groups WHERE id = $1",[groupId]) 

      res.status(201).json({
        status: 201,
        data: group.rows[0]
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async deleteGroup(req, res, next) {
    const { groupId } = req.params;
    console.log(groupId);
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      await client.query("DELETE FROM tasks WHERE group_id = $1", [groupId]);
      await client.query("DELETE FROM groups where id = $1", [groupId]);
      
      client.query("COMMIT");

      res.status(200).json({
        status: 201,
        data: {
          group_id: Number(groupId)
        }
      });
    } catch (err) {
      await client.query("ROLLBACK");
      next(err);
    }
  }

  static async updateGroup(req, res, next) {}

}

module.exports = { GroupController };