import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Review = new Schema(
  {
    creatorId: { type: String, required: true },
    requestId: { type: String, required: true },
    title: { type: String, required: true },
    ownerId: { type: String, ref: 'Request', required: true },
    borrowerId: { type: String, ref: 'Request', required: true },
    body: { type: String, required: true },
    rating: { type: Number, required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

Review.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

export default Review
