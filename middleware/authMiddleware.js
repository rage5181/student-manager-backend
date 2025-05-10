// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your-secret-key'; // 실제 사용 중인 SECRET_KEY로 바꿔줘

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ message: '인증 토큰이 없습니다.' });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: '토큰이 유효하지 않습니다.' });
    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };
