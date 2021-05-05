import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Review = new Schema(
  {

    id: { type: String, required: true },
    creatorId: { type: String, required: true },
    requestId: { type: String, required: true },
    ownerId: { type: String, ref: 'Account', required: true },
    borrowerId: { type: String, ref: 'Account', required: true },
    body: { type: String, required: true },
    rating: { type: String, required: true }
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
