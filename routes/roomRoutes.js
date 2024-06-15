const express = require('express');
const { roomCreation, getAllRooms, updateRoomDetails, giveRatings} = require('../controllers/roomController');
const router = express.Router();
router.post('/create',roomCreation);
router.get('/getAll',getAllRooms);
router.put('/update',updateRoomDetails);
router.post('/feedback',giveRatings);
module.exports = router;
