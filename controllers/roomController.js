const { baseResponses } = require("../helpers/baseResponses")
const { Room, Feedback } = require("../models/roomModel")

const roomCreation = (req, res) => {
  try {
    const {
      roomName,
      details,
      availability,
      roomType,
      floor,
      rent,
      location,
      amenities,
      gender
    } = req.body
    if (!roomName || !details || availability === undefined || !roomType || !floor || !rent || !location || !amenities || gender === undefined) { 
      return res.status(400).json(baseResponses.constantMessages.ALL_FIELDS_REQUIRED());
    }
    const newRoom = new Room({
      roomName,
      details,
      availability,
      roomType,
      floor,
      rent,
      location,
      amenities,
      gender
    });

    newRoom.save();
    res.status(200).json(baseResponses.constantMessages.ROOM_CREATED_SUCCESSFULLY());
  } catch (error) {
    return res.status(500).json(baseResponses.error(error.message));
  }
};

const getAllRooms = async (req, res) => {
    try {
        const recLimit = parseInt(req.query.limit) || 10;
        const pageNumber = parseInt(req.query.page) || 1;
        const {
            availability,
            roomType,
            floor,
            minRent,
            maxRent,
            gender
        } = req.query;
        let filter = {};
        if (availability !== undefined) {
            filter.availability = availability === 'true';
        }
        if (roomType) {
            filter.roomType = roomType;
        }
        if (floor) {
            filter.floor = floor;
        }
        if (minRent !== undefined || maxRent !== undefined) {
            filter.rent = {};
            if (minRent !== undefined) filter.rent.$gte = parseInt(minRent);
            if (maxRent !== undefined) filter.rent.$lte = parseInt(maxRent);
        }
        if (gender) {
            filter.gender = gender;
        }
        const count = await Room.countDocuments(filter);
        const totalPages = Math.ceil(count / recLimit);
        const roomsList = await Room.find(filter)
            .skip((pageNumber - 1) * recLimit)
            .limit(recLimit)
            .lean();

        res.status(200).json({
            success: true,
            totalPages,
            totalCount: count,
            data: roomsList
        });
    } catch (error) {
        res.status(500).json(baseResponses.error(error.message));
    }
};

const updateRoomDetails = async (req, res) => {
  try {
    const { updateData, roomId } = req.body;

    const allowedUpdates = [
      "roomName",
      "details",
      "availability",
      "roomType",
      "floor",
      "rent",
      "location",
      "amenities",
    ];

    const updates = {};
    for (const key of Object.keys(updateData)) {
      if (allowedUpdates.includes(key)) {
        updates[key] = updateData[key];
      }
    }

    const updatedRoom = await Room.findByIdAndUpdate(roomId, updates, {
      new: true,
      runValidators: true
    });

    if (!updatedRoom) {
      return res.status(404).json(baseResponses.constantMessages.ROOM_NOT_FOUND());
    }

    return res.status(200).json({
      success: true,
      message: 'Room updated successfully',
      data: updatedRoom
    });
  } catch (error) {
    return res.status(500).json(baseResponses.error(error.message));
  }
};
const giveFeedback = async (req, res) => {
  try {
    const { user_id, comment, room_id } = req.body;
    const newFeedback = new Feedback({
      comment,
      user_id,
      room_id
    });
    newFeedback.save();
    return res.status(200).json(baseResponses.constantMessages.FEEDBACK());
  } catch (error) {
    return res.status(500).json(baseResponses.error(error.message));
  }
};
const getAllFeedback = async (req, res) => {
  try {
    const recLimit = parseInt(req.query.limit) || 10;
    const pageNumber = parseInt(req.query.page) || 1;
    let filter = {};
    const count = await Feedback.countDocuments(filter);
    const totalPages = Math.ceil(count / recLimit);
    const feedbackList = await Feedback.find(filter)
    .skip((pageNumber-1)*recLimit)
    .limit(recLimit); 
    if(!feedbackList){
      return res.status(404).json(baseResponses.constantMessages.FEEDBACK_NOT_FOUND());
    }

    return res.status(200).json({
      success: true,
      totalPages,
      totalCount: count,
      data: feedbackList
    });
  } catch (error) {
    return res.status(500).json(baseResponses.error(error.message));
  }
};
module.exports = { getAllRooms, roomCreation, updateRoomDetails, giveFeedback,getAllFeedback }