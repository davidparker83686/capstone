import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Request = new Schema(
  {
    id: { type: String, required: true },
    itemId: { type: String, required: true },
    ownerId: { type: String, required: true },
    ownerReview: { type: Boolean, required: true },
    borrowerId: { type: String, required: true },
    borrowerReview: { type: Boolean, required: true },
    returned: { type: Boolean, required: true },
    borrowStartDate: { type: String, required: true },
    borrowEndDate: { type: String, required: true },
    creatorId: { type: String, ref: 'Account', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

Request.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

export default Request
