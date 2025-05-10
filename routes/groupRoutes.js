const express = require('express');
const router = express.Router();
const controller = require('../controllers/groupController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/register', authenticateToken, controller.createGroup);
router.get('/', authenticateToken, controller.getGroups);
router.put('/:id', authenticateToken, controller.updateGroup);
router.delete('/:id', authenticateToken, controller.deleteGroup);
module.exports = router;
