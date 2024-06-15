const express = require('express');
const { roomCreation, getAllRooms, updateRoomDetails} = require('../controllers/roomController');
const router = express.Router();
router.post('/create',roomCreation);
router.post('/getAll',getAllRooms);
router.post('/getAll',updateRoomDetails);
module.exports = router;
