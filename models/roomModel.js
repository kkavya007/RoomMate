const mongoose=require('mongoose');
const feedbackSchema= new mongoose.Schema({
    user_id: {
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    },
    comment:{
        type:String,
        required:true
    }
},{timestamp:true});
const  roomSchema= new mongoose.Schema({
    roomName: {
        type: String,
        required: true,
        trim: true
      },
      details: {
        type: [String],
        default: []
      },
      availability: {
        type: Boolean,
        required: true,
        default: true
      },
      roomType: {
        type: String,
        enum: ['individual', 'apartment'],
        required: true
      },
      floor: {
        type: String,
        enum: ['g', '1', '2', '3'],
        required: true
      },
      rent: {
        type: Number,
        required: true
      },
      location: {
        lat: {
          type: Number,
          required: true
        },
        lon: {
          type: Number,
          required: true
        }
      },
      amenities: {
        wifi: {
          type: Boolean,
          default: false
        },
        airCondition: {
          type: Boolean,
          default: false
        },
        heater: {
          type: Boolean,
          default: false
        },
        washer: {
          type: Boolean,
          default: false
        },
        dryer: {
          type: Boolean,
          default: false
        },
        kitchen: {
          type: Boolean,
          default: false
        },
        parking: {
          type: Boolean,
          default: false
        },
        gym: {
          type: Boolean,
          default: false
        },
        pool: {
          type: Boolean,
          default: false
        }
      },
      ratings: {
        type: Number,
        min: 1,
        max: 5,
        required: true
      },
      feedback: [feedbackSchema]
}, { timestamps: true });

const Room = mongoose.model('rooms', roomSchema);

module.exports = Room;