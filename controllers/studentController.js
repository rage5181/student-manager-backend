const db = require('../db');
const pool = require('../db');



exports.getStudents = async (req, res) => {
  try {
    const userId = req.user.id;
    const [rows] = await db.query(
      `SELECT S.*, A.name AS groupName FROM TB_STUDENTS S 
      LEFT OUTER JOIN TB_GROUPS A ON A.id = S.group_id   
      WHERE S.user_id = ?
      `, 
      [userId]);
    res.json(rows);
    console.log('rows => ', rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getStudentById = async (req, res) => {
    const { id } = req.params;
    try {
      const [result] = await pool.query('SELECT * FROM TB_STUDENTS WHERE id = ?', [id]);
      if (result.length === 0) {
        return res.status(404).json({ message: '학생을 찾을 수 없습니다.' });
      }
      res.json(result[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: '서버 오류' });
    }
  };

exports.addStudent = async (req, res) => {
    const { name, studentId, grade, major, groupId } = req.body;
    const userId = req.user.id;
    if (!name || !studentId) {
      return res.status(400).json({ error: '이름과 학번은 필수 입력입니다.' });
    }
  
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.execute(
        'INSERT INTO TB_STUDENTS (name, studentId, grade, major, user_id, group_id) VALUES (?, ?, ?, ?, ?, ?)',
        [name, studentId, grade, major, userId, groupId]
      );
  
      const newStudent = {
        id: result.insertId,
        name,
        studentId,
        grade,
        major,
        userId,
        groupId
      };
  
      res.status(201).json(newStudent);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: '학생 추가 중 오류 발생' });
    } finally {
      connection.release();
    }
  };
  

exports.updateStudent = async (req, res) => {
  const { id } = req.params;
  const { name, studentId, grade, major } = req.body;
  try {
    await db.query(
      'UPDATE TB_STUDENTS SET name=?, studentId=?, grade=?, major=? WHERE id=?',
      [name, studentId, grade, major, id]
    );
    res.json({ id, name, studentId, grade, major });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteStudent = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM TB_STUDENTS WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
