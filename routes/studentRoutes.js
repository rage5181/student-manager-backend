const express = require('express');
const router = express.Router();
const controller = require('../controllers/studentController');

const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];

    console.log('Authorization Header:', authHeader);

    const token = authHeader && authHeader.split(' ')[1];
  console.log('Routes token :' , token);

    if (!token) return res.sendStatus(401); // No token
  
    jwt.verify(token, 'your-secret-key', (err, user) => {
      if (err) {console.log('JWT 오류:', err); return res.sendStatus(403);} // Invalid token
      req.user = user; // user 정보 저장
      next();
    });
  }

router.get('/:id', authenticateToken, controller.getStudentById);
router.get('/',  authenticateToken, controller.getStudents);
router.post('/', authenticateToken, controller.addStudent);
router.put('/:id', authenticateToken, controller.updateStudent);
router.delete('/:id', authenticateToken, controller.deleteStudent);

module.exports = router;
