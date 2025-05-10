const jwt = require('jsonwebtoken');
const pool = require('../db'); // DB 연결 모듈
const bcrypt = require('bcrypt');

const SECRET_KEY = 'your-secret-key'; // 노출 주의

exports.login = async (req, res) => {
  const { email, password } = req.body;
console.log ('email:: ', email);
console.log ('pass:: ', password);
  try {
    const [rows] = await pool.query('SELECT * FROM TB_USERS WHERE email = ?', [email]);
    const user = rows[0];

    console.log('쿼리종료', user.password);

const bcrypt = require('bcrypt');

if (!user || user.length === 0) {
  return res.status(401).json({ message: '존재하지 않는 사용자입니다.' });
}

const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log('쿼리종료1');
      return res.status(401).json({ message: '비밀번호가 잘못되었습니다.' });
    }
    console.log('쿼리종료2');
    const token = jwt.sign({ id: user.id, email: user.email , name: user.name }, SECRET_KEY, { expiresIn: '24h' });
    console.log('쿼리종료3', token);
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '서버 오류' });
  }
};

exports.register = async (req, res) => {
    const { email, password, name } = req.body;
  
    if (!email || !password || !name) {
      return res.status(400).json({ message: '모든 필드를 입력해주세요.' });
    }
  
    try {
      // 중복 체크
      const [existing] = await pool.query('SELECT * FROM TB_USERS WHERE email = ?', [email]);
      
      if (existing.length > 0) {
        return res.status(400).json({ message: '이미 등록된 이메일입니다.' });
      }
  
      // 비밀번호 해시
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // DB 저장
      await pool.query(
        'INSERT INTO TB_USERS (email, password, name) VALUES (?, ?, ?)',
        [email, hashedPassword, name]
      );
      console.log('register Insert >>>');
      res.status(201).json({ message: '회원가입 완료!' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
