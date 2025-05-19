const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const studentRoutes = require('./routes/studentRoutes');
const authRoutes = require('./routes/authRoutes');
const groupRoutes = require('./routes/groupRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/schedules', scheduleRoutes);

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
  console.log("✅ .env 로드 완료 (개발 환경)");
}


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  
});

console.log("✅ ENV KEYS:", Object.keys(process.env));
console.log("✅ ENV MYSQL-related:", Object.entries(process.env).filter(([k]) => k.includes('MYSQL')));

// 커넥션 테스트용 코드
const mysql = require('mysql2/promise');

(async () => {
  try {
    console.log('Connecting to DB with:', {
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    database: process.env.MYSQLDATABASE,
    password: process.env.MYSQLPASSWORD,
    port: process.env.MYSQLPORT  
  });

    const connection = await mysql.createConnection({
      host: process.env.MYSQLHOST,
      user: process.env.MYSQLUSER,
      password: process.env.MYSQLPASSWORD,
      database: process.env.MYSQLDATABASE,
      port: process.env.MYSQLPORT     
    });

    console.log('✅ MySQL 연결 성공!');
    await connection.end();
  } catch (err) {
    console.error('❌ MySQL 연결 실패:', err);
  }
})();