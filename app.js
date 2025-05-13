const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const studentRoutes = require('./routes/studentRoutes');
const authRoutes = require('./routes/authRoutes');
const groupRoutes = require('./routes/groupRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/schedules', scheduleRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// 커넥션 테스트용 코드
const mysql = require('mysql2/promise');

console.log('env.host===========>',process.env.DB_HOST);
console.log('env.database===========>',process.env.DB_NAME);
console.log('env.password===========>',process.env.DB_PASSWORD);
console.log('env.user===========>',process.env.DB_USER);
console.log('env.port===========>',process.env.DB_PORT);

(async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT     
    });

    console.log('✅ MySQL 연결 성공!');
    await connection.end();
  } catch (err) {
    console.error('❌ MySQL 연결 실패:', err);
  }
})();