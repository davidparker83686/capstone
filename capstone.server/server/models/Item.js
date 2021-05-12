import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Point = new Schema(
  {
    type: { type: String, enum: ['Point'], required: true, default: 'Point' },
    coordinates: {
      type: [Number],
      required: true
    }
  }
)

const Item = new Schema(
  {
    category: { type: String, required: true },
    availability: { type: Boolean, required: false, default: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    picture: { type: String, required: false },
    location: {
      type: [Point],
      required: true,
      index: '2dsphere'
    },
    creatorId: { type: String, ref: 'Account', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

// Item.createIndex({ location: '2dsphere' })
Item.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

export default Item
