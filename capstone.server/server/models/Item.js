import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Item = new Schema(
  {

    id: { type: String, required: true },
    category: { type: String, required: true },
    accountId: { type: String, required: true },
    availability: { type: Boolean, required: true },
    title: { type: String, required: true },
    description: { type: String, required: false },
    picture: { type: String, required: false },
    creatorId: { type: String, ref: 'Account', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

Item.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

export default Item
