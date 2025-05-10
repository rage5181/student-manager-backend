const pool = require('../db');

exports.createGroup = async (req, res) => {
  const { name, description } = req.body;
  const userId = req.user.id;
console.log('createGroup >>');
  try {
    const [result] = await pool.query(
      'INSERT INTO TB_GROUPS (name, description, user_id) VALUES (?, ?, ?)',
      [name, description, userId]
    );
    res.status(201).json({ id: result.insertId, name, description });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getGroups = async (req, res) => {
  const userId = req.user.id;

  try {
    const [rows] = await pool.query(
      'SELECT * FROM TB_GROUPS WHERE user_id = ?',
      [userId]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getGroupById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const [rows] = await pool.query(
      'SELECT * FROM TB_GROUPS WHERE id = ? AND user_id = ?',
      [id, userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Group not found' });
    }

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateGroup = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const userId = req.user.id;

  try {
    await pool.query(
      'UPDATE TB_GROUPS SET name = ?, description = ? WHERE id = ? AND user_id = ?',
      [name, description, id, userId]
    );
    res.json({ message: 'Group updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteGroup = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    await pool.query(
      'DELETE FROM TB_GROUPS WHERE id = ? AND user_id = ?',
      [id, userId]
    );
    res.json({ message: 'Group deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
