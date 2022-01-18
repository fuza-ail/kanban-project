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

  static async deleteTask(req, res, next) {
    const taskId = req.params.id;

    try {
      const task = await pool.query("SELECT id,title,group_id FROM tasks WHERE id = $1", [taskId]);

      if (task.rows[0]) {
        await pool.query("DELETE FROM tasks WHERE id = $1", [taskId]);

        res.status(200).json({
          status: 200,
          data: {
            task_id: task.rows[0].id,
            group_id: task.rows[0].group_id
          }
        });
      } else {
        throw {
          status: 404,
          message: "Task not found"
        };
      }
    } catch (err) {
      next(err);
    }
  }

  static async updateTask(req, res, next) {}

}

module.exports = { TaskController };