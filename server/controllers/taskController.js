const pool = require("../config/db");

class TaskController {
  static async createTask(req, res, next) {
    const { group_id, title, description } = req.body;
    const { id } = req.user;

    try {
      const task =  await pool.query("INSERT INTO tasks (group_id,user_id,title,description) values($1,$2,$3,$4) RETURNING *", [group_id, id, title, description]);

      res.status(201).json({
        status: 201,
        data: task.rows[0]
      });
    } catch (err) {
      next(err);
    }
  }

  static async updateTask(req, res, next) {}

  static async deleteTask(req, res, next) {}
}

module.exports = { TaskController };