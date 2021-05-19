import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Account = new Schema(
  {
    subs: [{ type: String, unique: true }],
    _id: { type: String, required: true },
    email: { type: String, lowercase: true, unique: true },
    name: { type: String, required: true },
    picture: { type: String, default: 'https://prd-wret.s3.us-west-2.amazonaws.com/assets/palladium/production/s3fs-public/styles/full_width/public/thumbnails/image/placeholder-profile_1.png' },
    bio: { type: String, default: 'Tell us about yourself!' },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        index: '2dsphere'
      },
      coordinates: { type: [Number] }
    },
    rating: { type: Number }
    // c789b7fe-892e-4eb4-bf8f-8843dd82e7b5
    // NOTE If you wish to add additional public properties for Accounts do so here
  },
  { timestamps: true, _id: false, toJSON: { virtuals: true } }
)

export default Account
