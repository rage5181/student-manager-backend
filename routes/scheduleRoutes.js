const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/scheduleController');

// 스케줄 전체 조회
router.get('/', scheduleController.getAllSchedules);
// 스케줄 등록
router.post('/', scheduleController.createSchedule);
// 스케줄 수정
router.put('/:id', scheduleController.updateSchedule);
// 스케줄 삭제
router.delete('/:id', scheduleController.deleteSchedule);

module.exports = router;
