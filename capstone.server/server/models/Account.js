import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Account = new Schema(
  {
    subs: [{ type: String, unique: true }],
    _id: { type: String, required: true },
    email: { type: String, lowercase: true, unique: true },
    name: { type: String, required: true },
    picture: { type: String },
    bio: { type: String },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        index: '2dsphere'
      },
      coordinates: { type: [Number], required: true }
    },
    rating: { type: Number }
    // c789b7fe-892e-4eb4-bf8f-8843dd82e7b5
    // NOTE If you wish to add additional public properties for Accounts do so here
  },
  { timestamps: true, _id: false, toJSON: { virtuals: true } }
)

export default Account
