const { baseResponses } = require("../helpers/baseResponses")
const {Room}= require("../models/roomModel")

const roomCreation=(req,res)=>{
    try{

    
    const{
        roomName, 
        details, 
        availability, 
        roomType,
        floor,
        rent,
        location,
        amenities,
        ratings
    }=req.body
    if (!roomName || !details || availability === undefined || !roomType || !floor || !rent || !location || !amenities) {
        return res.status(400).json(baseResponses.constantMessages.ALL_FIELDS_REQUIRED());
      }
  
    const newRoom =new Room ({
      roomName,
      details,
      availability,
      roomType,
      floor,
      rent,
      location,
      amenities,
      ratings,
    });
    newRoom.save();
    res.status(200).json(baseResponses.constantMessages.ROOM_CREATED_SUCCESSFULLY());
    }catch(err){
        return res.status(500).json(baseResponses.error(error.message));
}
}
const getAllRooms = async (req, res) => {
    try {
      const rooms = await Room.find(); // Fetch all rooms
      return res.status(200).json({
        success: true,
        data: rooms
      });
    } catch (error) {
      return res.status(500).json(baseResponses.error(error.message));
    }
  };

const updateRoomDetails = async (req, res) => {
    try {
      const { roomId } = req.params;
      const updateData = req.body;
  
      const allowedUpdates = [
        "roomName",
        "details",
        "availability",
        "roomType",
        "floor",
        "rent",
        "location",
        "amenities",
        "ratings"
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
  module.exports = {getAllRooms,roomCreation,updateRoomDetails}