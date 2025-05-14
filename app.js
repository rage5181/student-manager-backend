const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const studentRoutes = require('./routes/studentRoutes');
const authRoutes = require('./routes/authRoutes');
const groupRoutes = require('./routes/groupRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');

/*
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
  console.log('========= dotenv.config run =========');
}
*/
console.log('========= process.env =========', process.env);


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
  console.log('process.env.NODE_ENV===>', process.env.NODE_ENV);
  console.log('process.env.MYSQL_HOST===>', process.env.MYSQL_HOST);
});


// 커넥션 테스트용 코드
const mysql = require('mysql2/promise');

(async () => {
  try {
    console.log('Connecting to DB with:', {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT  
  });

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