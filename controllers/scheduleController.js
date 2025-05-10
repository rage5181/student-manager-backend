const db = require('../db'); // DB 연결 설정

exports.getAllSchedules = async (req, res) => {
 const user_id = req.query.user_id
 try {
    const [rows] = await db.execute('SELECT * FROM TB_SCHEDULE WHERE user_id = ?', [user_id]);
    res.json(rows);
   console.log('res >>>>', rows);
  } catch (err) {
    console.error('스케줄 조회 실패:', err);
    res.status(500).json({ message: '스케줄 조회 실패' });
  }
};

exports.createSchedule = async (req, res) => {
  const { title, date, time, description, user_id } = req.body;
  console.log('req.body >>>>', req.body);
  try {
    const [result] = await db.execute(
      'INSERT INTO TB_SCHEDULE (title, date, time, description, user_id) VALUES (?, ?, ?, ?, ?)',
      [title, date, time, description, user_id]
    );
    res.status(201).json({ id: result.insertId, title, date, time, description, user_id });
  } catch (err) {
    console.error('스케줄 등록 실패:', err);
    res.status(500).json({ message: '스케줄 등록 실패' });
  }
};

exports.updateSchedule = async (req, res) => {
  const { id } = req.params;
  const { title, date, time, description } = req.body;
console.log('updateSchedule : id =============================================' , id);
console.log('updateSchedule =============================================' , req.params);

  try {
    await db.execute(
      'UPDATE TB_SCHEDULE SET title = ?, date = ?, time = ?, description = ? WHERE id = ?',
      [title, date, time, description, id]
    );
    res.json({ id, title, date, time, description });
  } catch (err) {
    console.error('스케줄 수정 실패:', err);
    res.status(500).json({ message: '스케줄 수정 실패' });
  }
};

exports.deleteSchedule = async (req, res) => {
  const { id } = req.params;
  try {
    await db.execute('DELETE FROM TB_SCHEDULE WHERE id = ?', [id]);
    res.sendStatus(204);
  } catch (err) {
    console.error('스케줄 삭제 실패:', err);
    res.status(500).json({ message: '스케줄 삭제 실패' });
  }
};
